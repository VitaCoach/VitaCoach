import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const UnsubscribedPage: React.FC = () => {
  const navigate = useNavigate();

  // ✅ 구독 신청 API 호출 함수
  const handleSubscribe = async (plan: string) => {
    const token = localStorage.getItem("token"); // ✅ 로그인 토큰 가져오기
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/LoginPage"); // ✅ 로그인 페이지로 이동
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/sub/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan: plan.toUpperCase() }), // ✅ 대문자로 변환하여 전달
      });

      const data = await response.json();

      if (response.ok) {
        alert("구독이 성공적으로 완료되었습니다!");
        navigate("/SubscribedPage"); // ✅ 구독 완료 후 이동
      } else {
        alert(data.message || "구독에 실패했습니다.");
      }
    } catch (error) {
      console.error("구독 요청 중 오류 발생:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <Title>고객님께 알맞는 플랜을 고르세요!</Title>
      <PlansGrid>
        {plans.map((plan) => (
          <PlanCard key={plan.name}>
            <PlanTitle>{plan.name}</PlanTitle>
            <PlanDivider />
            <PlanPrice>{plan.price}</PlanPrice>
            <PlanPeriod>per month</PlanPeriod>
            <PlanDescription>{plan.description}</PlanDescription>
            <SubscribeButton onClick={() => handleSubscribe(plan.name)}>
              이 플랜 선택
            </SubscribeButton>
          </PlanCard>
        ))}
      </PlansGrid>
    </Container>
  );
};

export default UnsubscribedPage;

/* ✅ Styled Components */
const Container = styled.div`
  font-family: "Arial", sans-serif;
  text-align: center;
  padding: 60px 20px;
  max-width: 1100px;
  margin: 0 auto;
  background: linear-gradient(to bottom right, rgba(240, 248, 255, 1));
`;

const Title = styled.h2`
  font-size: 32px;
  color: #2c3e50;
  font-weight: 900;
  margin-bottom: 30px;
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  justify-content: center;
`;

const PlanCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 25px;
  text-align: center;
  border: 2px solid transparent;
  &:hover {
    transform: scale(1.07);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    border: 2px solid #0669ba;
  }
`;

const PlanTitle = styled.h3`
  font-size: 22px;
  color: #2c3e50;
  margin-bottom: 12px;
  font-weight: 700;
`;

const PlanPrice = styled.p`
  font-size: 26px;
  font-weight: bold;
  color: #003f73;
  margin: 0;
`;

const PlanPeriod = styled.p`
  font-size: 14px;
  color: #777;
  margin: 5px 0;
`;

const PlanDescription = styled.p`
  font-size: 16px;
  color: #555;
  margin-top: 12px;
  line-height: 1.6;
  white-space: pre-line;
`;

const PlanDivider = styled.div`
  width: 50%;
  height: 1px;
  background-color: #ddd;
  margin: 10px auto;
`;

const SubscribeButton = styled.button`
  background-color: #0669ba;
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 15px;

  &:hover {
    background-color: #004a85;
  }
`;

// ✅ 구독 가능한 플랜 목록
const plans = [
  {
    name: "Bronze",
    price: "30만원",
    description:
      "원하는 건강 기능 식품 1달에 3개 무료 배달!\n전문가와 무료 상담 1회",
  },
  {
    name: "Silver",
    price: "50만원",
    description:
      "원하는 건강 기능 식품 1달에 4개 무료 배달!\n전문가와 무료 상담 3회",
  },
  {
    name: "Gold",
    price: "70만원",
    description:
      "원하는 건강 기능 식품 1달에 4개 무료 배달!\n전문가와 무료 상담 7회",
  },
  {
    name: "Platinum",
    price: "80만원",
    description:
      "원하는 건강 기능 식품 1달에 5개 무료 배달!\n전문가와 무료 상담 10회",
  },
];
