const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const { PrismaClient, ProductType } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * 카테고리 데이터를 가져와서 Map 형태로 변환하는 함수
 */
async function createCategoryMap() {
    const categories = await prisma.category.findMany();
    const categoryMap = {};
    
    categories.forEach(category => {
        categoryMap[category.category] = category.id;
    });

    return categoryMap;
}

/**
 * 제품과 카테고리 연결 함수
 */
async function processProductCategory(row, categoryMap){
    const categoryNames = row["기능별 제품"]?row["기능별 제품"].split(", ") : [];
    return categoryNames.map(name => categoryMap[name]).filter(id => id !== undefined);
}

/**
 * 제품 데이터 삽입 함수
 */
async function insertProducts(fileName, categoryMap){
    try{
        //1️⃣엑셀 파일 읽기
        const filePath = path.join(__dirname, `../Data/${fileName}`);
        const workbook = xlsx.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        //const jsonData = xlsx.utils.sheet_to_json(sheet);
        const jsonData = xlsx.utils.sheet_to_json(sheet, { defval: "" });  // 빈 셀을 빈 문자열로 처리

        console.log(`엑셀 데이터 :`, jsonData);

        // 카테고리 매핑 확인 (디버깅)
        console.log("카테고리 맵:", categoryMap);

        //2️⃣데이터베이스 삽입
        for (const row of jsonData){
            const product = await prisma.product.create({
                data:{
                    name: row["품목명"],
                    price: Math.floor(Math.random() * 10) * 5000 + 5000,
                    minLimit: row["일일섭취량 하한"]? Number(row["일일섭취량 하한"]) : null,
                    maxLimit: row["일일섭취량 상한"]? Number(row["일일섭취량 상한"]) : null,
                    scale: row["단위"],
                    caution: row["섭취 주의사항"]? row["섭취 주의사항"] : " ",
                    description: row["주요 기능"],
                    type: row["종류"] === "고시형"? ProductType.TYPE2 : ProductType.TYPE1,
                }
            });

            //제품과 카테고리 연결(N:M)
            const categoryIds = await processProductCategory(row, categoryMap);
            if(categoryIds.length > 0){
                await prisma.productCategory.createMany({
                    data: categoryIds.map(categoryId => ({
                        product_id: product.id,
                        category_id: categoryId
                    }))
                });
            }
        }
        console.log(`products 데이터 저장 완료!`);
    }catch(error){
        console.error(`products 데이터 저장 중 오류 발생`, error);
    }
}

async function main(){
    //1️⃣카테고리 매핑 생성
    const categoryMap = await createCategoryMap();
    //2️⃣기존 데이터 삭제
    await prisma.cartItem.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.productCategory.deleteMany();
    await prisma.product.deleteMany();
    console.log('기존 데이터 삭제완료');

    //3️⃣시퀀스 초기화
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('product', 'id'), 1, false);`;

    //4️⃣데이터베이스에 데이터 삽입
    await insertProducts("products2.xlsx", categoryMap);
}

main()
    .catch((error) => {
        console.error('메인함수에서 오류 발생:', error);
    })
    .finally(async() => {
        await prisma.$disconnect();
    });