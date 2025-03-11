const counselService = require("../services/counselService");

/**
 * 해당 type인 전문가 목록 불러오기
 */
const getExpertList = async (req, res, next) => {
  const type = req.query.type; // 전문가 종류
  console.log(`🔍 요청받은 전문가 타입: ${type}`); // ✅ 로그 추가

  try {
    const expertList = await counselService.getExperts(type);
    console.log(`✅ 가져온 전문가 목록:`, expertList); // ✅ 가져온 데이터 확인

    return res.status(200).json(expertList);
  } catch (error) {
    console.error("🚨 전문가 목록 조회 중 오류 발생:", error);
    next(error);
  }
};

/**
 * 특정 전문가 상세정보 가져오기
 */
const getExpertInfo = async (req, res, next) => {
  const expertId = parseInt(req.params.id, 10);
  try {
    const expertInfo = await counselService.getExpertInfo(expertId);
    res.status(200).json(expertInfo);
  } catch (error) {
    next(error);
  }
};

/**
 * 상담 등록하기
 */
const counselRegi = (req, res, next) => {
  const { expertId, reservationDate, reservationTime } = req.body;

  // 두 값을 각각 Date 객체로 변환
  const reservationDateObj = new Date(reservationDate);
  const reservationTimeObj = new Date(reservationTime);

  const userId = req.user.userId;
  try {
    counselService.registerCounsel(
      userId,
      expertId,
      reservationDateObj,
      reservationTimeObj
    );
    return res.status(200).json({ message: "Successfully Registered" });
  } catch (error) {
    next(error);
  }
};

/**
 * 상담 취소하기
 */
const cancelCounsel = (req, res, next) => {
  const counselId = parseInt(req.params.id, 10);
  try {
    counselService.cancelCounsel(counselId);
    res.status(200).json({ message: "Counsel deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

/**
 * 내 상담 목록
 */
const getMyCounsel = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const myCounsel = await counselService.getReservedCounsels(userId);
    res.status(200).json(myCounsel);
  } catch (error) {
    next(error);
  }
};

/**
 * 전문가 이름으로 찾기
 */
const findExpert = async(req, res, next) => {
  const name = req.query;
  try{
    const foundExpert = await counselService.findExpertByName(name);
    res.status(200).json(foundExpert);
  }catch(error){
    next(error);
  }
};

module.exports = {
  getExpertList,
  counselRegi,
  cancelCounsel,
  getMyCounsel,
  getExpertInfo,
  findExper
};
