import User from "./model";
import { IUser } from "../interfaces";

const repository = {
  get: async () => {
    return await User.find(
      {},
      { password: 0, refreshToken: 0, createdAt: 0, updatedAt: 0 }
    );
  },
  getWatchLater: async (userId: string) => {
    return await User.findById(userId, { name: 1, watchLater: 1 });
  },
  find: async (id: string) => {
    return await User.findById(id, {
      name: 1,
      email: 1,
      updatedAt: 1,
      role: 1,
    });
  },
  add: async (data: IUser) => {
    return await User.create(data);
  },
  update: async (id: string, data: IUser) => {
    return await User.findByIdAndUpdate(id, data, {
      new: true,
      projection: { name: 1, email: 1, updatedAt: 1, role: 1 },
    });
  },
  updateWatchLater: async (userId: string, query: any) => {
    return await User.findByIdAndUpdate(userId, query, {
      new: true,
      projection: { name: 1, watchLater: 1 },
    });
  },
  remove: async (id: string) => {
    return await User.findByIdAndDelete(id);
  },
  findByEmail: async (email: string) => {
    if (!email) throw new Error("Missing email.");
    return await User.findOne({ email }, { email: 1, password: 1, role: 1 });
  },
};

export default repository;
