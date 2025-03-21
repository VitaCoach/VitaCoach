import React, { useEffect, useState } from "react";
import styled from "styled-components";

// 상담 예약 정보 타입 정의
interface Counsel {
  id: number;
  counselor: string;
  reservationDate: string;
  reservationTime: string;
}

const BookedConsulting: React.FC = () => {
  const [counsels, setCounsels] = useState<Counsel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<number | null>(null); // 삭제 중인 ID 저장

  useEffect(() => {
    const fetchCounselData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("로그인이 필요합니다.");
          return;
        }

        const response = await fetch(
          "http://localhost:3000/api/counsel/myCounsel",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("상담 데이터를 불러오는 데 실패했습니다.");
        }

        const data: Counsel[] = await response.json();
        setCounsels(data);
      } catch (error) {
        console.error("📌 상담 데이터 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounselData();
  }, []);

  // 상담 예약 삭제 함수
  const handleDelete = async (id: number) => {
    console.log("삭제 요청 상담 ID:", id); // ✅ 삭제 요청할 상담 ID 확인

    const confirmDelete = window.confirm("정말로 이 상담을 취소하시겠습니까?");
    if (!confirmDelete) return;

    setDeleting(id);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const response = await fetch(`http://localhost:3000/api/counsel/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("상담 삭제 실패");
      }

      alert("상담이 취소되었습니다.");
      setCounsels((prev) => prev.filter((counsel) => counsel.id !== id)); // ✅ 해당 ID만 삭제
    } catch (error) {
      console.error("❌ 상담 삭제 오류:", error);
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <Container>
      <Header>예약된 상담</Header>

      {loading ? (
        <LoadingText>⏳ 로딩 중...</LoadingText>
      ) : counsels.length > 0 ? (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>전문가 성명</Th>
                <Th>시간</Th>
                <Th>날짜</Th>
                <Th>취소</Th>
              </tr>
            </thead>
            <tbody>
              {counsels.map((counsel, index) => (
                <TableRow key={index}>
                  <Td>{counsel.counselor}</Td>
                  <Td>
                    {new Date(counsel.reservationTime).toLocaleTimeString(
                      "ko-KR",
                      { hour: "2-digit", minute: "2-digit", hour12: true }
                    )}
                  </Td>
                  <Td>
                    {new Date(counsel.reservationDate).toLocaleDateString(
                      "ko-KR"
                    )}
                  </Td>
                  <Td>
                    <DeleteButton
                      onClick={() => handleDelete(counsel.id)}
                      disabled={deleting === counsel.id}
                    >
                      {deleting === counsel.id ? "⏳" : "🗑️"}
                    </DeleteButton>
                  </Td>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      ) : (
        <NoDataText>예약된 상담이 없습니다.</NoDataText>
      )}
    </Container>
  );
};

export default BookedConsulting;
// 🎨 스타일 정의
const Container = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 30px;
  text-align: center;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h2`
  font-size: 26px;
  color: #003f73;
  font-weight: bold;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &::before {
    content: "📅";
    font-size: 28px;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  background: #003f73;
  color: white;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const Td = styled.td`
  padding: 14px;
  font-size: 16px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  background: #fff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f4f7fc;
  }

  &:hover {
    background: #e3f2fd;
    transition: background 0.2s ease-in-out;
  }
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: red;
    transform: scale(1.1);
  }
`;

const NoDataText = styled.p`
  font-size: 18px;
  color: #777;
  margin-top: 20px;
`;

const LoadingText = styled.p`
  font-size: 18px;
  color: #0077cc;
  font-weight: bold;
  margin-top: 20px;
`;
