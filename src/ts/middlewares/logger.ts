import { Request, Response, NextFunction } from "express";

export const loggerMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const method = req.method;
  const url = req.originalUrl;
  const time = new Date().toLocaleString();
  const body = JSON.stringify(req.body);

  // ANSI color codes
  const colors = {
    reset: "\x1b[0m",
    gray: "\x1b[90m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
  };

  let methodColor: string;

  switch (method) {
    case "GET":
      methodColor = colors.green;
      break;
    case "POST":
      methodColor = colors.blue;
      break;
    case "PUT":
      methodColor = colors.yellow;
      break;
    case "DELETE":
      methodColor = colors.red;
      break;
    default:
      methodColor = colors.white;
  }

  console.log(
    `${colors.gray}[${time}]${colors.reset} ${methodColor}${method}${
      colors.reset
    } ${colors.cyan}${url}${colors.reset} req body: ${body ?? ""}`
  );

  next();
};
