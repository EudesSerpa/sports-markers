export class CustomError {
  statusCode: number;
  message: string;

  constructor(message: string, statusCode = 500) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
