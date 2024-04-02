import mongoose from "mongoose";
async function connectDb() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("database connected");
  } catch (err) {
    console.log(err);
  }
}
export default connectDb;
