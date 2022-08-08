import { NextFunction, Request, Response } from 'express';

interface TypedRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

const authorize =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes((<TypedRequest>req).user.role))
      throw new Error('authorization denied.');
    next();
  };

export { authorize };
