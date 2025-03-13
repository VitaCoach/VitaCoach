//상품, 결제, 장바구니 관련 swagger 문서
/**
 * @swagger
 * tags:
 *   name: Product
 *   description: API for product related operations (결제, 장바구니, 상품)
 */

/**
 * @swagger
 * /api/products/{category}:
 *   get:
 *     summary: 특정 카테고리의 제품 목록 조회
 *     description: 카테고리 ID를 바탕으로 제품 리스트와 해당 제품에 관련된 정보를 가져옵니다.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: integer
 *         description: 카테고리 ID
 *     responses:
 *       200:
 *         description: 성공적으로 제품 목록을 가져옴
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: 제품 이름
 *                   price:
 *                     type: integer
 *                     description: 제품 가격
 *                   type:
 *                     type: string
 *                     description: 제품 타입
 *                   image:
 *                     type: string
 *                     description: 제품 이미지 URL
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 오류 메시지
 */

/**
 * @swagger
 * /api/products/detail/{productId}:
 *   get:
 *     summary: 제품 상세정보 조회
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 제품 ID
 *     responses:
 *       200:
 *         description: 제품 정보와 관련된 블로그 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: 제품 ID
 *                   name:
 *                     type: string
 *                     description: 제품 이름
 *                   price:
 *                     type: integer
 *                     description: 제품 가격
 *                   maxLimit:
 *                     type: number
 *                     format: float
 *                     description: 제품의 최대 용량
 *                   minLimit:
 *                     type: number
 *                     format: float
 *                     description: 제품의 최소 용량
 *                   scale:
 *                     type: string
 *                     description: 제품 용량 단위
 *                   caution:
 *                     type: string
 *                     description: 제품 주의사항
 *                   description:
 *                     type: string
 *                     description: 제품 설명
 *                   type:
 *                     type: string
 *                     description: 제품 타입
 *                   blogs:
 *                     type: array
 *                     description: 제품과 관련된 블로그 목록
 *                     items:
 *                       type: object
 *                       properties:
 *                         blogname:
 *                           type: string
 *                           description: 블로그 이름
 *                         contents:
 *                           type: string
 *                           description: 블로그 내용
 *                         datetime:
 *                           type: string
 *                           format: date-time
 *                           description: 블로그 글 작성 시간
 *                         thumbnail:
 *                           type: string
 *                           description: 블로그 썸네일 이미지 URL
 *                         title:
 *                           type: string
 *                           description: 블로그 글 제목
 *                         url:
 *                           type: string
 *                           description: 블로그 글 URL
 *         400:
 *           description: 잘못된 요청
 *         500:
 *           description: 서버 오류
 */

/**
 * @swagger
 * /api/products/buy:
 *   post:
 *     summary: 제품 구매
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: 결제 성공 메시지 반환
 */

/**
 * @swagger
 * /api/products/cancel:
 *   post:
 *     summary: 제품 결제 취소
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: 결제 취소 성공 메시지 반환
 */

/**
 * @swagger
 * /api/products/purchasedProducts:
 *   get:
 *     summary: 사용자가 구매한 상품 목록 조회
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: 구매한 상품 목록 반환
 */

/**
 * @swagger
 * /api/products/cart:
 *   post:
 *     summary: 장바구니에 상품 추가
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: 장바구니 추가 성공 메시지 반환
 */

/**
 * @swagger
 * /api/products/updateCart:
 *   patch:
 *     summary: 장바구니 상품 수량 업데이트
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: 장바구니 업데이트 성공 메시지 반환
 */

/**
 * @swagger
 * /api/products/cart/{productId}:
 *   delete:
 *     summary: 장바구니에서 상품 삭제
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 삭제할 상품 ID
 *     responses:
 *       200:
 *         description: 장바구니 삭제 성공
 */