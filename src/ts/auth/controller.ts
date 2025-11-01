import { Request, Response } from "express";
import service from "../user/service";
import { AuthenticatedRequest } from "../middlewares/auth";

const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ success: false, message: "Missing data." });
    return;
  }
  const response = await service.signIn(email, password);
  res.status(response.code).json(response);
};

const signInWithGoogle = async (req: Request, res: Response): Promise<void> => {
  const { name, email } = req.body;
  const response = await service.signInWithGoogle(name, email);
  res.status(response.code).json(response);
};

const signUp = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).json({ message: "Missing data." });
    return;
  }
  const response = await service.signUp(req.body);
  res.status(response.code).json(response);
};

const refreshToken = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.status(400).json({ success: false, message: "Refresh token required" });
    return;
  }
  const response = await service.refreshToken(refreshToken);
  res.status(response.code).json(response);
};

const logout = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId;
  if (!userId) {
    res.status(400).json({ success: false, message: "Invalid user id" });
    return;
  }
  const response = await service.logout(userId);
  res.status(response.code).json(response);
};

export default { signIn, signInWithGoogle, signUp, refreshToken, logout };
