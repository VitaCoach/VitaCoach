import React, { useEffect, useState } from "react";
import styled from "styled-components";

// 구매한 상품 정보 타입 정의
interface PurchasedProduct {
  id: number;
  productName: string;
  price: number;
  purchaseDate: string;
}

const PaidInfo: React.FC = () => {
  const [products, setProducts] = useState<PurchasedProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPurchasedProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("로그인이 필요합니다.");
          return;
        }

        const response = await fetch(
          "http://localhost:3000/api/order/purchasedProducts",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("구매 내역을 불러오는 데 실패했습니다.");
        }

        const data: PurchasedProduct[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("❌ 결제 내역 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedProducts();
  }, []);

  return (
    <Container>
      <Header>결제 내역</Header>

      {loading ? (
        <LoadingText>⏳ 로딩 중...</LoadingText>
      ) : products.length > 0 ? (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>상품명</Th>
                <Th>가격</Th>
                <Th>구매 날짜</Th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <Td>{product.productName}</Td>
                  <Td>{product.price.toLocaleString()}원</Td>
                  <Td>
                    {new Date(product.purchaseDate).toLocaleDateString("ko-KR")}
                  </Td>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      ) : (
        <NoDataText>구매한 상품이 없습니다.</NoDataText>
      )}
    </Container>
  );
};

export default PaidInfo;

// ✅ 스타일 정의
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
    content: "💳";
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
