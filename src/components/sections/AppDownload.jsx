import { useEffect, useRef } from 'react';

export default function AppDownload({ onOpenOrder }) {
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
    <section id="app-download" className="relative w-full text-white overflow-hidden bg-[#0B0E11]" ref={sectionRef}>
      {/* 100% Full-Width Edge-to-Edge Banner Image */}
      <img
        src="/order_banner.png"
        alt="Simple Way To Order Your Foods - TasteNest App"
        className="w-full h-auto min-h-[360px] sm:min-h-[420px] md:min-h-[460px] object-cover object-right md:object-center block transition-transform duration-1000"
      />

      {/* Floating Ambient Glowing Orb */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#DF8435]/15 blur-3xl pointer-events-none animate-ambient-orb" />

      {/* Left Column Text & Store Buttons Overlay */}
      <div className="absolute inset-0 flex items-center z-10 pointer-events-none">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
          <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg pointer-events-auto reveal-left">
            
            {/* Top Floating Badge */}
            <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-xs shadow-lg animate-float-gentle">
              <span className="w-2 h-2 rounded-full bg-[#DF8435] animate-ping" />
              <span className="text-[11px] font-semibold text-gray-200 uppercase tracking-wider">Fast Mobile App</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5 sm:mb-8 drop-shadow-2xl">
              Simple Way To Order Your Foods
            </h2>

            {/* Store Download Buttons & Direct Order */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              
              {/* Direct Web Order Button */}
              <button
                type="button"
                onClick={() => {
                  if (onOpenOrder) onOpenOrder();
                }}
                className="btn-shimmer bg-[#DF8435] hover:bg-[#c97129] text-white px-5 py-3 rounded-xl flex items-center gap-2.5 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(223,132,53,0.5)] active:scale-95 cursor-pointer"
              >
                <span>🛍️</span>
                <span>ORDER ONLINE</span>
              </button>

              {/* Google Play Button with Shimmer & Spring Lift */}
              <button
                type="button"
                id="btn-google-play"
                onClick={() => {
                  if (onOpenOrder) onOpenOrder();
                }}
                className="btn-shimmer bg-white hover:bg-amber-50 text-black px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-xl flex items-center gap-3 shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.6)] active:scale-95 group cursor-pointer"
              >
                <svg className="w-6 h-6 flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.6 1.8L14.2 12.4L3.6 23C3.2 22.6 3 22 3 21.3V2.7C3 2 3.2 1.4 3.6 1.8Z" fill="#2196F3"/>
                  <path d="M17.7 8.9L14.2 12.4L17.7 15.9L21.4 13.8C22.2 13.3 22.2 12.5 21.4 12L17.7 8.9Z" fill="#FFC107"/>
                  <path d="M14.2 12.4L3.6 1.8C4.1 1.4 4.8 1.4 5.5 1.8L17.7 8.9L14.2 12.4Z" fill="#4CAF50"/>
                  <path d="M14.2 12.4L17.7 15.9L5.5 23C4.8 23.4 4.1 23.4 3.6 23L14.2 12.4Z" fill="#F44336"/>
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-gray-600 leading-none mb-0.5">
                    GET IT ON
                  </span>
                  <span className="font-extrabold text-xs sm:text-sm leading-none text-black">
                    Google Play
                  </span>
                </div>
              </button>

              {/* Apple Store Button with Shimmer & Spring Lift */}
              <button
                type="button"
                id="btn-apple-store"
                onClick={() => {
                  if (onOpenOrder) onOpenOrder();
                }}
                className="btn-shimmer bg-white hover:bg-amber-50 text-black px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-xl flex items-center gap-3 shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.6)] active:scale-95 group cursor-pointer"
              >
                <svg className="w-6 h-6 flex-shrink-0 text-black fill-current transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.64c.67-.82 1.13-1.96.99-3.11-.98.04-2.17.66-2.87 1.48-.63.73-1.18 1.9-.99 3.03 1.1.09 2.22-.57 2.87-1.4"/>
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-gray-600 leading-none mb-0.5">
                    GET IT ON
                  </span>
                  <span className="font-extrabold text-xs sm:text-sm leading-none text-black">
                    Apple Store
                  </span>
                </div>
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
