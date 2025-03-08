const { PrismaClient, MissionType } = require("@prisma/client");
const prisma = new PrismaClient();

//전문가 생성 함수
const generateExperts = async() => {
    const experts = [
        { name: '경포리 맛피자', type: 'NUTRITIONIST', rate: 4.5, intro: '건강기능 식품계의 나폴리 마피아!'},
        { name: '에드워드 벨라', type: 'NUTRITIONIST', rate: 4.3, intro: '건강기능 식품계의 에드워드 리~'},
        { name: '나야, 개기름', type: 'DOCTOR', rate: 4.1, intro: '건강기능 식품계의 나야, 들기름!'},
        { name: '파브리', type: 'PHARMACIST', rate: 4.4, intro: '건강기능 식품계의 파브리!'}
    ];

    for(const expert of experts){
        await prisma.expert.create({
            data:{
                name: expert.name,
                type: expert.type,
                rate: expert.rate,
                intro: expert.intro
            },
        });
    }
};


const generateMockData = async() => {
    try{
        //기존 데이터 삭제
        await prisma.expert.deleteMany();
        console.log('Deleted all experts');

        //새 데이터 생성
        await generateExperts();
        console.log('Mock data generation completed successfully');
    }catch(error){
        console.log('Error generating mock data', error);
    }finally{
        await prisma.$disconnect();
    }
};

// 더미 데이터 생성 실행
generateMockData();