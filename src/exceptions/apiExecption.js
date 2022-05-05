class ApiException extends Error {
  constructor(message, status) {
    super(message);
    this.statusCode = status;
  }
}

export const apiRequesException = (message, status) => {
  throw new ApiException(message, status);
};

export const validate = (
  predicate = () => {},
  error = { message: "Error message", status: 400 }
) => {
  if (predicate()) apiRequesException(error.message, error.status);
};
