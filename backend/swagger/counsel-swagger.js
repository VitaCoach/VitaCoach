/**
 * @swagger
 * tags:
 *   - name: Counsel
 *     description: 상담과 관련된 모든 API
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
 *                     type: string
 *                     example: "https://randomuser.me/api/portraits/women/65.jpg"
 *       400:
 *         description: 잘못된 요청 (type이 제공되지 않음)
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/counsel/register:
 *   post:
 *     summary: 상담 등록
 *     description: 사용자가 전문가와의 상담을 예약합니다.
 *     tags: [Counsel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               expertId:
 *                 type: integer
 *                 description: 상담을 받을 전문가의 ID
 *               reservationDate:
 *                 type: string
 *                 format: date
 *                 description: 상담 날짜 (yyyy-mm-dd)
 *               reservationTime:
 *                 type: string
 *                 format: date-time
 *                 description: 상담 시간 (ISO 8601 포맷)
 *     responses:
 *       200:
 *         description: 상담이 성공적으로 등록됨
 *       400:
 *         description: 잘못된 요청 데이터
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/counsel/{id}:
 *   delete:
 *     summary: 상담 취소
 *     description: 사용자가 예약한 상담을 취소합니다.
 *     tags: [Counsel]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 취소할 상담의 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 상담이 성공적으로 취소됨
 *       404:
 *         description: 상담을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/counsel/myCounsel:
 *   get:
 *     summary: 사용자의 상담 예약 목록 조회
 *     description: 사용자가 예약한 모든 상담 목록을 조회합니다.
 *     tags: [Counsel]
 *     responses:
 *       200:
 *         description: 사용자의 상담 예약 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   counselor:
 *                     type: string
 *                     description: 상담을 진행한 전문가의 이름
 *                   reservationDate:
 *                     type: string
 *                     format: date
 *                     description: 예약된 상담 날짜
 *                   reservationTime:
 *                     type: string
 *                     format: date-time
 *                     description: 예약된 상담 시간
 *       401:
 *         description: 사용자가 로그인하지 않음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /counsel/expertInfo/{id}:
 *   get:
 *     summary: 전문가 상세 정보 조회
 *     description: 특정 전문가의 상세 정보를 조회합니다.
 *     tags: [Counsel]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 전문가의 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 전문가의 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: 전문가의 이름
 *                 type:
 *                   type: string
 *                   description: 전문가의 직종 (예: 의사, 영양사 등)
 *                 rate:
 *                   type: integer
 *                   description: 전문가의 평점
 *                 intro:
 *                   type: string
 *                   description: 전문가의 소개
 *       404:
 *         description: 전문가를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */