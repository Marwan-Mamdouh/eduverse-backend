import { Request, Response } from "express";
import serivce from "./service";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await serivce.get();
    return res.status(200).json({ data: users });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await serivce.find(req.params.id);
    return res.status(200).json({ data: user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await serivce.add(req.body);
    return res
      .status(200)
      .json({ message: "User Created Successfully", data: user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await serivce.update(req.params.id, req.body);
    return res
      .status(200)
      .json({ message: "User Updated Successfully", data: user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await serivce.remove(req.params.id);
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default { getUsers, getUser, createUser, updateUser, deleteUser };
