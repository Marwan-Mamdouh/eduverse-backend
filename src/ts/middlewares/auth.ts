import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
  userId?: string;
}

const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log("Validating user authentication...");
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ success: false, error: "Missing access token." });
      return;
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyAccessToken(token);
    req.user = decoded;
    req.userId = decoded.userId;
    console.log("authentication done");

    next();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({
          success: false,
          message: "Token expired",
        });
        return;
      }
      if (error.name === "JsonWebTokenError") {
        res.status(401).json({
          success: false,
          message: "Invalid token",
        });
        return;
      }
    }
    res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

export default authenticate;
