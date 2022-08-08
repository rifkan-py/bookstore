import mongoose from 'mongoose';

async function connectDB() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('mongodb connected successful');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
export default connectDB;
