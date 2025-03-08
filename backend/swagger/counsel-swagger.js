/**
 * @swagger
 * tags:
 *   name: Counsel
 *   description: API for counsel related operations
 */

/**
 * @swagger
 * /api/counsel/list:
 *   get:
 *     summary: 해당 타입의 전문가 목록 조회
 *     description: 요청한 전문가 유형(type)에 해당하는 전문가 리스트를 반환합니다.
 *     tags:
 *       - Experts
 *     parameters:
 *       - in: query
 *         name: type
 *         required: true
 *         description: 전문가의 종류 (DOCTOR, NUTRITIONIST, PHARMACIST)
 *         schema:
 *           type: string
 *           example: "DOCTOR"
 *     responses:
 *       200:
 *         description: 성공적으로 전문가 목록을 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Dr. John Doe"
 *                   type:
 *                     type: string
 *                     example: "doctor"
 *                   rate:
 *                     type: integer
 *                     example: 4
 *                   intro:
 *                     type: string
 *                     example: "건강기능 식품계의 나야, 들기름!"
 *                   imageUrl:
 *                     type: String
 *                     example: "https://randomuser.me/api/portraits/women/65.jpg"
 *       400:
 *         description: 잘못된 요청 (type이 제공되지 않음)
 *       500:
 *         description: 서버 오류
 */