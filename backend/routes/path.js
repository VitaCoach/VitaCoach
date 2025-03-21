const express = require('express');

const verifyToken = require('../middleware/authMiddleware');

const authRoutes = require('./authRoutes');
const subscribeRoutes = require('./subscribeRoutes');
const counselRoutes = require('./counselRoutes');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/sub", verifyToken, subscribeRoutes);
router.use("/counsel", verifyToken, counselRoutes);
router.use("/product", verifyToken, productRoutes);
router.use("/order", verifyToken, orderRoutes);

module.exports = router;