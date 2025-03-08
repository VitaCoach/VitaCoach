/**
 * @swagger
 * tags:
 *   name: Subscription
 *   description: API for subscription related operations
 */

/**
 * @swagger
 * /api/sub/status:
 *   get:
 *     summary: "사용자의 구독 상태 확인"
 *     description: "사용자의 구독 상태를 확인하여, 구독 페이지 또는 구독 변경 페이지로 리다이렉트할 URL을 반환합니다."
 *     responses:
 *       200:
 *         description: "사용자의 구독 상태에 맞는 리다이렉트 URL을 반환합니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 redirectTo:
 *                   type: string
 *                   description: "리다이렉트할 URL 경로. ('/subscribe' 또는 '/change-plan')"
 *                   example: "/subscribe"
 *       401:
 *         description: "사용자가 로그인하지 않은 경우, 인증 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: "오류 메시지"
 *                   example: "User not logged in"
 *       500:
 *         description: "서버 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: "오류 메시지"
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /api/sub/subscribe:
 *   post:
 *     summary: "사용자가 선택한 플랜으로 구독을 업데이트"
 *     description: "사용자가 로그인된 상태에서 선택한 플랜으로 구독을 업데이트합니다."
 *     tags:
 *       - "Subscription"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plan:
 *                 type: string
 *                 enum:
 *                   - "FREE"
 *                   - "BRONZE"
 *                   - "SILVER"
 *                   - "GOLD"
 *                   - "PLATINUM"
 *                 description: "사용자가 선택한 구독 플랜"
 *                 example: "BRONZE"
 *     responses:
 *       200:
 *         description: "플랜이 성공적으로 업데이트되었습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Plan Updated"
 *       401:
 *         description: "사용자가 로그인하지 않았습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not logged in"
 *       500:
 *         description: "서버 오류 발생"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */