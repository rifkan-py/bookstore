import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

const signin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    res.json({ email, password });
    next();
  }
);

const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    res.json({ username, email, password });
    next();
  }
);

export { signin, signup };
