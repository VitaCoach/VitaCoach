const { PrismaClient, MissionType } = require("@prisma/client");
const prisma = new PrismaClient();

//기능 카테고리 생성함수

const generateCategories = async() => {
    const categories = [
        {category: '수면 및 스트레스 관리'},
        {category: '치아 및 골 개선'},
        {category: '면역 기능 및 알레르기 관리'},
        {category: '혈당 조절'},
        {category: '혈행 개선 및 혈압 조절'},
        {category: '위장관 기능 조절'},
        {category: '집중력 및 기억력 개선'},
        {category: '체중 조절'},
        {category: '간 기능 개선'},
        {category: '항산화 기능'},
        {category: '콜레스테롤 조절'},
        {category: '피부 미용'},
        {category: '피로 회복'},
        {category: '기타'}
    ];
    for(const category of categories){
        await prisma.category.create({ data: { category: category.category } });
    }
};

const generateProducts = async() => {
    
    const createdCategories = await prisma.category.findMany();

    const products = [
        {
          name: '두충우슬추출복합물',
          minLimit: 500,
          maxLimit: 500,
          scale: 'mg/일',
          price: 20000, // 예시 가격
          type: 'TYPE1', // 상품 종류
          categories: [
            createdCategories[1].id // 두 번째 카테고리 연결
          ]
        },
        {
          name: '비타민C 보충제',
          minLimit: 1000,
          maxLimit: 1000,
          scale: 'mg/일',
          price: 15000, // 예시 가격
          type: 'TYPE2', // 상품 종류
          categories: [
            createdCategories[2].id // 세 번째 카테고리 연결
          ]
        },
        {
          name: '프로바이오틱스',
          minLimit: 300,
          maxLimit: 300,
          scale: 'mg/일',
          price: 18000, // 예시 가격
          type: 'TYPE1', // 상품 종류
          categories: [
            createdCategories[0].id // 첫 번째 카테고리 연결
          ]
        }
    ];
    for(const product of products){
        const createdProduct = await prisma.product.create({
            data:{
                name: product.name,
                price: product.price,
                maxLimit: product.maxLimit,
                minLimit: product.minLimit,
                scale: product.scale,
                type: product.type
            },
        });
        // product-category 관계 생성
        for (const categoryId of product.categories) {
            await prisma.productCategory.create({
              data: {
                product_id: createdProduct.id,
                category_id: categoryId,
              },
            });
        }
    }
};


const generateMockData = async() => {
    try{
        //기존 데이터 삭제
        await prisma.product.deleteMany();
        console.log('Deleted all Products');

        await prisma.category.deleteMany();
        console.log('Deleted all Categories');
        

        //카테고리 테이블 시퀀스 초기화
        await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('category', 'id'), 1, false);`;
        
        //새 데이터 생성
        await generateCategories();
        await generateProducts();
        console.log('Mock data generation completed successfully');
    }catch(error){
        console.log('Error generating mock data', error);
    }finally{
        await prisma.$disconnect();
    }
};

// 더미 데이터 생성 실행
generateMockData();