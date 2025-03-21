const { PrismaClient, OrderStatus } = require("@prisma/client");
const prisma = new PrismaClient();

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

const getMyCartList = async(userId) => {
    const myCart = await prisma.cart.findUnique({
        where: {owner: userId},
        include: {
            cartItem: {
                include: {
                    product: true,
                },
            },
        },
    });
    return myCart.cartItem;
};

module.exports = {
    getPurchasedProducts,
    getMyCartList
}