const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

//기능에 해당하는 제품 목록
router.get('/:category', productController.getProductList);

//제품 상세
router.get('/detail/:productId', productController.getProductInfo);

//제품 구매 - 하나만 바로구매
router.post('/buy', productController.buyProduct);

//제품 구매 취소 - 결제 후 취소
router.post('/cancel', productController.cancelPayment);

//구매 제품 목록보기
router.get('/purchasedProducts', productController.getPurchasedList);

//장바구니 추가
router.post('/cart', productController.addCart);

//장바구니 업데이트
router.patch('/updateCart', productController.updateCart);

//장바구니 삭제
router.delete('/cart/:productId', productController.deleteCart);

module.exports = router;