import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  console.error(err.message);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
};
