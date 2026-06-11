export default function Footer() {
  return (
    <footer className="border-t border-border/60 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs uppercase tracking-[0.3em] text-muted-foreground md:flex-row">
        <span className="font-display text-base normal-case tracking-normal text-foreground">
          Jalashay Resort
        </span>
        <span>© {new Date().getFullYear()} · Lakeside Hospitality</span>
      </div>
    </footer>
  );
}
