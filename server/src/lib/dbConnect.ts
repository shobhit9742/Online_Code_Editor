import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "code-compiler",
    });
    console.log("DB Connected");
  } catch (err) {
    console.log("Error Establishing Connection", err);
  }
};

export default dbConnect;
