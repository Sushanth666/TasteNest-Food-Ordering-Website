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
            <div className="bg-[#11181C]/95 backdrop-blur-md py-12 px-8 sm:px-12 rounded-2xl shadow-2xl border border-white/10 hover:border-[#DF8435]/40 transition-all duration-500 w-full max-w-md flex flex-col justify-center items-center text-center group">
              
              {/* Day Slot 1 */}
              <div className="mb-10">
                <h3 className="text-white font-bold text-lg sm:text-xl tracking-tight mb-2 font-sans">
                  Sunday to Tuesday
                </h3>
                <p className="text-gray-300 text-sm sm:text-base font-normal tracking-wide">
                  09:00 AM – 10.00 PM
                </p>
              </div>

              {/* Day Slot 2 */}
              <div>
                <h3 className="text-white font-bold text-lg sm:text-xl tracking-tight mb-2 font-sans">
                  Friday to Saturday
                </h3>
                <p className="text-gray-300 text-sm sm:text-base font-normal tracking-wide">
                  09:00 AM – 10.00 PM
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


