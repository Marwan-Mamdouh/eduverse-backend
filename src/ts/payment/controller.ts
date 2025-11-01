import { Response } from "express";
import paymentService from "./service";
import { AuthenticatedRequest } from "../middlewares/auth";

const createOrder = async (req: AuthenticatedRequest, res: Response) => {
  const { coursesIds } = req.body;
  const orderResponse = await paymentService.order(coursesIds);
  res.status(orderResponse.code).json(orderResponse);
};
export default { createOrder };
