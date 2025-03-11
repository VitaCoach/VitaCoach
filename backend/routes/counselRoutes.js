const express = require('express');
const counselController = require('../controllers/counselController');

const router = express.Router();

//전문가 목록 조회
router.get('/list', counselController.getExpertList);

//상담 등록
router.post('/register', counselController.counselRegi);

//상담 취소
router.delete('/:id', counselController.cancelCounsel);

//사용자의 상담 예약내역 조회
router.get('/myCounsel', counselController.getMyCounsel);

//전문가 상세 정보
router.get('/expertInfo/:id', counselController.getExpertInfo);

//전문가 찾기
router.get('/findExpert', counselController.findExpert);

module.exports = router;