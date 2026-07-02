"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("razorpay_payment_id");
  const linkId = searchParams.get("razorpay_payment_link_id");
  const status = searchParams.get("razorpay_payment_link_status");

  return (
    <div className="bg-card border border-border/80 rounded-[24px] p-8 max-w-md w-full shadow-2xl text-center relative overflow-hidden">
      <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 animate-bounce">
        ✓
      </div>
      <h1 className="font-display text-3xl text-foreground">Payment Successful!</h1>
      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
        Thank you! Your payment has been received and your booking request is now confirmed. We will reach out with the details shortly.
      </p>

      {/* Transaction Details */}
      {(paymentId || linkId) && (
        <div className="mt-8 pt-6 border-t border-border/60 text-left space-y-2.5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Transaction Info</p>
          {paymentId && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Payment ID:</span>
              <span className="font-mono text-foreground">{paymentId}</span>
            </div>
          )}
          {linkId && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Link ID:</span>
              <span className="font-mono text-foreground">{linkId}</span>
            </div>
          )}
          {status && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Status:</span>
              <span className="capitalize font-medium text-emerald-600 dark:text-emerald-400">{status}</span>
            </div>
          )}
        </div>
      )}

      <div className="mt-8">
        <Link
          href="/"
          className="btn-gold hover:[&]:btn-gold-hover text-xs uppercase tracking-[0.2em] inline-block px-8 py-3.5 transition-all w-full text-center"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 pt-24">
      <Suspense fallback={
        <div className="bg-card border border-border/80 rounded-[24px] p-8 max-w-md w-full shadow-2xl text-center">
          <div className="w-12 h-12 border-2 border-t-transparent border-[color:var(--gold)] rounded-full animate-spin mx-auto mb-4" />
          <h2 className="font-display text-xl text-foreground">Processing Details...</h2>
        </div>
      }>
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}
