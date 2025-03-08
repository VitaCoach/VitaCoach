const express = require('express');

const verifyToken = require('../middleware/authMiddleware');

const authRoutes = require('./authRoutes');
const subscribeRoutes = require('./subscribeRoutes');

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/sub", verifyToken, subscribeRoutes);

module.exports = router;