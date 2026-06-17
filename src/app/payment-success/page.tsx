import type { Metadata } from "next";
import PaymentSuccessClient from "./PaymentSuccessClient";

export const metadata: Metadata = {
  title: "Payment Successful — Jalashay Resort",
  description:
    "Your payment has been received successfully. Thank you for choosing Jalashay Resort.",
  robots: { index: false, follow: false },
};

export default function PaymentSuccessPage() {
  return <PaymentSuccessClient />;
}
