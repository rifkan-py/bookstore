import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Book from '../models/Book';

// auth required
// only authors can create book
const createBook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, released_date, pages } = req.body;
    const book = await Book.findOne({ title });

    if (book)
      throw new Error('this title is aleady exists, try diffrent names');

    const newBook = await Book.create({
      title,
      description,
      released_date,
      pages,
    });

    res.json(newBook);

    next();
  }
);

// auth requierd
// not protected. anyone can access this route
const getAllBooks = asyncHandler(
  async (_, res: Response, next: NextFunction) => {
    res.json('allbooks');

    next();
  }
);

// auth requierd
// not protected. anyone can access this route
const getSingleBook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const book = await Book.findById(req.params.id);
    res.json(book);
    next();
  }
);

// auth requierd
// only authors can view thir own books
const getMyBooks = asyncHandler(
  async (_, res: Response, next: NextFunction) => {
    res.json('allmybooks');

    next();
  }
);

export { createBook, getAllBooks, getSingleBook, getMyBooks };
