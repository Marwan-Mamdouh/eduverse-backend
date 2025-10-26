import { Request, Response } from "express";
import service from "./service";
import { AuthenticatedRequest } from "../middlewares/auth";

const getUsers = async (req: Request, res: Response): Promise<void> => {
  const response = await service.get();
  res.status(response.code).json(response);
};

const getUser = async (req: Request, res: Response): Promise<void> => {
  const response = await service.find(req.params.id);
  res.status(response.code).json(response);
};

const getWatchLater = async (req: Request, res: Response): Promise<void> => {
  const response = await service.getWatchLater(req.params.id);
  res.status(response.code).json(response);
};
const createUser = async (req: Request, res: Response) => {
  const response = await service.add(req.body);
  return res.status(response.code).json(response);
};

const updateUser = async (req: Request, res: Response) => {
  const response = await service.update(req.params.id, req.body);
  return res.status(response.code).json(response);
};

const handleWatchLater = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { courseId, userId } = req.body;
  const response = await service.handleWatchLater(userId, courseId);
  res.status(response.code).json(response);
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const response = await service.remove(req.params.id);
  res.status(response.code).json(response);
};

export default {
  getUsers,
  getUser,
  getWatchLater,
  createUser,
  updateUser,
  handleWatchLater,
  deleteUser,
};
