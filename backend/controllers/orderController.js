const orderService = require('../services/orderService');

/**
 *구매한 상품 목록
 */
const getPurchasedList = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const purchasedList = await orderService.getPurchasedProducts(userId);
    res.status(200).json(purchasedList);
  } catch (error) {
    next(error);
  }
};

/**
 * 장바구니에 저장된 상품들 보기
 */
const getMyCart = async(req, res, next) => {
    const userId = req.user.userId;
    try{
        const myCart = await orderService.getMyCartList(userId);
        res.status(200).json(myCart);
    }catch(error){
        next(error);
    }
};

module.exports = {
    getPurchasedList,
    getMyCart
}