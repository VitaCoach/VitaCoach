const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * 사용자 등록 
 */
const registerUser = async(req, res, next) => {
    try{
        const { name, phone, id, password, birth, sex } = req.body;

        //비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10);

        //사용자 생성
        const user = await prisma.user.create({
            data:{
                id,
                name,
                phone,
                sex,
                password: hashedPassword,
                birth,
            },
        });
        res.status(201).json(user);
    }catch(error){
        next(error);
    }
};


/**
 * 로그인
 */
const userLogin = async(req, res, next) => {
    const { id, password } = req.body;

    try{
        //1. 사용자 찾기
        const user = await prisma.user.findUnique({where: { id } });

        //2. 존재 여부 & 비밀번호 검증
        if(!user || !(await bcrypt.compare(password, user.password))){
            const error = new Error('Invalid user/password');
            error.statusCode = 401;
            return next(error);
        }
        //3. JWT 생성 
        const token = jwt.sign({userId: user.id},process.env.JWT_SECRET_KEY, {expiresIn: '1h'});

        //4. JWT를 쿠키에 저장
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60*60*1000,     // 1시간 동안 유효
            sameSite: 'strict',     //CSRF 방지
        });

        res.status(200).json({message: 'Login successful'});
    }catch(error){
        next(error);
    }
};

module.exports = {
    registerUser,
    userLogin,
};