import { NextFunction, Request, Response } from 'express';

export interface TypedRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

enum Roles {
  USER = 'USERS',
  ATUHOR = 'AUTHORS',
}

const authorize =
  (...roles: Roles[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes((<TypedRequest>req).user.role))
      throw new Error('authorization denied.');
    next();
  };

export { authorize };
