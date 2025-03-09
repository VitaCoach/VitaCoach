const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * 해당 타입의 전문가 리스트 반환
 */
const getExperts = async (type) => {
  console.log(`DB에서 ${type} 전문가 조회`); // 쿼리 실행 전 로그 확인
  const experts = await prisma.expert.findMany({ where: { type } });

  //전문가에게 랜덤 이미지 URL 추가
  const expertsWithImages = experts.map((expert) => ({
    ...expert,
    imageUrl: `https://randomuser.me/api/portraits/${
      Math.random() > 0.5 ? "men" : "women"
    }/${Math.floor(Math.random() * 100)}.jpg`,
  }));

  return expertsWithImages;
};

/**
 * 특정 전문가의 상세정보 반환
 */
const getExpertInfo = async (expertId) => {
  const expertInfo = await prisma.expert.findUnique({
    where: { id: expertId },
  });
  return expertInfo;
};

/**
 * 전문가, 사용자 상담 목록에 등록된 상담 추가하기
 */
const registerCounsel = async (
  userId,
  expertId,
  reservationDateObj,
  reservationTimeObj
) => {
  //사용자와 전문가가 존재하는 지 확인
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const expert = await prisma.expert.findUnique({ where: { id: expertId } });

  if (!user) {
    throw new Error("User not found");
  }
  if (!expert) {
    throw new Error("Expert not found");
  }
  //상담 등록
  await prisma.counsel.create({
    data: {
      counselor: expertId,
      client: userId,
      reservation_date: reservationDateObj,
      reservation_time: reservationTimeObj,
    },
  });
};

/**
 * 특정 상담 삭제하기
 */
const cancelCounsel = async (counselId) => {
  await prisma.counsel.delete({ where: { id: counselId } });
};

/**
 * 사용자의 상담 예약 목록
 */
const getReservedCounsels = async (userId) => {
  const reservedCounsels = await prisma.counsel.findMany({
    where: { client: userId },
    include: { expert: true },
  });

  //필요한 정보만 반환할 배열 생성
  const formattedReservedCounsel = [];

  for (const counsel of reservedCounsels) {
    formattedReservedCounsel.push({
      counselor: counsel.expert.name,
      reservationDate: counsel.reservation_date,
      reservationTime: counsel.reservation_time,
    });
  }
  return formattedReservedCounsel;
};

module.exports = {
  getExperts,
  registerCounsel,
  cancelCounsel,
  getReservedCounsels,
  getExpertInfo,
};
