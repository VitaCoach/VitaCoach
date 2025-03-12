const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const { PrismaClient, ExpertType } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * 카테고리 데이터를 가져와서 Map 형태로 변환하는 함수
 * (categoryName -> categoryId)
 */
async function createCategoryMap() {
    const categories = await prisma.category.findMany();  // DB에서 모든 카테고리 가져오기
    const categoryMap = {};
    
    categories.forEach(category => {
        categoryMap[category.category] = category.id;  // { "수면 및 스트레스 관리": 1, "체중 조절": 2, ... }
    });

    return categoryMap;
}

/**
 * 특정 전문가 유형의 데이터를 엑셀에서 읽어와 데이터베이스에 저장하는 함수
 * @param {string} fileName - 엑셀 파일명
 * @param {string} expertType - Prisma의 ExpertType 값
 * @param {Map} categoryMap - 카테고리 이름과 ID 매핑 정보
 */

async function insertExperts(fileName, expertType, categoryMap){
    try{
        //1️⃣엑셀 파일 읽기
        const filePath = path.join(__dirname, `../Data/${fileName}`);
        const workbook = xlsx.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = xlsx.utils.sheet_to_json(sheet);

        console.log(`엑셀 데이터 (${expertType}):`, jsonData);

        //2️⃣데이터베이스에 삽입
        const experts = jsonData.map((row) => ({
            name: row["이름"],
            intro: row["소개"],
            rate: Number(row["별점"]),
            type: expertType,
            categoryId: categoryMap[row["분야"]] || null,   //매칭된 카테고리 ID
        }));

        await prisma.expert.createMany({
            data: experts,
            skipDuplicates: true,   //중복 데이터 무시
        });

        console.log(`${expertType} 데이터 저장 완료!`);
    }catch(error){
        console.error(`${expertType} 데이터 저장 중 오류 발생`, error);
    }
}

async function main() {

    const categoryMap = await createCategoryMap();      //카테고리 매핑 가져오기

    //1️⃣기존 데이터 삭제
    await prisma.expert.deleteMany();
    console.log('Deleted all experts');

    //2️⃣시퀀스 초기화
    await prisma.$executeRaw`SELECT setval(pg_get_serial_sequence('expert', 'id'), 1, false);`;

    //3️⃣데이터베이스에 데이터 삽입
    await insertExperts("experts_doctor.xlsx", ExpertType.DOCTOR, categoryMap);
    await insertExperts("experts_pharma.xlsx", ExpertType.PHARMACIST, categoryMap);
    await insertExperts("experts_nutr.xlsx", ExpertType.NUTRITIONIST, categoryMap);
}

main()
    .catch((error) => {
        console.error("메인 함수에서 오류 발생:", error);
    })
    .finally(async() => {
        await prisma.$disconnect();
    });