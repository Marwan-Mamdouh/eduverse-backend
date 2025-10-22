import mongoose from "mongoose";
process.loadEnvFile(".env");

const connect = async () => {
  await mongoose
    .connect(process.env.MONGO_URL ?? "")
    .then(() => console.log("connected"))
    .catch(() => console.log("something went wrong"));
};

export default connect;
