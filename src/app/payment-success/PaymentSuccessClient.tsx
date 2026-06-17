"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  ArrowLeft,
  Copy,
  Check,
  Sparkles,
  CreditCard,
  Shield,
  Clock,
} from "lucide-react";

/* ─────────────────── animated background particles ─────────────────── */
function GoldParticles() {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; delay: number; duration: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 6,
        duration: Math.random() * 8 + 6,
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background:
              "radial-gradient(circle, oklch(0.88 0.12 82 / 0.8), oklch(0.72 0.15 72 / 0))",
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────── checkmark ring animation ─────────────────── */
function AnimatedCheckmark() {
  return (
    <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center">
      {/* outer pulsing ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, oklch(0.88 0.12 82 / 0.4), oklch(0.72 0.15 72 / 0.1), oklch(0.88 0.12 82 / 0.4))",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      {/* middle ring */}
      <motion.div
        className="absolute inset-1 rounded-full"
        style={{ background: "oklch(0.16 0.012 60)" }}
      />
      {/* inner glowing disc */}
      <motion.div
        className="absolute inset-2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 40% 35%, oklch(0.88 0.12 82 / 0.25), oklch(0.20 0.012 60) 70%)",
          border: "1px solid oklch(0.82 0.14 82 / 0.3)",
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 180 }}
      />
      {/* check icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 200 }}
        className="relative z-10"
      >
        <CheckCircle className="h-12 w-12 text-gold" strokeWidth={1.5} />
      </motion.div>
    </div>
  );
}

/* ─────────────────── detail row ─────────────────── */
function DetailRow({
  icon: Icon,
  label,
  value,
  copiable,
  delay,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  copiable?: boolean;
  delay: number;
}) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="group flex items-center justify-between gap-4 rounded-xl border border-border/30 bg-card/50 px-5 py-4 backdrop-blur-sm transition-colors hover:border-gold/20 hover:bg-card/80"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/10">
          <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {label}
          </p>
          <p className="mt-0.5 truncate text-sm font-medium text-foreground">{value}</p>
        </div>
      </div>
      {copiable && (
        <button
          onClick={copy}
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-border/30 text-muted-foreground transition-all hover:border-gold/30 hover:text-gold"
          title="Copy"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      )}
    </motion.div>
  );
}

/* ─────────────────── main content (reads searchParams) ───────────── */
function PaymentSuccessContent() {
  const searchParams = useSearchParams();

  const paymentId = searchParams.get("razorpay_payment_id") || "—";
  const linkId = searchParams.get("razorpay_payment_link_id") || "—";
  const status = searchParams.get("razorpay_payment_link_status") || "paid";
  const signature = searchParams.get("razorpay_signature") || "—";
  const referenceId = searchParams.get("razorpay_payment_link_reference_id");

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-16">
      <GoldParticles />

      {/* top ambient glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[50vh]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(0.82 0.14 82 / 0.12), transparent)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="shimmer-border relative z-10 mx-auto w-full max-w-lg rounded-2xl border border-border/20 bg-card/60 px-8 py-12 shadow-[var(--shadow-soft)] backdrop-blur-xl"
      >
        {/* Animated checkmark */}
        <AnimatedCheckmark />

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-green-400">
            {status === "paid" ? "Payment Successful" : status}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center font-display text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Thank You
          <span className="text-gold">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mx-auto mt-3 max-w-xs text-center text-sm leading-relaxed text-muted-foreground"
        >
          Your payment has been processed successfully. We look forward to welcoming you
          at&nbsp;
          <span className="text-gold-soft font-medium">Jalashay Resort</span>.
        </motion.p>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="gold-divider mx-auto my-8 !w-20 origin-center"
        />

        {/* Transaction details */}
        <div className="space-y-3">
          <DetailRow
            icon={CreditCard}
            label="Payment ID"
            value={paymentId}
            copiable
            delay={0.8}
          />
          <DetailRow
            icon={Sparkles}
            label="Payment Link ID"
            value={linkId}
            copiable
            delay={0.9}
          />
          {referenceId && (
            <DetailRow
              icon={Clock}
              label="Reference ID"
              value={referenceId}
              copiable
              delay={1.0}
            />
          )}
          <DetailRow
            icon={Shield}
            label="Signature"
            value={signature.slice(0, 20) + "…"}
            delay={1.0}
          />
        </div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/"
            className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-[var(--shadow-gold)] transition-transform hover:scale-[1.02]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>
          <Link
            href="/#contact"
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border/40 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground transition-all hover:border-gold/30 hover:text-gold"
          >
            Contact Us
          </Link>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="mt-8 text-center text-[11px] leading-relaxed text-muted-foreground/60"
        >
          A confirmation will be sent to your registered email.
          <br />
          For any queries, reach out to{" "}
          <a href="mailto:stay@jalashay.com" className="text-gold/70 hover:text-gold transition-colors">
            stay@jalashay.com
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}

/* ─────────────────── wrapper with Suspense boundary ─────────────────── */
export default function PaymentSuccessClient() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
