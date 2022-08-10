import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  let jwtPayload;

  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
    jwtPayload = <any>jwt.verify(token!, process.env.JWT_ACCESS_TOKEN!);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).json('Authorization denied.');
    return;
  }

  next();
};
export default authenticate;
