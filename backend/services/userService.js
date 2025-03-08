const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * 사용자의 구독 정보 가져오기
 */
const getUserSubscription = async(userId) => {
    const userSubscription = await prisma.user.findUnique({ 
        where: {id: userId},
        select: {subscription: true},
    });
    return userSubscription;
};

/**
 * 사용자가 선택한 플랜으로 업데이트
 */
const updatePlan = async(userId, plan) => {
    await prisma.user.update({
        where: { id: userId },
        data: {
            subscription: plan,
        }
    });
};

module.exports = {
    getUserSubscription,
    updatePlan,
}