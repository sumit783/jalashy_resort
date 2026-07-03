"use client";

// CSS-only parallax using clipPath + position:fixed — works on iOS Safari
// and all other browsers without any JavaScript scroll listeners.
// Technique is the same as used in the CTA section.

export function ParallaxBand({
  image,
  video,
  kicker,
  title,
  sub,
}: {
  image?: string;
  video?: string;
  kicker: string;
  title: string;
  sub: string;
}) {
  return (
    <section
      className="relative py-28 md:py-40 px-6 flex items-center justify-center overflow-hidden min-h-[75vh]"
      style={{ clipPath: "inset(0)" }}
    >
      {/* ── Fixed background (CSS parallax) ── */}
      {video ? (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          suppressHydrationWarning
          className="fixed inset-0 w-full h-full object-cover z-0"
        />
      ) : (
        <div
          className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/45 z-10" />

      {/* Content */}
      <div className="relative text-center text-white px-6 max-w-3xl z-20">
        <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--gold)]">{kicker}</p>
        <h3 className="font-display text-5xl md:text-7xl mt-4 text-balance">{title}</h3>
        <p className="mt-6 text-white/85 font-light text-lg">{sub}</p>
      </div>
    </section>
  );
}
