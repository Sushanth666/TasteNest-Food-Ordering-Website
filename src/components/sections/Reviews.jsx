import { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    id: 1,
    quote: 'The attention to detail in every cup and gourmet dish is astonishing. The ambiance, friendly service, and rich flavors make TasteNest my favorite retreat.',
    rating: 5,
    author: 'Johnathan Miller',
    role: 'Culinary Enthusiast',
    badgeBg: 'bg-[#DF8435]/20',
    badgeColor: 'text-[#DF8435]',
    starColor: 'text-[#DF8435]',
  },
  {
    id: 2,
    quote: 'Easily the best coffee house and culinary kitchen in the city. The aroma as you enter sets the tone, and every plate served is artwork.',
    rating: 5,
    author: 'Sophia Reynolds',
    role: 'Food & Lifestyle Blogger',
    badgeBg: 'bg-[#E07A5F]/20',
    badgeColor: 'text-[#E07A5F]',
    starColor: 'text-[#E07A5F]',
  },
  {
    id: 3,
    quote: 'From ordering on their fast mobile app to enjoying warm hospitality in-house, the experience is consistently 5-star perfection!',
    rating: 5,
    author: 'Marcus Vance',
    role: 'Product Designer',
    badgeBg: 'bg-[#E05688]/20',
    badgeColor: 'text-[#E05688]',
    starColor: 'text-[#E05688]',
  },
];

const statsData = [
  { target: 1287, label: 'VISITORS DAILY' },
  { target: 578, label: 'DELIVERIES MONTHLY' },
  { target: 1440, label: 'POSITIVE FEEDBACK' },
  { target: 40, label: 'AWARDS & HONORS' },
];

function StatCounter({ target, isCounting }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isCounting) return;
    let startTimestamp = null;
    const duration = 1800; // ms

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out quartic
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOut * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    window.requestAnimationFrame(step);
  }, [isCounting, target]);

  return <span>{count.toLocaleString()}</span>;
}

export default function Reviews() {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);

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

  // Stats number trigger observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="reviews" className="bg-[#0B0E11] py-20 sm:py-28 text-white border-t border-white/5 relative overflow-hidden" ref={sectionRef}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-80 h-80 rounded-full bg-[#DF8435]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#f0a500]/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Centered Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto reveal">
          <div className="inline-flex flex-col items-center gap-1.5 mb-3">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-gray-300 uppercase">
              REVIEWS
            </span>
            <span className="accent-line-expand h-[2.5px] bg-gradient-to-r from-[#DF8435] to-[#f0a500] rounded-full" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Why people choose us?
          </h2>

          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-normal">
            Read real stories and experiences from our beloved patrons, food connoisseurs, and everyday coffee lovers.
          </p>
        </div>

        {/* 3 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch reveal mb-12">
          {testimonials.map((item, idx) => (
            <div
              key={item.id}
              className={`bg-[#10171B]/90 hover:bg-[#131d22] p-8 sm:p-10 rounded-2xl border border-white/5 hover:border-[#DF8435]/40 text-center flex flex-col items-center justify-between shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(0,0,0,0.5),0_0_25px_rgba(223,132,53,0.15)] group stagger-${idx + 1}`}
            >
              {/* Quotation Badge Icon with float animation */}
              <div className={`w-14 h-14 rounded-full ${item.badgeBg} ${item.badgeColor} flex items-center justify-center font-serif text-3xl font-black mb-6 shadow-inner animate-float-slow group-hover:scale-110 transition-transform duration-300`}>
                “
              </div>

              {/* Review Text */}
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal italic">
                "{item.quote}"
              </p>

              {/* Rating Stars & Author Info */}
              <div className="flex flex-col items-center gap-2">
                {/* 5 Stars with subtle scale animation */}
                <div className="flex justify-center gap-1.5 text-base text-[#DF8435]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="transform transition-transform duration-300 group-hover:scale-110">★</span>
                  ))}
                </div>

                <h4 className="text-white font-extrabold text-sm tracking-wide mt-1 group-hover:text-[#DF8435] transition-colors">
                  {item.author}
                </h4>
                <span className="text-gray-500 text-[11px] font-medium">
                  {item.role}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center items-center gap-2.5 mb-20 reveal">
          {[0, 1, 2].map((dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => setActiveDot(dotIndex)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeDot === dotIndex
                  ? 'w-7 h-2.5 bg-gradient-to-r from-[#DF8435] to-[#f0a500] shadow-[0_0_10px_rgba(223,132,53,0.7)]'
                  : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${dotIndex + 1}`}
            />
          ))}
        </div>

        {/* Dashed Separator Line */}
        <div ref={statsRef} className="border-t border-dashed border-white/10 pt-16 reveal">
          {/* 4 Statistics Counter Items with Animated Count-up Numbers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
            {statsData.map((stat, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                  <StatCounter target={stat.target} isCounting={statsVisible} />
                  <span className="text-[#DF8435] ml-0.5 animate-pulse">+</span>
                </div>
                <span className="text-gray-400 text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase mt-2 group-hover:text-gray-200 transition-colors">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}


