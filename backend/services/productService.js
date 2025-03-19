const { PrismaClient, OrderStatus } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * 기능별 제품 리스트
 */
const getCategoryProduct = async (category) => {
  const categoryProductList = await prisma.productCategory.findMany({
    where: { category_id: category },
    select: {
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          type: true,
        },
      },
    },
  });
  return categoryProductList;
};

/**
 * 제품 상세
 */
const getProductInfo = async (productId) => {
  const productInfo = await prisma.product.findUnique({
    where: { id: productId },
  });
  return productInfo;
};

/**
 * 제품 구매 등록 - 바로구매(상품 한 종류)
 */
const buyProduct = async (userId, productId, quantity) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });

  await prisma.order.create({
    data: {
      buyer: userId,
      total_price: quantity * product.price,
      status: "SUCCEEDED",
      orderItem: {
        create: [
          {
            product_id: productId,
            quantity: 2,
            price: 20000,
          },
        ],
      },
    },
  });
};

/**
 * 결제 취소
 */
const cancelPaymentProduct = async (orderId, productId) => {
  await prisma.orderItem.delete({
    where: {
      pay_id_product_id: {
        pay_id: orderId,
        product_id: productId,
      },
    },
  });

  // 남은 상품이 없으면 order 삭제
  const remainingItems = await prisma.orderItem.findMany({
    where: { pay_id: orderId },
  });

  if (remainingItems.length === 0) {
    await prisma.order.delete({ where: { id: orderId } });
  }
};

/**
 * 사용자가 구매한 상품 목록
 */
const getPurchasedProducts = async (userId) => {
  const purchasedProducts = await prisma.order.findMany({
    where: {
      buyer: userId,
      status: OrderStatus.SUCCEEDED,
    },
  });
  return purchasedProducts;
};

/**
 * 장바구니에 상품 등록
 */
const addProductCart = async (userId, productId, quantity) => {
  await prisma.cart.create({
    data: {
      owner: userId,
      cartItem: productId,
      quantity: quantity,
    },
  });
};

/**
 * 장바구니 상품 삭제
 */
const deleteProductCart = async (userId, productId) => {
  await prisma.cart.delete({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });
};

/**
 * 장바구니의 상품 수량 변경
 */
const updateProductQuantityCart = async (userId, productId, quantity) => {
  await prisma.cart.update({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
    data: {
      quantity,
    },
  });
};

module.exports = {
  getCategoryProduct,
  getProductInfo,
  buyProduct,
  getPurchasedProducts,
  addProductCart,
  deleteProductCart,
  updateProductQuantityCart,
  cancelPaymentProduct,
};
