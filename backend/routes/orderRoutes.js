const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

//구매 제품 목록보기
router.get('/purchasedProducts', orderController.getPurchasedList);

//장바구니 항목 반환
router.get('/viewCart', orderController.getMyCart );

module.exports = router;