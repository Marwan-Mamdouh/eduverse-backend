import Stripe from "stripe";
import repo from "../courses/repository";
import repository from "./repository";
import { CustomResponse } from "../interfaces";

process.loadEnvFile(".env");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

interface OrderMetadata {
  coursesId: string[];
  userId: string;
}

const order = async (
  coursesId: string[],
  userId: string
): Promise<CustomResponse> => {
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
    success_url: `${process.env.FRONT_END_URL}success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONT_END_URL}/cancel`,

    metadata: {
      userId: userId,
      coursesId: JSON.stringify(coursesId),
    },
  });

  return { success: true, code: 200, data: session.url };
};
const stripeWebhook = async (
  body: Buffer,
  sig: string
): Promise<CustomResponse> => {
  const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  if (!event) return { success: false, code: 400, data: "Invalid signature" };
  let result;
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("✅ Payment succeeded for session:", session.id);

      // Fulfill the order (give user access to courses)
      result = await fulfillOrder(session);
      break;
    }

    case "checkout.session.async_payment_succeeded": {
      // Payment methods like bank transfers take time
      const asyncSession = event.data.object;
      console.log("✅ Async payment succeeded:", asyncSession.id);
      result = await fulfillOrder(asyncSession);
      break;
    }

    case "checkout.session.async_payment_failed": {
      const failedSession = event.data.object;
      console.log("❌ Async payment failed:", failedSession.id);
      // Handle failed payment (send email, etc.)
      break;
    }

    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      console.log("💰 Payment received:", paymentIntent.id);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
  // Return 200 to acknowledge receipt of the event
  return { success: true, code: 200, data: { result, received: true } };
};

export default { order, stripeWebhook };

// Helper function to fulfill the order
const fulfillOrder = async (session: Stripe.Checkout.Session) => {
  try {
    // Extract metadata from the session
    const userId = session.metadata?.userId;
    const coursesId = JSON.parse(session.metadata?.coursesId || "[]");

    if (!userId || coursesId.length === 0) {
      console.error("Missing metadata in session:", session.id);
      return;
    }

    console.log(`Fulfilling order for user ${userId}`);

    // Grant user access to courses
    const data = await repository.grantCourseAccess(userId, coursesId);
    console.log(`✅ Granted access to course ${coursesId} for user ${userId}`);

    // Optional: Send confirmation email
    // await sendConfirmationEmail(userId, coursesId);

    console.log(`🎉 Order fulfilled successfully for session: ${session.id}`);
    return data;
  } catch (error) {
    console.error("Error fulfilling order:", error);
    // You might want to log this to a monitoring service
  }
};
