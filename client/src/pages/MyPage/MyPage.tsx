import React, { useState } from "react";
import styled from "styled-components";
import MyProfile from "./MyProfile";
import PaidInfo from "./PaidInfo";
import BookedConsulting from "./BookedConsulting";

const MyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("profile");

  return (
    <Container>
      <Sidebar>
        <SidebarTitle>VITACOACH</SidebarTitle>
        <SidebarItem
          active={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
        >
          📌 마이 프로필
        </SidebarItem>
        <SidebarItem
          active={activeTab === "payment"}
          onClick={() => setActiveTab("payment")}
        >
          💳 결제 정보
        </SidebarItem>
        <SidebarItem
          active={activeTab === "consulting"}
          onClick={() => setActiveTab("consulting")}
        >
          🏥 전문가 상담
        </SidebarItem>
      </Sidebar>

      <Content>
        {activeTab === "profile" && <MyProfile />}
        {activeTab === "payment" && <PaidInfo />}
        {activeTab === "consulting" && <BookedConsulting />}
      </Content>
    </Container>
  );
};

export default MyPage;

/* ✅ Styled Components */
const Container = styled.div`
  display: flex;
  height: 100vh; /* 전체 높이 */
`;

const Sidebar = styled.div`
  width: 250px;
  background: #003f73;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh; /* 전체 높이 */
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* 내용이 많으면 스크롤 가능하도록 */
`;

const SidebarTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 115px;
`;

const SidebarItem = styled.div<{ active: boolean }>`
  font-size: 16px;
  width: 100%;
  padding: 12px;
  text-align: left;
  cursor: pointer;
  border-radius: 8px;
  background: ${({ active }) => (active ? "#002244" : "transparent")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  color: ${({ active }) =>
    active ? "#ffffff" : "#d1d1d1"}; /* 선택된 요소 색 강조 */
  transition: background 0.3s;
  margin-bottom: 10px; /* 간격 추가 */
  &:hover {
    background: #002b57;
    color: #ffffff;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  margin-left: 250px; /* 사이드바 만큼 오른쪽으로 밀기 */
  padding: 40px;
  min-height: 100vh;
`;
