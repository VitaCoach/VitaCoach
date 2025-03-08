const counselService = require('../services/counselService');

/**
 * 해당 type인 전문가 목록 불러오기
 */
const getExpertList = async(req, res, next) => {
    const type = req.query.type;     //전문가 종류
    try{
        const expertList = await counselService.getExperts(type);
        return res.status(200).json(expertList);
    }catch(error){
        next(error);
    }
};

module.exports = {
    getExpertList,

}