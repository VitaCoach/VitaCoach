const express = require('express');
const subscribeController = require('../controllers/subscribeController');

const router = express.Router();

//구독상태확인
router.get('/status', subscribeController.getSubscriptionStatus);

//구독하기
router.post('/subscribe', subscribeController.selectPlan );

module.exports = router;