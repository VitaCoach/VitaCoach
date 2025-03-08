//swagger 설정 파일
const path = require('path');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Vita Coach',
            version: '1.0.0',
            description: 'API Documentation for the VitaCoach',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',    //JWT 토큰 사용
                },
            },
        },
    },
    apis:[
        //각 라우터의 Swagger 문서 파일을 통합함
        path.join(__dirname, '../swagger/user-swagger.js'),
        path.join(__dirname, '../swagger/product-swagger.js'),
        path.join(__dirname, '../swagger/auth-swagger.js'),
    ],
    security: [
        {
            bearerAuth: [],
        },
    ],
};

module.exports = swaggerOptions;