import { Request, Response, NextFunction } from 'express';
//call signature need to use type = function

export const castchAsync = (
  _target: object,
  _name: string,
  descriptor: PropertyDescriptor,
) => {
  const method = descriptor.value;
  descriptor.value = (req: Request, res: Response, next: NextFunction) => {
    method(req, res, next).catch(next);
  };
};
