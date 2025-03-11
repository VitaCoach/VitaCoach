const userService = require('../services/userService');

/**
 * 구독상태 확인하기
 */
const getSubscriptionStatus = (req, res, next) => {
    const userId = req.user.userId;

    if(!userId){     
        const error = new Error('User not logged in');
        error.statusCode = 401;
        return next(error);
    }

    //사용자 구독 상태 가져오기
    const userSubscription = userService.getUserSubscription(userId);

    if(userSubscription === 'FREE'){
        return res.status(200).json({ redirectTo: '/subscribe'});   //구독페이지 URL
    }else{
        return res.status(200).json({redirectTo: '/change-plan'});  //구독 변경 페이지 URL
    }
};


/**
 * 플랜 선택하기
 */
const selectPlan = (req, res, next) => {
    const plan = req.body.plan;
    try{
        //1. 로그인 정보 가져오기
        const userId = req.user.userId;

        //로그인 안 되어 있을 경우
        if(!userId){     
            const error = new Error('User not logged in');
            error.statusCode = 401;
            return next(error);
        }

        //2. db에서 해당 사용자 찾아서 플랜 업데이트
        userService.updatePlan(userId, plan);
    
        res.status(200).json({ message: 'Plan Updated'});
    }catch(error){
        next(error);
    }
};

/**
 * 마이 프로필
 */
const myProfile = async(req, res, next) => {
    try{
        const userId = req.user.userId;
        //로그인 되어있지 않으면
        if(!userId){
            const error = new Error('Invalid User');
            error.statusCode = 401;
            return next(error);
        }
        const myInfo = await userService.getMyInfo(userId);
        res.status(200).json(myInfo);
    }catch(error){
        next(error);
    }
};

module.exports = {
    getSubscriptionStatus,
    selectPlan,
    myProfile
};