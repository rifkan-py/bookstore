import { Document, model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'USER' | 'AUTHOR';
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['USER', 'AUTHOR'],
      default: 'USER',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  const user = this as IUser;
  if (!user.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  } catch (error) {
    if (error instanceof Error) {
      return next(error);
    }
  }
});

userSchema.methods.validatePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

export default model<IUser>('Users', userSchema);
