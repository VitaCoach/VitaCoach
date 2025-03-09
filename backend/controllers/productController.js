const productService = require('../services/productService');

/**
 * 특정 기능에 속하는 제품 리스트 가져오기
 */
const getProductList = async(req, res, next) => {
    const category = parseInt(req.params.category, 10);
    try{
        const productList = await productService.getCategoryProduct(category);
        res.status(200).json(productList);
    }catch(error){
        next(error);
    }
};

/**
 * 특정 제품의 상세정보
 */
const getProductInfo = async(req, res, next) => {
    const productId = parseInt(req.params.productId, 10);
    try{
        const productInfo = await productService.getProductInfo(productId);
        res.status(200).json(productInfo);
    }catch(error){
        next(error);
    }
};

/**
 * 제품 구매 등록
 */
const buyProduct = async(req, res, next) => {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;
    try{
        productService.buyProduct(userId, productId, quantity);
        res.json({message: 'Payment Success'});
    }catch(error){
        next(error);
    }
};

/**
 * 장바구니 등록
 */



module.exports = {
    getProductList,
    getProductInfo,
    buyProduct
}