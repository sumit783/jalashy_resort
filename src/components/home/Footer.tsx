import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs uppercase tracking-[0.3em] text-muted-foreground md:flex-row">
        <span className="font-display text-base normal-case tracking-normal text-foreground flex items-center gap-2">
          <Image
            src="/Jalashay_Logo.webp"
            alt="Official brand logo of Jalashay Resort"
            width={24}
            height={24}
            className="object-contain"
          />
          Jalashay Resort
        </span>
        <span>© {new Date().getFullYear()} · Lakeside Hospitality</span>
      </div>
    </footer>
  );
}
