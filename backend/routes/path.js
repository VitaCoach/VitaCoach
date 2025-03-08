const express = require('express');

const verifyToken = require('../middleware/authMiddleware');

const authRoutes = require('./authRoutes');
const subscribeRoutes = require('./subscribeRoutes');
const counselRoutes = require('./counselRoutes');

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/sub", verifyToken, subscribeRoutes);
router.use("/counsel", verifyToken, counselRoutes);

module.exports = router;