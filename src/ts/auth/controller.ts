import { Request, Response } from "express";
import service from "../user/service";
import { AuthenticatedRequest } from "../middlewares/auth";

const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, message: "Missing data." });
      return;
    }
    const response = await service.signIn(email, password);
    res.status(response.code).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error instanceof Error ? error.message : "Unknown error.",
    });
  }
};

const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.body) {
      res.status(400).json({ message: "Missing data." });
    }
    const response = await service.signUp(req.body);

    res.status(response.code).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error instanceof Error ? error.message : "Unknown error.",
    });
  }
};

const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res
        .status(400)
        .json({ success: false, message: "Refresh token required" });
      return;
    }
    const response = await service.refreshToken(refreshToken);
    res.status(response.code).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Token refresh failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
const logout = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(400).json({ success: false, message: "Invalid user id" });
      return;
    }
    const response = await service.logout(userId);
    res.status(response.code).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export default { signIn, signUp, refreshToken, logout };
