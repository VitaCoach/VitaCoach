const express = require('express');
const counselController = require('../controllers/counselController');

const router = express.Router();

//전문가 목록 조회
router.get('/list', counselController.getExpertList);

module.exports = router;