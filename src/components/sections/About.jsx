import { useEffect, useRef } from 'react';

const sectionBlocks = [
  {
    id: 'about-us',
    tag: 'ABOUT US',
    title: 'We Invite You to Visit Our Coffee House',
    desc: 'Experience the finest culinary artistry and artisanal coffee in a warm, welcoming atmosphere. Our master chefs craft every dish with passion, local ingredients, and world-class precision.',
    buttonText: 'READ MORE',
    buttonHref: '#menu',
    image: '/chef_1.jpg',
    imageAlt: 'Master Chef plating a dish with tongs',
    imageRight: true,
    badgeText: '👨‍🍳 Master Chef Curated',
  },
  {
    id: 'specialties',
    tag: 'COFFEE MENU',
    title: 'Quality Kava Beans',
    desc: 'Sourced from organic micro-lots worldwide, our coffee beans and specialty dishes are roasted and prepared to perfection for an unforgettable flavor experience.',
    buttonText: 'READ MORE',
    buttonHref: '#menu',
    image: '/chef_3.jpg',
    imageAlt: 'Chef carefully garnishing a gourmet plate',
    imageRight: false,
    badgeText: '☕ 100% Organic Micro-lots',
  },
  {
    id: 'our-team',
    tag: 'OUR TEAM',
    title: 'Use the Tips & Recipes of Our Barista',
    desc: 'Our culinary team brings decades of international experience. From secret spice blends to plating techniques, we share our passion for exceptional gastronomy.',
    buttonText: 'READ MORE',
    buttonHref: '#contact',
    image: '/chef_2.jpg',
    imageAlt: 'Master Chef in kitchen with fresh ingredients',
    imageRight: true,
    badgeText: '✨ World-Class Baristas',
  },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
              .forEach((el, i) => {
                setTimeout(() => el.classList.add('visible'), i * 140);
              });
          }
        });
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="bg-[#0B0E11] py-16 sm:py-24 text-white overflow-hidden" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="rounded-xl overflow-hidden shadow-2xl border border-white/5 divide-y divide-white/5">
          {sectionBlocks.map((block) => (
            <div
              key={block.id}
              className="grid grid-cols-1 lg:grid-cols-2 min-h-[380px] lg:min-h-[440px] bg-[#0B0E11] group"
            >
              {/* Text Block */}
              <div
                className={`p-8 sm:p-12 lg:p-14 flex flex-col justify-center items-start bg-[#0B0E11] ${
                  block.imageRight ? 'order-1 lg:order-1' : 'order-1 lg:order-2'
                } reveal`}
              >
                <div className="max-w-lg">
                  {/* Tag with Animated Expanding Accent Line */}
                  <div className="flex flex-col items-start gap-1.5 mb-3.5">
                    <span className="accent-line-expand h-[2.5px] bg-gradient-to-r from-[#DF8435] to-[#f0a500] rounded-full" />
                    <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-gray-300 uppercase">
                      {block.tag}
                    </span>
                  </div>

                  {/* Section Headline */}
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4 group-hover:text-amber-50/95 transition-colors duration-300">
                    {block.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 font-normal">
                    {block.desc}
                  </p>

                  {/* READ MORE Button with Shimmer */}
                  <a
                    href={block.buttonHref}
                    className="btn-shimmer inline-block bg-[#DF8435] hover:bg-[#c97129] text-white font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-[3px] transition-all duration-300 shadow-[0_4px_14px_rgba(223,132,53,0.3)] hover:shadow-[0_6px_22px_rgba(223,132,53,0.5)] transform hover:-translate-y-0.5 active:scale-95"
                  >
                    {block.buttonText} →
                  </a>
                </div>
              </div>

              {/* Image Block with Zoom and Floating Quality Badge */}
              <div
                className={`relative min-h-[300px] lg:min-h-full overflow-hidden ${
                  block.imageRight ? 'order-2 lg:order-2' : 'order-2 lg:order-1'
                } reveal-scale`}
              >
                <img
                  src={block.image}
                  alt={block.imageAlt}
                  className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                
                {/* Floating Glassmorphic Quality Badge */}
                <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white shadow-xl animate-float-gentle">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DF8435] animate-ping" />
                    <span className="font-semibold text-[11px] tracking-wide">{block.badgeText}</span>
                  </div>
                </div>

                {/* Subtle vignette dark edge */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


