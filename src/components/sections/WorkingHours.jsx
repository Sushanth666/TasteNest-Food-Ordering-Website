import { useEffect, useRef } from 'react';

export default function WorkingHours({ onOpenReservation, onOpenContact }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-scale')
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
    <section id="working-hours" className="relative min-h-[460px] md:min-h-[500px] flex items-center overflow-hidden text-white bg-[#0B0E11]" ref={sectionRef}>
      {/* Background Image of Chef Preparing Food */}
      <img
        src="/working_hours_bg.jpg"
        alt="Chef preparing fresh ingredients"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 scale-105"
      />

      {/* Subtle vignette dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/65 z-10" />

      {/* Floating Ambient Glowing Orb behind schedule */}
      <div className="absolute top-1/3 right-10 w-72 h-72 rounded-full bg-[#DF8435]/15 blur-3xl pointer-events-none animate-ambient-orb z-10" />

      {/* Content Container */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 w-full py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Title & Buttons */}
          <div className="lg:col-span-7 reveal-left">
            {/* Tagline matching reference */}
            <div className="flex flex-col items-start gap-1.5 mb-3">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-gray-200 uppercase">
                RESERVATION
              </span>
              <span className="accent-line-expand h-[2.5px] bg-gradient-to-r from-[#DF8435] to-[#f0a500] rounded-full" />
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Working Hours
            </h2>

            <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-md">
              Join us for freshly brewed mornings, exquisite afternoon meals, or intimate evening dinners.
            </p>

            {/* Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={onOpenReservation}
                className="btn-shimmer bg-[#DF8435] hover:bg-[#c97129] text-white font-bold text-xs uppercase tracking-widest px-7 py-3 rounded-[3px] transition-all duration-300 shadow-[0_4px_16px_rgba(223,132,53,0.35)] hover:shadow-[0_8px_25px_rgba(223,132,53,0.55)] transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                BOOK A TABLE
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onOpenContact) onOpenContact();
                }}
                className="text-white hover:text-[#DF8435] font-bold text-xs uppercase tracking-widest px-4 py-3 transition-colors duration-300 transform hover:translate-x-1 cursor-pointer"
              >
                CONTACT US →
              </button>
            </div>
          </div>

          {/* Right Column: Solid Dark Charcoal Card Overlay with Glowing Border */}
          <div className="lg:col-span-5 reveal-scale flex justify-start lg:justify-end">
            <div className="bg-[#11181C]/95 backdrop-blur-md p-8 sm:p-10 md:p-12 rounded-2xl shadow-2xl border border-white/10 hover:border-[#DF8435]/40 transition-all duration-500 w-full max-w-md group">
              
              {/* Header inside card */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <span className="text-xs font-bold tracking-widest uppercase text-[#DF8435] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Service Schedule
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider bg-white/5 px-2.5 py-1 rounded">
                  All Week
                </span>
              </div>

              {/* Day Slot 1 */}
              <div className="mb-6 p-4 rounded-xl bg-white/[0.03] hover:bg-[#DF8435]/10 border border-white/5 hover:border-[#DF8435]/30 transition-all duration-300 transform hover:translate-x-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-white font-bold text-base sm:text-lg tracking-tight">
                    Sunday to Tuesday
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                    OPEN
                  </span>
                </div>
                <p className="text-[#DF8435] text-xs font-semibold tracking-wider uppercase">
                  09:00 AM – 10:00 PM
                </p>
              </div>

              {/* Day Slot 2 */}
              <div className="p-4 rounded-xl bg-white/[0.03] hover:bg-[#DF8435]/10 border border-white/5 hover:border-[#DF8435]/30 transition-all duration-300 transform hover:translate-x-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-white font-bold text-base sm:text-lg tracking-tight">
                    Friday to Saturday
                  </h3>
                  <span className="text-[10px] font-bold text-[#DF8435] bg-[#DF8435]/10 px-2 py-0.5 rounded">
                    LATE NIGHT
                  </span>
                </div>
                <p className="text-[#DF8435] text-xs font-semibold tracking-wider uppercase">
                  09:00 AM – 11:30 PM
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


