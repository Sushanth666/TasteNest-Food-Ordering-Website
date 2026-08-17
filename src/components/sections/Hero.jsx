import { useEffect, useRef } from 'react';

export default function Hero({ onOpenReservation }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-scale')
              .forEach((el, i) => {
                setTimeout(() => el.classList.add('visible'), i * 140);
              });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" ref={sectionRef}>
      {/* Exact uploaded restaurant background image with cinematic subtle Ken Burns animation */}
      <img
        src="/hero_bg.jpg"
        alt="Teal Modern Restaurant Interior"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 animate-ken-burns pointer-events-none"
      />

      {/* Smooth Dark Gradient Overlay allowing header transparency */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/55 to-black/75 z-10" />

      {/* Floating Ambient Glowing Light Orbs */}
      <div className="absolute top-1/4 left-1/5 w-72 h-72 rounded-full bg-[#DF8435]/15 blur-3xl pointer-events-none animate-ambient-orb z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#f0a500]/10 blur-3xl pointer-events-none animate-ambient-orb z-10" style={{ animationDelay: '-5s' }} />

      {/* Centered Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center py-24 flex flex-col items-center justify-center">
        {/* Top Tagline with glowing accent pulse */}
        <div className="inline-flex items-center gap-2 mb-4 reveal">
          <span className="w-6 h-[1.5px] bg-[#DF8435] animate-pulse" />
          <p className="hero-tagline text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-gray-200">
            HELLO, NEW FRIEND
          </p>
          <span className="w-6 h-[1.5px] bg-[#DF8435] animate-pulse" />
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-white tracking-wide leading-tight mb-8 reveal drop-shadow-lg max-w-4xl">
          RESERVE YOUR TABLE
        </h1>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 reveal">
          <button
            type="button"
            onClick={onOpenReservation}
            className="btn-shimmer border-2 border-white/90 hover:border-[#DF8435] bg-transparent hover:bg-[#DF8435] text-white font-bold text-xs sm:text-sm uppercase tracking-[0.18em] px-8 py-3.5 rounded transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_30px_rgba(223,132,53,0.5)] transform hover:-translate-y-1 active:scale-95 cursor-pointer"
          >
            BOOK A TABLE
          </button>
          <a
            href="#menu"
            className="border-2 border-transparent hover:border-white/20 hover:bg-white/10 text-white hover:text-[#DF8435] font-bold text-xs sm:text-sm uppercase tracking-[0.18em] px-6 py-3.5 rounded transition-all duration-300 transform hover:-translate-y-0.5"
          >
            OPEN MENU →
          </a>
        </div>
      </div>
    </section>
  );
}


