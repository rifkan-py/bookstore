import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const signin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error('Invalid user creadintial');

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) throw new Error('invalid credintioal.');

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const token = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_TOKEN!);

    res.json({ token, user });
    next();
  }
);

const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) throw new Error('User already exists with given email');
    const newUser = await User.create({ ...req.body });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_ACCESS_TOKEN!);

    res.json({ token, newUser });
    next();
  }
);

export { signin, signup };
