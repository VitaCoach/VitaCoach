//로그인 관련 swagger 문서

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: 사용자 아이디
 *         name:
 *           type: string
 *           description: 사용자 이름
 *         phone:
 *           type: string
 *           description: 사용자 전화번호
 *         password:
 *           type: string
 *           description: 사용자 비밀번호
 *         sex:
 *           type: ENUM
 *           description: 사용자 성별 ('MAN' 혹은 'WOMAN'으로 보내줘야함)
 *         birth:
 *           type: dateTime
 *           description: 사용자 생일
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: 사용자 회원가입
 *     description: 새 사용자를 등록합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: 사용자 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 에러
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: 사용자 로그인
 *     description: 사용자 로그인을 하고, JWT를 발급합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: 사용자 아이디
 *               password:
 *                 type: string
 *                 description: 사용자 비밀번호
 *     responses:
 *       200:
 *         description: 로그인 성공, JWT 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *       401:
 *         description: 잘못된 아이디/비밀번호
 *       500:
 *         description: 서버 에러
 */
