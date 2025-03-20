import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import noRefundIcon from "../../assets/noRefund.png";
import popularProductIcon from "../../assets/popularProduct.png";
import freeDeliveryIcon from "../../assets/freeDelivery.png";
import he from "he";

interface ProductDetail {
  id: number;
  name: string;
  price: number;
  maxLimit: number;
  minLimit: number;
  scale: string;
  caution: string;
  description: string;
  type: string;
  blogs: Blog[];
}

interface Blog {
  blogName: string;
  contents: string;
  datetime: string;
  thumbnail: string;
  title: string;
  url: string;
}

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(!location.state?.product);
  const [quantity, setQuantity] = useState<number>(0);
  const productImage = location.state?.image;

  const parsedProductId = productId
    ? parseInt(productId, 10)
    : location.state?.productId;

  console.log("🔥 URL에서 받은 productId:", productId);
  console.log(
    "🔥 location.state에서 받은 productId:",
    location.state?.productId
  );
  console.log("🔥 최종 사용 productId:", parsedProductId);

  // ✅ 제품 상세 정보 불러오기
  useEffect(() => {
    if (!parsedProductId) {
      console.error("🚨 productId가 없음! API 요청을 중단합니다.");
      return;
    }

    const fetchProductDetail = async () => {
      try {
        console.log("🔥 API 요청 중... productId:", parsedProductId);
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("🚨 No token found! 사용자 인증이 필요합니다.");
          navigate("/login");
          return;
        }

        const response = await fetch(`/api/product/detail/${parsedProductId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("제품 정보를 불러오지 못했습니다.");
        }

        const data = await response.json();
        console.log("✅ API 응답 데이터:", data);
        // 🔥 여기서 강제로 상태를 업데이트하는 코드 추가
        // 🔥 배열이면 첫 번째 요소만 사용하도록 설정
        if (Array.isArray(data) && data.length > 0) {
          setProduct(data[0]);
          console.log(data[0]);
        } else {
          setProduct(data);
        }

        setQuantity(0);
      } catch (error) {
        console.error("❌ API 요청 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [parsedProductId, navigate]); // ✅ parsedProductId 변경 시 재요청

  // ✅ `product` 상태 변화 확인
  useEffect(() => {
    console.log("🔥 최종 저장된 product 상태:", product);
  }, [product]);

  // ✅ 제품 수량 초기화
  useEffect(() => {
    if (product) {
      setQuantity(0);
    }
  }, [product]);

  // ✅ 수량 조절 핸들러 수정 (1씩 증가/감소)
  const handleQuantityChange = (change: number) => {
    if (!product) return;
    setQuantity(
      (prev) => Math.max(0, Math.min(prev + change, product.maxLimit)) // 0 이상 maxLimit 이하로 유지
    );
  };

  // ✅ 장바구니 추가
  const handleAddToCart = async () => {
    if (!product) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      const response = await fetch("/api/product/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: quantity > 0 ? quantity : 1,
        }),
      });

      if (!response.ok) {
        throw new Error("장바구니 추가 실패");
      }
      alert("장바구니에 추가되었습니다!");
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // ✅ 즉시 구매
  const handleBuyNow = async () => {
    if (!product) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      const response = await fetch("/api/product/buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product.id, quantity }),
      });

      if (!response.ok) {
        throw new Error("구매 실패");
      }
      alert("구매하기 완료되었습니다!");
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  if (loading) return <LoadingText>⏳ 제품 정보를 불러오는 중...</LoadingText>;
  if (!product) return <ErrorText>🚫 제품 정보를 찾을 수 없습니다.</ErrorText>;

  return (
    <Container>
      <ProductHeader>
        <ProductImage src={productImage} alt={product?.name} />
        <ProductInfo>
          <ProductTitle>{product.name}</ProductTitle>
          <ProductPrice>{product.price.toLocaleString()}원</ProductPrice>
          <IconsContainer>
            <IconWrapper>
              <Icon src={freeDeliveryIcon} alt="무료 배송" />
              <span>무료 배송</span>
            </IconWrapper>
            <IconWrapper>
              <Icon src={popularProductIcon} alt="인기 제품" />
              <span>인기 제품</span>
            </IconWrapper>
            <IconWrapper>
              <Icon src={noRefundIcon} alt="환불 불가" />
              <span>환불 불가</span>
            </IconWrapper>
          </IconsContainer>
          <QuantitySelector>
            <span>수량:</span>
            <QuantityButton onClick={() => handleQuantityChange(-1)}>
              -
            </QuantityButton>
            <QuantityDisplay>{quantity}</QuantityDisplay>
            <QuantityButton onClick={() => handleQuantityChange(1)}>
              +
            </QuantityButton>
          </QuantitySelector>
          <ButtonGroup>
            <CartButton onClick={handleAddToCart}>🛒 장바구니 담기</CartButton>
            <BuyButton onClick={handleBuyNow}>🛍️ 구매하기</BuyButton>
          </ButtonGroup>
        </ProductInfo>
      </ProductHeader>

      <Section>
        <SectionTitle>📌 용량</SectionTitle>
        <InfoBox>
          <InfoItem>일일 섭취량 하한: {product.minLimit}</InfoItem>
          <InfoItem>일일 섭취량 상한: {product.maxLimit}</InfoItem>
          <InfoItem>단위: {product.scale}</InfoItem>
        </InfoBox>
      </Section>
      <Section>
        <SectionTitle>📜 상품 설명</SectionTitle>
        {product.description ? (
          <Description>{product.description}</Description>
        ) : (
          <Description>🚫 상품 설명이 없습니다.</Description>
        )}
      </Section>

      <Section>
        <SectionTitle>⚠️ 주의사항</SectionTitle>
        {product.caution && product.caution.trim() !== "" ? (
          <Caution>{product.caution}</Caution>
        ) : (
          <Caution>🚫 주의사항이 없습니다.</Caution>
        )}
      </Section>
      <Section>
        <SectionTitle>📰 관련 블로그</SectionTitle>
        {product.blogs.length > 0 ? (
          <BlogContainer>
            {product.blogs.map((blog) => (
              <BlogCard key={blog.url}>
                <BlogThumbnail
                  src={
                    blog.thumbnail && blog.thumbnail.startsWith("http")
                      ? blog.thumbnail
                      : productImage
                  }
                  alt={he.decode(blog.title)}
                />

                <BlogContent>
                  <BlogTitle
                    dangerouslySetInnerHTML={{ __html: he.decode(blog.title) }}
                  />
                  <BlogText
                    dangerouslySetInnerHTML={{
                      __html: he.decode(blog.contents),
                    }}
                  />
                </BlogContent>
              </BlogCard>
            ))}
          </BlogContainer>
        ) : (
          <NoData>관련 블로그가 없습니다.</NoData>
        )}
      </Section>
    </Container>
  );
};

export default ProductDetail;

/* ✅ Styled Components */
const Container = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 10px;
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-top: 50px;
`;

const ErrorText = styled.p`
  text-align: center;
  font-size: 18px;
  color: red;
  margin-top: 50px;
`;

const ProductHeader = styled.div`
  display: flex;
  gap: 30px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #ddd;
`;
const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #003f73;
  margin-bottom: 10px;
`;

const ProductPrice = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: #ff5722;
  margin-bottom: 15px;
`;

const NoData = styled.p`
  text-align: center;
  font-size: 16px;
  color: #999;
  margin-top: 10px;
`;

const Section = styled.div`
  margin-top: 30px;
  padding: 15px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  margin-top: 15px;
`;

const BlogContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const BlogCard = styled.div`
  width: 220px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const BlogThumbnail = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
  border-bottom: 2px solid #ddd;
`;

const BlogContent = styled.div`
  padding: 10px;
`;

const BlogTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const BlogText = styled.p`
  font-size: 14px;
  color: #666;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 15px;

  input {
    width: 60px;
    padding: 5px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    border: 2px solid #ddd;
    border-radius: 5px;
    background: #f9f9f9;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const CartButton = styled.button`
  padding: 10px 15px;
  background: #003f73;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: 0.2s;

  &:hover {
    background: #0056b3;
  }
`;

const BuyButton = styled.button`
  padding: 10px 15px;
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: 0.2s;

  &:hover {
    background: #e68900;
  }
`;

const InfoBox = styled.div`
  display: flex;
  gap: 20px;
  font-size: 16px;
`;

const InfoItem = styled.div`
  margin-top: 15px;
  color: #333;
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #666;
`;

const Icon = styled.img`
  width: 60px;
`;

const QuantityButton = styled.button`
  background: #ccc;
  border: none;
  padding: 8px 12px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #bbb;
  }
`;

const QuantityDisplay = styled.span`
  width: 50px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  border: 2px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const Caution = styled.p`
  font-size: 16px;
  color: red;
  margin-top: 15px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #333;
  margin-top: 15px;
`;
