import { NextFunction, Request, Response } from 'express';

export default class AppError extends Error {
  status: string;
  isOperational: boolean;

  constructor(public message: string, public statusCode: number = 500) {
    super(message);
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  err.status = err.status || 'Internal Server Error';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
  next();
}
