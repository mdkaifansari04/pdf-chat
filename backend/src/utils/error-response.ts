class ErrorResponse extends Error {
  public statusCode: number;
  constructor(message: string | any, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorResponse;
