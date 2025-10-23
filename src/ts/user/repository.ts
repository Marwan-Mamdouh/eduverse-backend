import User from "./model";
import { IUser } from "../interfaces";

const repository = {
  get: async () => {
    return await User.find({}, { password: 0, refreshToken: 0 });
  },
  find: async (id: string) => {
    return await User.findById(id, { password: 0 });
  },
  add: async (data: IUser) => {
    return await User.create(data);
  },
  update: async (id: string, data: IUser) => {
    return await User.findByIdAndUpdate(id, data, { new: true });
  },
  remove: async (id: string) => {
    return await User.findByIdAndDelete(id);
  },
  findByEmail: async (email: string) => {
    if (!email) throw new Error("Missing email.");
    return await User.findOne({ email }, { refreshToken: 0, name: 0 });
  },
};

export default repository;
