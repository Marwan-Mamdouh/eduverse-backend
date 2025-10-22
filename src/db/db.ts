import mongoose from "mongoose";
process.loadEnvFile(".env");

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL ?? "")
    .then(() => console.log("connected"))
    .catch(() => console.log("something went wrong"));
};

export default connect;
