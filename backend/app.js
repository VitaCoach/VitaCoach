const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const Routes = require('./routes/path');
const swaggerOptions = require('./utils/swaggerOptions');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
const app = express();

//Swagger설정
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const origin = process.env.FRONT_PORT
app.use(
    cors({
        origin: origin,
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//라우터 연결
app.use("/api", Routes);

//에러 핸들러
app.use(errorHandler);

//서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

module.exports = app;