import mongoose from "mongoose";
// process.loadEnvFile(".env");

const connect = async (): Promise<void> => {
  await mongoose
    .connect(process.env.MONGO_URL!)
    .then((): void => console.log("db connected successfully."))
    .catch((): void => console.error("something went wrong, db not connect."));
};

export default connect;
