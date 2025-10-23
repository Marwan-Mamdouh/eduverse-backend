import jwt, { SignOptions } from "jsonwebtoken";
import { TokenPayload } from "../interfaces";
import { authConfig } from "../config/auth.config";

const generateAccessToken = (payload: TokenPayload): string =>
  jwt.sign(payload, authConfig.jwtSecret, {
    expiresIn: authConfig.jwtExpiresIn,
  } as SignOptions);

const generateRefreshToken = (payload: TokenPayload) => {
  return jwt.sign(payload, authConfig.jwtRefreshSecret, {
    expiresIn: authConfig.jwtRefreshExpiresIn,
  } as SignOptions);
};

const verifyAccessToken = (token: string): TokenPayload =>
  jwt.verify(token, authConfig.jwtSecret) as TokenPayload;

const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, authConfig.jwtRefreshSecret) as TokenPayload;
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
