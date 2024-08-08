import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "raf",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDb;
