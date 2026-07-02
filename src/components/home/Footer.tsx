"use client";

export function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground pt-24 pb-10 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 pb-16 border-b border-white/15">
          <div className="md:col-span-2">
            <div className="font-display text-4xl">
              <em className="text-[color:var(--gold)]">J</em> Jalashay
            </div>
            <p className="mt-6 max-w-md text-primary-foreground/70 font-light">
              A serene lakeside escape on the eastern shore of Lake Suvarna. Two hours from the
              city. A world away from it.
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--gold)]">
              Find Us
            </p>
            <p className="mt-4 font-light leading-relaxed text-primary-foreground/80">
              Lake Suvarna
              <br />
              Eastern Shore, KA-573101
              <br />
              India
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--gold)]">
              Reservations
            </p>
            <p className="mt-4 font-light leading-relaxed text-primary-foreground/80">
              stay@jalashay.com
              <br />
              +91 80 4000 1212
            </p>
          </div>
        </div>
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between text-xs text-primary-foreground/50 gap-4">
          <span>© {new Date().getFullYear()} Jalashay Resort. All rights reserved.</span>
          <div className="flex gap-8 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-[color:var(--gold)]">
              Instagram
            </a>
            <a href="#" className="hover:text-[color:var(--gold)]">
              Privacy
            </a>
            <a href="#" className="hover:text-[color:var(--gold)]">
              Press
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
