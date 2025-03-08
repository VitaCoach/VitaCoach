const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

//회원가입
router.post('/signup', authController.registerUser);

//로그인
router.post('/login', authController.userLogin);

module.exports = router;