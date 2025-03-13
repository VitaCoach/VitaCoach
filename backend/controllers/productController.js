const productService = require('../services/productService');
const kakaoService = require('../services/kakaoService');

/**
 * 특정 기능에 속하는 제품 리스트 가져오기
 */
const getProductList = async(req, res, next) => {
    const category = parseInt(req.params.category, 10);
    try{
        const productList = await productService.getCategoryProduct(category);
        
        //이미지 포함한 리스트
        const formattedProductList = [];

        for(const product of productList){
            formattedProductList.push({
                ...product.product,
                image: await kakaoService.getImage(product.product.name)
            });
        };
        
        res.status(200).json(formattedProductList);
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

        if (!productInfo) {
            return res.status(404).json({ message: "Product not found" });
        }
        const blogs = await kakaoService.getBlogs(productInfo.name);

        //블로그 포함
        const formattedProduct = [{
            ...productInfo,
            blogs: blogs,
        }];

        console.log(formattedProduct);
        res.status(200).json(formattedProduct);
    }catch(error){
        next(error);
    }
};

/**
 *구매한 상품 목록 
 */
const getPurchasedList = async(req, res, next) => {
    const userId = req.user.userId;
    try{
        const purchasedList = await productService.getPurchasedProducts(userId);
        res.status(200).json(purchasedList);
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
 * 결제 취소
 */
const cancelPayment = async(req, res, next) => {
    const { orderId, productId } = req.body;
    try{
        await productService.cancelPaymentProduct(orderId, productId);
        res.status(200).json('성공적으로 결제가 취소되었습니다.');
    }catch(error){
        next(error);
    }
};


/**
 * 장바구니 등록
 */
const addCart = async(req, res, next) => {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;
    try{
        productService.addProductCart(userId, productId, quantity);
        res.status(200).json({message: '상품이 장바구니에 성공적으로 등록되었습니다.'});
    }catch(error){
        next(error);
    }
};

/**
 * 장바구니 수정
 */
const updateCart = async(req, res, next) => {
    const userId = req.user.userId;
    const { productId, quantity } = req.body
    try{
        productService.updateProductQuantityCart(userId, productId, quantity);
        res.status(200).json({message: '장바구니가 성공적으로 업데이트 되었습니다.'});
    }catch(error){
        next(error);
    }
};

/**
 * 장바구니 삭제
 */
const deleteCart = async(req, res, next) => {
    const userId = req.user.userId;
    const { productId } = req.params;
    try{
        await productService.deleteProductCart(userId, productId);
    }catch(error){
        next(error);
    }
};

module.exports = {
    getProductList,
    getProductInfo,
    getPurchasedList,
    buyProduct,
    addCart,
    updateCart,
    deleteCart,
    cancelPayment
}