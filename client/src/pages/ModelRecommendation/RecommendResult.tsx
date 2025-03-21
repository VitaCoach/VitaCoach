import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

interface Recommendation {
  품목명: string;
  종류: string;
  주요기능: string;
  유사도: number;
}

const RecommendResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recommendations: Recommendation[] =
    location.state?.recommendations || [];

  // 데이터 콘솔 출력
  useEffect(() => {
    console.log("📌 FastAPI 추천 결과:", recommendations);
  }, [recommendations]);

  return (
    <Container>
      <Header>추천된 건강기능식품</Header>

      {recommendations.length > 0 ? (
        <RecommendationList>
          {recommendations.map((item, index) => (
            <RecommendationCard key={index}>
              <CardHeader>{item.품목명}</CardHeader>
              <CardBody>
                <Info>
                  <strong>종류:</strong> {item.종류}
                </Info>
                <Info>
                  <strong>주요 기능:</strong> {item.주요기능}
                </Info>
                <Similarity>
                  <strong>유사도 점수:</strong> {item.유사도.toFixed(2)}
                  <ProgressBar>
                    <ProgressFill score={item.유사도} />
                  </ProgressBar>
                </Similarity>
              </CardBody>
            </RecommendationCard>
          ))}
        </RecommendationList>
      ) : (
        <NoResult>❌ 추천 결과가 없습니다.</NoResult>
      )}

      <BackButton onClick={() => navigate("/RecommendPage")}>
        🔄 다시 입력하기
      </BackButton>
    </Container>
  );
};

export default RecommendResult;

// 🌟 스타일 정의
const Container = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 30px;
  text-align: center;
`;

const Header = styled.h2`
  font-size: 26px;
  font-weight: bold;
  color: #003f73;
  margin-bottom: 20px;
`;

const RecommendationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`;

const RecommendationCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  text-align: left;
  margin-top: 20px;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.h3`
  font-size: 22px; // 제목 크기 키우기
  font-weight: bold;
  color: #002855; // 더 진한 색상으로 변경
  margin-bottom: 20px;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Info = styled.p`
  font-size: 16px;
  color: #333;
  margin: 2px;
`;

const Similarity = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 12px;
  color: #0077cc;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background: #e0e0e0;
  border-radius: 10px;
  margin-top: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ score: number }>`
  width: ${({ score }) => score * 100}%;
  height: 100%;
  background: #0077cc;
`;

const NoResult = styled.p`
  font-size: 18px;
  color: #ff4444;
`;

const BackButton = styled.button`
  margin-top: 25px;
  padding: 12px 24px;
  background: #ff6600;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #ff4500;
  }
`;
