import React from "react";
import styled from "styled-components";

const SubscriptionPage: React.FC = () => {
  return (
    <Container>
      <Title>고객님께 알맞는 플랜을 고르세요!</Title>
      <PlansGrid>
        {plans.map((plan, index) => (
          <PlanCard key={plan.name} className={index < 2 ? "top" : "bottom"}>
            <PlanTitle>{plan.name}</PlanTitle>
            <PlanDivider />
            <PlanPrice>{plan.price}</PlanPrice>

            <PlanPeriod>per month</PlanPeriod>
            <PlanDescription>{plan.description}</PlanDescription>
          </PlanCard>
        ))}
      </PlansGrid>
    </Container>
  );
};

export default SubscriptionPage;

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
  font-weight: 900; /* ✅ 훨씬 더 진하게 */
  margin-bottom: 30px;
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* ✅ 2열 정렬 (2개 + 2개) */
  gap: 25px;
  justify-content: center;
`;

const PlanCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 25px;
  text-align: center;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
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
  background-color: #ddd; /* ✅ 연한 회색 구분선 */
  margin: 10px auto; /* ✅ 중앙 정렬 */
`;

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
