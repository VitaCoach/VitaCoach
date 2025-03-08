const errorHandler = (err, req, res, next) => {
    console.error(err);       //에러 출력

    res.status(err.statusCode).json({
        error: err.message,
        statusCode: err.statusCode || 500
    })
};

module.exports = errorHandler;