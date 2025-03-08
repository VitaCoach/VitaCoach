import React from "react";
import styled from "styled-components";
import threeMedicine from "../assets/threeMedicine.png";
import yellowMedicine from "../assets/yellowMedicine.png";
import colorMedicine from "../assets/colorMedicine.png";

const HomePage: React.FC = () => {
  return (
    <Container>
      {/* 상단 배너 */}
      <TopSection>
        <Image src={threeMedicine} alt="Three Medicine Bottles" />
        <InfoBox>
          <Title>💊 건강 기능 식품이란?</Title>
          <Text>
            ✔ 일반 식품과 의약품의 중간 개념으로, 건강 유지 & 기능 개선을 돕는
            제품!{"\n"}✔ 식약처에서 기능성을 인정받은 원료나 성분을 사용하여
            제조된 식품{"\n"}✔ 질병 치료 목적이 아닌, 영양 보충 또는 특정 건강
            기능을 위해 섭취 가능
          </Text>
        </InfoBox>
      </TopSection>

      {/* ✅ 정보 섹션 */}
      <Section>
        <SectionTitle>🔎 필요성</SectionTitle>
        <InfoBoxLarge>
          <ul>
            <strong>
              <li>👵 장수 사회에서 건강 관리의 중요성</li>
            </strong>
            <li>
              ✔ 노령화 증가 → 암, 심장병, 뇌졸중 같은 3대 성인병 예방이 중요
            </li>
            <li>✔ 성인병과 노인병 예방을 위해 식생활 개선 필수!</li>
            <li>
              ✔ 질병 예방 효과가 있는 기능성 식품 개발 → 의료비 절감 & 건강 관리
              도움
            </li>
            <br />
            <strong>
              <li>🧒 어린이 & 청소년도 주의 필요!</li>
            </strong>
            <li>✔ 최근 어린이 성인병(비만, 당뇨, 고혈압) 증가</li>
            <li>✔ 건강한 식습관 & 영양 관리**가 중요한 시대</li>
          </ul>
        </InfoBoxLarge>
      </Section>

      {/* ✅ 제품 종류 */}
      <Section>
        <SectionTitle>📌 종류 </SectionTitle>
        <InfoBoxLarge>
          <ul>
            <strong>
              {" "}
              <li>✅ 고시형 건강기능식품</li>
            </strong>
            <li>✔ 식약처에서 기능성과 안전성이 이미 검증된 원료 사용</li>
            <li>
              ✔ 일반적으로 많이 사용되며, 제품 개발 & 허가 과정이 비교적 간단함
            </li>
            <li>
              ✔ 기능성과 섭취량, 사용 기준이 식약처 고시(법적으로 지정)된 원료
              사용
            </li>
            <br />
            <strong>
              {" "}
              <li>🧬 개별 인정형 건강기능식품</li>
            </strong>
            <li>
              ✔ 기업이나 연구소에서 새로운 기능성 원료를 개발하고, 식약처의 개별
              인증을 받은 제품
            </li>
            <li>
              ✔ 기능성과 안전성을 직접 연구 & 입증해야 함 (과학적 근거 필요)
            </li>
            <li>
              ✔ 허가받기까지 시간이 오래 걸리지만, 차별화된 제품을 만들 수 있음
            </li>
          </ul>
        </InfoBoxLarge>
        <Image src={colorMedicine} alt="Three Medicine Bottles" />
      </Section>

      {/* ✅ 선택 및 섭취법 */}
      <Section>
        <SectionTitle>📢 선택 및 올바른 섭취법 </SectionTitle>
        <InfoBoxLarge>
          <ul>
            <strong>
              <li>🛒 제품 선택 시 고려할 점</li>
            </strong>
            <li>✔ 식약처 인증 마크 확인</li>
            <li>✔ 나의 건강 상태 & 목표에 맞는 제품 선택</li>
            <li>
              ✔ 섭취 주의사항 확인 (복용량, 알레르기 성분, 임신 여부, 어린이 및
              노약자 등)
            </li>
            <br />
            <strong>
              <li>📝 올바른 섭취 방법 </li>
            </strong>
            <li>✔ 권장 섭취량을 지키기** (많이 먹는다고 효과 X)</li>
            <li>✔ 식사와 함께 또는 공복 섭취 여부 확인</li>
            <li>✔ 다른 건강기능식품 & 약물과의 상호작용 체크</li>
          </ul>
        </InfoBoxLarge>
        <Image src={yellowMedicine} alt="Yellow Medicine" />
      </Section>
    </Container>
  );
};

export default HomePage;

/* ✅ Styled Components */
const Container = styled.div`
  font-family: "Arial", sans-serif;
  padding: 20px;
  max-width: 1100px;
  margin: 0 auto;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
  margin-top: 70px;
`;

const Title = styled.h2`
  font-size: 26px;
  color: #1d3557;
  font-weight: bold;
  text-align: left;
  margin-bottom: 10px;
  border-bottom: 2px solid #1d3557;
  display: inline-block;
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  color: #1d3557;
  font-weight: bold;
  text-align: center;
  border-bottom: 2px solid #1d3557;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 40px;
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const InfoBox = styled.div`
  flex: 1;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const InfoBoxLarge = styled.div`
  flex: 1;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    font-size: 17px;
    line-height: 1.7;
    color: #333;
    margin-bottom: 8px;
  }
`;

const Image = styled.img`
  width: 260px;
  height: auto;
  border-radius: 12px;
`;

const Text = styled.p`
  font-size: 17px;
  line-height: 1.7;
  color: #333;
  white-space: pre-line;
  margin-top: 15px;
`;
