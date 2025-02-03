import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-01-27.acacia", // Correct API version
});

type Data = {
  id: string;
  amount: number;
  status: string;
  receipt_email: string | null;
};

// Handle GET requests
export async function GET() {
  try {
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 10,
    });

    const orders: Data[] = paymentIntents.data.map((intent) => ({
      id: intent.id,
      amount: intent.amount,
      status: intent.status,
      receipt_email: intent.receipt_email,
    }));

    return NextResponse.json(orders);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}


// Restrict unsupported methods
export async function POST() {
  return NextResponse.json(
    { error: "Method Not Allowed" },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: "Method Not Allowed" },
    { status: 405 }
  );
}
