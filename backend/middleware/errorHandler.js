const errorHandler = (err, req, res, next) => {
  console.error("서버 오류 발생", err); //에러 출력

  // 상태 코드가 유효한지 검사 (100~599 사이의 값이 아니면 500으로 설정)
  const statusCode =
    typeof err.statusCode === "number" &&
    err.statusCode >= 100 &&
    err.statusCode < 600
      ? err.statusCode
      : 500;

  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
    statusCode: statusCode,
  });
};

module.exports = errorHandler;
