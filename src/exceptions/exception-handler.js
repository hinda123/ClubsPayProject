export default function exceptionHandler(error, req, res, next) {
  res.status(error?.statusCode ?? 500).json({
    message: error.message,
    success: false,
  });
}
