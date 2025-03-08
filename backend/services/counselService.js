const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * 해당 타입의 전문가 리스트 반환
 */
const getExperts = async(type) => {
    const experts = await prisma.expert.findMany({ where: { type }});
    
    //전문가에게 랜덤 이미지 URL 추가
    const expertsWithImages = experts.map((expert) => ({
        ...expert,
        imageUrl: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`
    }));
    
    return expertsWithImages;
};

module.exports = {
    getExperts,
}