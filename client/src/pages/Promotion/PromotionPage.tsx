import React from "react";
import styled from "styled-components";
import sickBoy from "../../assets/sickBoy.png";
import sickGirl from "../../assets/sickGirl.png";

const PromotionPage: React.FC = () => {
  return (
    <Container>
      <Title>🎉 프로모션 특별 할인 🎉</Title>
      <ProductContainer>
        {products.map((product, index) => (
          <ProductCard key={index}>
            <Badge>🔥 78% SALE</Badge>
            <ProductImage src={product.image} alt={product.title} />
            <DiscountText>⏳ 마감 임박! 서두르세요!</DiscountText>
            <ProductInfo>
              <ProductTitle>{product.title}</ProductTitle>
              <ProductDescription>{product.description}</ProductDescription>
              <StarRating>⭐⭐⭐⭐☆</StarRating>
              <ProductPrice>{product.price}원</ProductPrice>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductContainer>
    </Container>
  );
};

export default PromotionPage;

/* ✅ Styled Components */
const Container = styled.div`
  font-family: "Arial", sans-serif;
  text-align: center;
  padding: 50px 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(to bottom right, #eef7ff, #f5faff);
`;

const Title = styled.h2`
  font-size: 32px;
  color: #003f73;
  font-weight: bold;
  margin-bottom: 40px;
`;

const ProductContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  flex-wrap: wrap;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  width: 350px;
  padding: 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background: #d9534f;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
`;

const ProductImage = styled.img`
  width: 85%;
  height: auto;
  display: block;
  margin: 20px auto;
  border-radius: 8px;
`;

const DiscountText = styled.div`
  background: #ffefc1;
  color: #b22222;
  font-size: 16px;
  font-weight: bold;
  padding: 8px;
  margin: 10px auto;
  width: 80%;
  border-radius: 6px;
`;

const ProductInfo = styled.div`
  padding: 15px;
`;

const ProductTitle = styled.h3`
  font-size: 22px;
  color: #003f73;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 12px;
`;

const StarRating = styled.div`
  font-size: 18px;
  color: #f4c542;
  margin-bottom: 10px;
`;

const ProductPrice = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: #d9534f;
`;

/* ✅ 프로모션 상품 데이터 */
const products = [
  {
    image: sickGirl,
    title: "💖 효도 상품 for 갱년기 여성",
    description:
      "원하는 건강 기능 식품 1달에 3개 무료 배달! 전문가와 무료 상담 4회",
    price: "25000",
  },
  {
    image: sickBoy,
    title: "💪 갱년기 남성에게 추천하는 제품!",
    description:
      "원하는 건강 기능 식품 1달에 4개 무료 배달! 전문가와 무료 상담 7회",
    price: "33000",
  },
];
