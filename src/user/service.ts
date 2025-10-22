import { IUser } from "../ts/interfaces";
import repository from "./repository";

const get = async () => {
  return await repository.get();
};
const find = async (id: string) => {
  if (!id) throw new Error("id is required");
  return await repository.find(id);
};
const add = async (data: IUser) => {
  if (!data.name && !data.email && !data.password)
    throw new Error("Missing data");
  return await repository.add(data);
};
const update = async (id: string, data: IUser) => {
  if (!id) throw new Error("id is required");
  if (!data.name && !data.email && !data.password && !data.role)
    throw new Error("Missing data");
  return await repository.update(id, data);
};
const remove = async (id: string) => {
  if (!id) throw new Error("id is required");
  return await repository.remove(id);
};

export default { get, find, add, update, remove };
