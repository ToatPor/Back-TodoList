import { Request, Response, NextFunction } from 'express';

export type IAsyncfnction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;
