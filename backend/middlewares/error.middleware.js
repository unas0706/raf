const errorMiddleware = (err, req, res, next) => {
  let message = err.message || "Internal Server Error";
  let statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    message = `${JSON.stringify(err.keyValue)} already exist`;
  }
  res.status(statusCode).json({
    sucess: false,
    message,
  });
};

export default errorMiddleware;
