import Stripe from "stripe";
import repo from "../courses/repository";
import { CustomResponse } from "../interfaces";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

const order = async (coursesId: string[]): Promise<CustomResponse> => {
  let totalPrice = 0;
  const coursesName = [];
  for (const courseId of coursesId) {
    const coursesData = await repo.getCourseRepo(courseId);
    totalPrice += coursesData!.price;
    coursesName.push(coursesData!.courseName);
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: coursesName.join(", "),
          },
          unit_amount: totalPrice * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://localhost4200/success",
    cancel_url: "https://localhost4200/cancel",
  });

  return { success: true, code: 200, data: session.url };
};

export default { order };
