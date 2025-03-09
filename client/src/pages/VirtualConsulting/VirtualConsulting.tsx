import React, { useEffect, useState } from "react";

// 전문가 타입 정의
interface Expert {
  id: number;
  name: string;
  type: string;
  rate: number;
  intro: string;
  imageUrl: string;
}

// 컴포넌트
const VirtualConsulting: React.FC = () => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [filteredExperts, setFilteredExperts] = useState<Expert[]>([]);
  const [activeTab, setActiveTab] = useState<string>("NUTRITIONIST");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchExperts(activeTab);
  }, [activeTab]);

  const fetchExperts = async (type: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }
      console.log(`요청 중: /api/counsel/list?type=${type}`);
      console.log("포함된 토큰:", token);

      const response = await fetch(`/api/counsel/list?type=${type}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`서버 응답 오류: ${response.status}`);
      }

      const data = await response.json();
      console.log("응답 수신:", data);

      setExperts(data);
      setFilteredExperts(data);

      console.log("🟢 상태 업데이트 후 experts:", experts);
      console.log("🟢 상태 업데이트 후 filteredExperts:", filteredExperts);
    } catch (error) {
      console.error("❌ Error fetching experts:", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredExperts(
      experts.filter((expert) => expert.name.toLowerCase().includes(value))
    );
  };

  return (
    <Container>
      <TabContainer>
        <Tab
          active={activeTab === "NUTRITIONIST"}
          onClick={() => setActiveTab("NUTRITIONIST")}
        >
          영양사쌤들
        </Tab>
        <Tab
          active={activeTab === "PHARMACIST"}
          onClick={() => setActiveTab("PHARMACIST")}
        >
          약사쌤들
        </Tab>
        <Tab
          active={activeTab === "DOCTOR"}
          onClick={() => setActiveTab("DOCTOR")}
        >
          의사쌤들
        </Tab>
      </TabContainer>
      <SearchInput
        type="text"
        placeholder="전문가 검색..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ExpertList>
        {filteredExperts.map((expert) => (
          <ExpertCard key={expert.id}>
            <ExpertImage src={expert.imageUrl} alt={expert.name} />
            <ExpertName>{expert.name}</ExpertName>
            <Rating>⭐ {expert.rate} out of 5</Rating>
            <ExpertIntro>{expert.intro}</ExpertIntro>
          </ExpertCard>
        ))}
      </ExpertList>
    </Container>
  );
};

export default VirtualConsulting;

// ✅ 스타일드 컴포넌트 (파일 하단에 배치)
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  margin: 0 10px;
  background-color: ${({ active }) => (active ? "#003f73" : "#ccc")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${({ active }) => (active ? "#002b57" : "#bbb")};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ExpertList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const ExpertCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  padding: 15px;
`;

const ExpertImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const ExpertName = styled.h3`
  margin: 10px 0;
  color: #003f73;
`;

const ExpertIntro = styled.p`
  font-size: 14px;
  color: #666;
`;

const Rating = styled.p`
  font-size: 14px;
  color: #ffb400;
`;
