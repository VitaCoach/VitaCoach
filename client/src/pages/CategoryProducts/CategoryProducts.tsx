import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

const categoryMap: { [key: string]: number } = {
  "수면 및 스트레스 관리": 1,
  "치아 및 골 개선": 2,
  "면역 기능 및 알레르기 관리": 3,
  "혈당 조절": 4,
  "혈행 개선 및 혈압 조절": 5,
  "위장관 기능 조절": 6,
  "집중력 및 기억력 개선": 7,
  "체중 조절": 8,
  "간 기능 개선": 9,
  "항산화 기능": 10,
  "콜레스테롤 조절": 11,
  "피부 미용": 12,
  "피로 회복": 13,
  기타: 14,
};

// 제품 데이터 타입 정의
interface Product {
  id: number;
  name: string;
  price: number;
  type: string;
  image: string;
}

// ✅ 컴포넌트 시작
const CategoryProducts: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<number>(
    categoryId ? Number(categoryId) : 1
  );

  // ✅ URL의 categoryId가 변경될 때 상태 업데이트
  useEffect(() => {
    console.log("📌 URL에서 받은 categoryId:", categoryId);
    if (categoryId) {
      setSelectedCategory(Number(categoryId));
    }
  }, [categoryId]);

  // ✅ 카테고리별 제품 불러오기
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("🚨 No token found! 사용자 인증이 필요합니다.");
          return;
        }

        console.log("API 요청하는 category_id:", selectedCategory);

        const response = await fetch(`/api/product/${selectedCategory}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("서버 응답 오류");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // ✅ 카테고리 변경 시 URL도 업데이트
  const handleCategoryChange = (id: number) => {
    setSelectedCategory(id);
    navigate(`/category/${id}`); // URL 업데이트
  };

  // ✅ 제품 상세 페이지로 이동 (올바른 ID 전달)
  const handleProductClick = (product: Product) => {
    console.log("🔥 클릭된 제품:", product);
    if (!product.id) {
      console.error("🚨 Product ID is missing!");
      return;
    }
    navigate(`/product/${product.id}`, {
      state: { productId: product.id, image: product.image },
    });
  };
  const handleAddToCart = async (
    event: React.MouseEvent,
    productId: number
  ) => {
    event.stopPropagation();
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
        body: JSON.stringify({ productId, quantity: 1 }), // 기본 수량 1
      });

      if (!response.ok) {
        throw new Error("장바구니 추가 실패");
      }
      alert("🛒 장바구니에 추가되었습니다!");
    } catch (error) {
      console.error("❌ 장바구니 추가 오류:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };
  const handleBuyNow = async (event: React.MouseEvent, productId: number) => {
    event.stopPropagation();
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
        body: JSON.stringify({ productId, quantity: 1 }), // 기본 수량 1
      });

      if (!response.ok) {
        throw new Error("구매 실패");
      }
      alert("🛍️ 구매가 완료되었습니다!");
    } catch (error) {
      console.error("❌ 구매 오류:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      {/* ✅ 카테고리 사이드바 */}
      <Sidebar>
        <SidebarTitle>📌 카테고리</SidebarTitle>
        {Object.entries(categoryMap).map(([category, id]) => (
          <CategoryItem
            key={id}
            selected={id === selectedCategory}
            onClick={() => handleCategoryChange(id)}
          >
            {id === selectedCategory ? "🔹" : "⚫"} {category}
          </CategoryItem>
        ))}
      </Sidebar>
      {/* ✅ 제품 리스트 */}
      <Content>
        <Title>🛍️ 기능별 제품</Title>
        {loading ? (
          <LoadingText>⏳ 제품 정보를 불러오는 중...</LoadingText>
        ) : products.length > 0 ? (
          <ProductGrid>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                onClick={() => handleProductClick(product)}
                style={{ cursor: "pointer" }}
              >
                <ProductImage src={product.image} alt={product.name} />
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductPrice>
                    {product.price.toLocaleString()}원
                  </ProductPrice>
                  <ButtonGroup>
                    <CartButton onClick={(e) => handleAddToCart(e, product.id)}>
                      🛒 장바구니 담기
                    </CartButton>
                    <BuyButton onClick={(e) => handleBuyNow(e, product.id)}>
                      🛍️ 구매하기
                    </BuyButton>
                  </ButtonGroup>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductGrid>
        ) : (
          <NoData>🚫 해당 카테고리에 제품이 없습니다.</NoData>
        )}
      </Content>
    </Container>
  );
};

export default CategoryProducts;

/* ✅ 스타일링 */
const Container = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  gap: 20px;
`;

const Sidebar = styled.div`
  width: 300px;
  background: #eef3f7;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  height: auto; /* ✅ 높이를 내용에 맞게 자동 조정 */
  min-height: unset; /* ✅ 혹시 100vh로 설정돼 있다면 제거 */
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: -300px;
  margin-right: 100px;
`;

const SidebarTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #003f73;
  text-align: center;
`;

const CategoryItem = styled.div<{ selected: boolean }>`
  padding: 12px 15px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  background: ${({ selected }) =>
    selected ? "linear-gradient(135deg, #0056b3, #003f73)" : "transparent"};
  color: ${({ selected }) => (selected ? "white" : "#003f73")};
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.3s ease-in-out, transform 0.2s;

  &:hover {
    background: #0056b3;
    color: white;
    transform: translateX(5px);
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: #003f73;
  margin-bottom: 20px;
  margin-top: -20px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 15px;
  text-align: center;
`;

const ProductName = styled.h3`
  font-size: 18px;
  color: #003f73;
  margin-bottom: 5px;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #ff5722;
  margin-bottom: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const CartButton = styled.button`
  padding: 8px 12px;
  font-size: 14px;
  background: #003f73;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const BuyButton = styled.button`
  padding: 8px 12px;
  font-size: 14px;
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #e68900;
  }
`;

const NoData = styled.p`
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-top: 20px;
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-top: 50px;
`;
