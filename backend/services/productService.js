const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * 기능별 제품 리스트
 */
const getCategoryProduct = async(category) => {
    const categoryProductList = await prisma.productCategory.findMany({
        where:{category_id: category},
        include:{product: true}
    });
    return categoryProductList;
};

/**
 * 제품 상세
 */
const getProductInfo = async(productId) => {
    const productInfo = await prisma.product.findUnique({where: {id: productId}});
    return productInfo;
};


module.exports = {
    getCategoryProduct,
    getProductInfo
}