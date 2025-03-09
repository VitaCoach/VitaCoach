const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

//기능에 해당하는 제품 목록
router.get('/:category', productController.getProductList);

//제품 상세
router.get('/detail/:productId', productController.getProductInfo);

module.exports = router;