const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * 기능별 제품 리스트
 */
const getCategoryProduct = async(category) => {
    const categoryProductList = await prisma.productCategory.findMany({
        where:{category_id: category},
        include:{product: true},
        select: {name: true, price: true, type: true},
    });

    //데이터 전처리 필요 & 이미지 api로 이미지 검색 필요
    return categoryProductList;
};

/**
 * 제품 상세
 */
const getProductInfo = async(productId) => {
    const productInfo = await prisma.product.findUnique({where: {id: productId}});
    return productInfo;
};

/**
 * 제품 구매 등록
 */
const buyProduct = async(userId, productId, quantity) => {
    const product = await prisma.product.findUnique({where: {id: productId}});

    await prisma.order.create({
        data:{
            buyer: userId,
            total_price: quantity * product.price,
            status: 'SUCCEEDED'
        }
    });
};


module.exports = {
    getCategoryProduct,
    getProductInfo,
    buyProduct
}