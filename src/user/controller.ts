import { Request, Response } from "express";

const getUsers = async (req: Request, res: Response) => {
  try {
    // TODO : get all users
    return res.status(200).json({ message: "get all users" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    // TODO : get user by id
    return res.status(200).json({ message: "get user by id" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    // TODO : create user
    return res.status(200).json({ message: "create user" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    // TODO : update user by id
    return res.status(200).json({ message: "update user by id" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    // TODO : delete user by id
    return res.status(200).json({ message: "delete user by id" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { getUsers, getUser, createUser, updateUser, deleteUser };
