import User from "./model";
import { IUser } from "../ts/interfaces";

const repository = {
  get: async () => {
    return await User.find();
  },
  find: async (id: string) => {
    return await User.findById(id);
  },
  add: async (data: IUser) => {
    return await User.create(data);
  },
  update: async (id: string, data: IUser) => {
    return await User.findByIdAndUpdate(id, data);
  },
  remove: async (id: string) => {
    return await User.findByIdAndDelete(id);
  },
};

export default repository;
