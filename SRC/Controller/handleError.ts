import { IpathNotexist } from '../Utilities/Error';
import { Request, Response, NextFunction } from 'express';

export const handleError = (
  err: IpathNotexist,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};
