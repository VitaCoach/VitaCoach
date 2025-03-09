//사용자 관련 swagger 문서
/**
 * @swagger
 * tags:
 *   name: User
 *   description: API for user related operations
 */

/**
 * @swagger
 * /api/sub/myprofile:
 *   get:
 *     summary: 마이 프로필 정보 가져오기
 *     description: 사용자의 프로필 정보를 조회합니다. (이름, 전화번호, 구독 상태)
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 성공적으로 프로필 정보 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: 사용자의 이름
 *                   example: "홍길동"
 *                 phone:
 *                   type: string
 *                   description: 사용자의 전화번호
 *                   example: "010-1234-5678"
 *                 subscribe:
 *                   type: string
 *                   description: 사용자의 구독 상태
 *                   example: "FREE"
 *       401:
 *         description: 사용자가 로그인하지 않음
 *       500:
 *         description: 서버 오류
 */