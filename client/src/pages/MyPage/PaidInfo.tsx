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
