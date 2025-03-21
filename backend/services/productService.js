const { PrismaClient, OrderStatus } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * 기능별 제품 리스트
 */
const getCategoryProduct = async (category) => {
  console.log("전달된 category 값:", category); // category 값 확인

  if (!category) {
    category = 1;
    // throw new Error("category_id 값이 없습니다.");
  }

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
 * 장바구니에 상품 등록
 */
const addProductCart = async (userId, productId, quantity) => {
  try {
    // ✅ 1. 유저의 장바구니(cart) 찾기
    let cart = await prisma.cart.findUnique({
      where: { owner: userId },
    });

    // ✅ 2. 장바구니가 없으면 새로 생성
    if (!cart) {
      cart = await prisma.cart.create({
        data: { owner: userId },
      });
    }

    // ✅ 3. cartId 가져오기
    const cartId = cart.id; // 🔥 여기서 cartId를 Int로 가져옴

    // ✅ 4. 같은 상품이 장바구니에 있는지 확인
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cartId, // 🔥 Int 타입 사용
          productId: productId,
        },
      },
    });

    if (existingCartItem) {
      // 5. 이미 장바구니에 있는 상품이면 수량 업데이트
      await prisma.cartItem.update({
        where: {
          cartId_productId: {
            cartId: cartId, // Int 타입 사용
            productId: productId,
          },
        },
        data: {
          quantity: { increment: quantity }, // 수량 증가
        },
      });
    } else {
      // 6. 장바구니에 새로운 상품 추가
      await prisma.cartItem.create({
        data: {
          cartId: cartId, // Int 타입 사용
          productId: productId,
          quantity: quantity,
        },
      });
    }

    console.log("장바구니 추가 완료!");
  } catch (error) {
    console.error("장바구니 추가 중 오류 발생:", error);
  }
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
  addProductCart,
  deleteProductCart,
  updateProductQuantityCart,
  cancelPaymentProduct,
};
