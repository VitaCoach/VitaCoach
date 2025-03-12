const { PrismaClient } = require("@prisma/client");
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

const generateMockData = async() => {
    try{
        //기존 데이터 삭제
        await prisma.category.deleteMany();
        console.log('Deleted all Categories');
        

        //카테고리 테이블 시퀀스 초기화
        await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('category', 'id'), 1, false);`;
        
        //새 데이터 생성
        await generateCategories();
        console.log('Mock data generation completed successfully');
    }catch(error){
        console.log('Error generating mock data', error);
    }finally{
        await prisma.$disconnect();
    }
};

// 더미 데이터 생성 실행
generateMockData();