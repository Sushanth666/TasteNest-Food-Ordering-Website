import { useEffect, useRef } from 'react';

const featuresData = [
  {
    id: 'menu-every-taste',
    title: 'MENU FOR EVERY TASTE',
    desc: 'Indulge in a versatile selection of handcrafted dishes tailored for every dietary preference and craving.',
    iconSrc: '/feature_icon_1.png',
    iconAlt: 'Menu for every taste icon',
    floatDelay: '0s',
  },
  {
    id: 'quality-beans',
    title: 'ALWAYS QUALITY BEANS',
    desc: 'Sourced from the world’s best organic growers, freshly roasted in-house to preserve peak aromatic richness.',
    iconSrc: '/feature_icon_3.png',
    iconAlt: 'Always quality beans icon',
    floatDelay: '-1.5s',
  },
  {
    id: 'experienced-barista',
    title: 'EXPERIENCED BARISTA',
    desc: 'Master craftspeople dedicated to dialing in the ideal extraction, texture, and latte art for every cup.',
    iconSrc: '/feature_icon_2.png',
    iconAlt: 'Experienced barista icon',
    floatDelay: '-3s',
  },
];

export default function WhyChooseUs() {
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
    <section className="bg-[#0B0E11] py-20 sm:py-28 text-white border-t border-white/5 relative overflow-hidden" ref={sectionRef}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#DF8435]/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Centered Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto reveal">
          <div className="inline-flex flex-col items-center gap-1.5 mb-3">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-gray-300 uppercase">
              FEATURES
            </span>
            <span className="accent-line-expand h-[2.5px] bg-gradient-to-r from-[#DF8435] to-[#f0a500] rounded-full" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Why people choose us?
          </h2>

          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-normal">
            We combine world-class culinary expertise, sustainably sourced ingredients, and warm hospitality to make every visit memorable.
          </p>
        </div>

        {/* 3 Feature Cards with Floating Icons & Glass Glow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch text-center">
          {featuresData.map((f, idx) => (
            <div
              key={f.id}
              className={`bg-[#10171B]/80 hover:bg-[#131d22] p-8 sm:p-10 rounded-2xl border border-white/5 hover:border-[#DF8435]/40 flex flex-col items-center group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_16px_35px_rgba(0,0,0,0.5),0_0_25px_rgba(223,132,53,0.15)] reveal-scale stagger-${idx + 1}`}
            >
              {/* Icon Container with Floating Keyframe & Glow */}
              <div
                className="h-20 w-20 mb-6 rounded-2xl bg-[#DF8435]/10 border border-[#DF8435]/25 flex items-center justify-center transition-all duration-500 group-hover:scale-115 group-hover:bg-[#DF8435]/20 group-hover:border-[#DF8435]/60 group-hover:shadow-[0_0_20px_rgba(223,132,53,0.4)] animate-float-slow"
                style={{ animationDelay: f.floatDelay }}
              >
                <img
                  src={f.iconSrc}
                  alt={f.iconAlt}
                  className="max-h-12 max-w-12 object-contain filter drop-shadow-md transition-transform duration-500 group-hover:rotate-6"
                />
              </div>

              <h3 className="text-white font-black text-sm sm:text-base tracking-[0.08em] uppercase mb-3 group-hover:text-[#DF8435] transition-colors duration-300">
                {f.title}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto font-normal">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

