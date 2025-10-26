import mongoose from "mongoose";
process.loadEnvFile(".env");

const connect = async () => {
  await mongoose
    .connect(process.env.MONGO_URL ?? "")
    .then(() => console.log("db connected successfully"))
    .catch(() => console.log("something went wrong, db did not connected"));
};

export default connect;
