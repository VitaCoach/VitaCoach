import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SubscribedPage: React.FC = () => {
  const navigate = useNavigate(); // ✅ 페이지 이동을 위한 navigate 추가

  return (
    <Container>
      <Title>
        <span>Silver 구독자, '잉글'님!</span>
        <br />
        혜택을 마음껏 누리세요!
      </Title>
      <ChangeSubscriptionButton onClick={() => navigate("/UnsubscribedPage")}>
        구독 변경
      </ChangeSubscriptionButton>
      <BenefitsGrid>
        {benefits.map((benefit, index) => (
          <BenefitCard key={index}>
            <BenefitNumber>{index + 1}</BenefitNumber>
            <BenefitTitle>{benefit.title}</BenefitTitle>
            <BenefitDescription>{benefit.description}</BenefitDescription>
          </BenefitCard>
        ))}
      </BenefitsGrid>
    </Container>
  );
};

export default SubscribedPage;

/* ✅ Styled Components */
const Container = styled.div`
  font-family: "Arial", sans-serif;
  text-align: center;
  padding: 60px 20px;
  max-width: 900px;
  margin: 0 auto;
  background: linear-gradient(to bottom right, rgba(240, 248, 255, 1));
`;

const Title = styled.h2`
  font-size: 26px;
  color: #2c3e50;
  font-weight: 900;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const ChangeSubscriptionButton = styled.button`
  background-color: #003f73;
  color: white;
  font-size: 20px;
  padding: 15px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 30px;
  margin-top: 10px;

  &:hover {
    background-color: #7dbed2;
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  justify-content: center;
`;

const BenefitCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  padding: 40px;
  text-align: center;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  border: 2px solid transparent;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    border: 2px solid #003f73;
  }
`;

const BenefitNumber = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #003f73;
  margin-bottom: 20px;
`;

const BenefitTitle = styled.h3`
  font-size: 22px;
  color: #2c3e50;
  font-weight: 700;
  margin-bottom: 8px;
`;

const BenefitDescription = styled.p`
  font-size: 18px;
  color: #555;
  line-height: 1.6;
`;

const benefits = [
  { title: "제품 선택", description: "매 달 원하는 제품 4개 선택 가능!" },
  { title: "무료 배송", description: "선택하신 제품을 무료로 배달!" },
  { title: "전문가 상담", description: "전문가와 무료 상담 3회 제공!" },
  {
    title: "증정품",
    description: "연속 구독 갱신 시 원하는 제품 1개 무료 증정!",
  },
];
