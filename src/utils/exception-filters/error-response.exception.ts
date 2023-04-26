import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorException extends HttpException {
  constructor(
    statusCode: number,
    error: string,
    message: string[] = [],
    httpStatus: HttpStatus = HttpStatus.NOT_FOUND,
    data?: Record<string, any>,
  ) {
    super({ statusCode, error, message, data }, httpStatus);
  }
}
