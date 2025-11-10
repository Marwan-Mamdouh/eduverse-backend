import { Response, Request } from "express";
import paymentService from "./service";
import { AuthenticatedRequest } from "../middlewares/auth";

const createOrder = async (req: AuthenticatedRequest, res: Response) => {
  const { coursesIds } = req.body;
  const orderResponse = await paymentService.order(coursesIds, req.userId!);
  res.status(orderResponse.code).json(orderResponse);
};

const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"]! as string;

  const response = await paymentService.stripeWebhook(req.body, sig);
  // Handle the Stripe webhook event here
  res.status(200).json({ success: true, code: 200, data: response });
};

export default { createOrder, stripeWebhook };
