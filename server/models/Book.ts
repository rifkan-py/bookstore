import { model, Schema, Types } from 'mongoose';

export interface Book extends Document {
  title: string;
  description: string;
  cover_images: string[];
  author: string;
  released_date: string;
  pages: number;
}

const bookSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    cover_images: {
      type: [String],
    },
    released_date: {
      type: String,
    },
    pages: {
      type: Number,
    },
    author: {
      type: Types.ObjectId,
      ref: 'Users',
    },
  },
  {
    timestamps: true,
  }
);

export default model<Book>('Books', bookSchema);
