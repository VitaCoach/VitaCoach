//JWT 인증 미들웨어
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1] || req.cookies.token ;

    //토큰이 없으면
    if(!token){
        return res.status(401).json({error: 'Access Denied, No token provided'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);   //토큰검증
        
        //토큰이 유효하면 decoded 정보 req.user에 담아서 전달
        req.user = decoded;
    }catch(error){
        return res.status(403).json({error: 'Not verifyed Token'});
    }
    next();
};

module.exports = verifyToken;