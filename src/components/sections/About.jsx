import { useEffect, useRef, useState } from 'react';

const sectionBlocks = [
  {
    id: 'about-us',
    tag: 'ABOUT US',
    title: 'We Invite You to Visit Our Coffee House',
    desc: 'Experience the finest culinary artistry and artisanal coffee in a warm, welcoming atmosphere. Our master chefs craft every dish with passion, local ingredients, and world-class precision.',
    elaborateText:
      'Founded with a profound dedication to culinary excellence, TasteNest unites world-renowned coffee roasters and Michelin-trained chefs. Every morning begins at dawn with small-batch single-origin bean roasting, hand-pulled espresso extractions, and artisan scratch baking. Whether you join us for a sunrise breakfast, a productive midday business lunch, or an evening candlelit tasting menu, our team ensures an unforgettable gastronomic journey.',
    highlights: [
      '🔥 Small-Batch Handcrafted Coffee Blends',
      '🌿 100% Farm-To-Table Organic Produce',
      '🍷 Sommelier-Curated International Wine Pairings',
    ],
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
    elaborateText:
      'We partner directly with high-altitude, shade-grown micro-lot farms across Ethiopia, Colombia, Guatemala, and Sumatra. Our beans undergo slow drum roasting in small batches to preserve their delicate citrus undertones, velvety dark cocoa finish, and rich natural crema. We calibrate every single cup by water mineral profile, grind consistency, and optimal water temperature for pure perfection.',
    highlights: [
      '☕ Direct-Trade Certified Micro-Lot Beans',
      '🍫 Rich Tasting Notes of Caramel, Berry & Dark Cocoa',
      '🔬 Siphon & V60 Pour-Over Manual Brew Bar',
    ],
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
    elaborateText:
      'Our team is led by Executive Chef Marco and Champion Head Barista Elena, blending classical European gastronomy with modern culinary innovation. We host weekly barista masterclasses, live latte art showcases, and private tasting workshops. Our chefs love sharing secret extraction tips, home recipe cards, and pairing guides with our valued guests.',
    highlights: [
      '✨ 25+ Years of Combined Gastronomic Leadership',
      '🏆 SCA-Certified Master Baristas & Roasters',
      '👨‍🍳 Interactive Workshops & Seasonal Tasting Menus',
    ],
    image: '/chef_2.jpg',
    imageAlt: 'Master Chef in kitchen with fresh ingredients',
    imageRight: true,
    badgeText: '✨ World-Class Baristas',
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const [expandedBlocks, setExpandedBlocks] = useState({});

  const toggleExpand = (id) => {
    setExpandedBlocks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
          {sectionBlocks.map((block) => {
            const isExpanded = !!expandedBlocks[block.id];

            return (
              <div
                key={block.id}
                className="grid grid-cols-1 lg:grid-cols-2 min-h-[380px] lg:min-h-[440px] bg-[#0B0E11] group transition-all duration-300"
              >
                {/* Text Block */}
                <div
                  className={`p-8 sm:p-12 lg:p-14 flex flex-col justify-center items-start bg-[#0B0E11] ${
                    block.imageRight ? 'order-1 lg:order-1' : 'order-1 lg:order-2'
                  } reveal`}
                >
                  <div className="max-w-lg w-full">
                    {/* Tag with Animated Expanding Accent Line */}
                    <div className="flex flex-col items-start gap-1.5 mb-3.5">
                      <span className="accent-line-expand h-[2.5px] bg-gradient-to-r from-[#DF8435] to-[#f0a500] rounded-full" />
                      <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-gray-300 uppercase">
                        {block.tag}
                      </span>
                    </div>

                    {/* Section Headline */}
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4 group-hover:text-amber-50/95 transition-colors duration-300 font-serif">
                      {block.title}
                    </h2>

                    {/* Short Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 font-normal">
                      {block.desc}
                    </p>

                    {/* Elaborate Expanded Content */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isExpanded ? 'max-h-[500px] opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0'
                      }`}
                    >
                      <div className="p-4 rounded-xl bg-[#10171B] border border-[#DF8435]/25 space-y-3 shadow-inner">
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          {block.elaborateText}
                        </p>
                        
                        {/* Highlight Bullets */}
                        <div className="pt-2 border-t border-white/5 space-y-1.5">
                          {block.highlights.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#DF8435]">
                              <span>•</span>
                              <span className="text-gray-200">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* READ MORE / SHOW LESS Button */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(block.id)}
                      className="btn-shimmer inline-flex items-center gap-2 bg-[#DF8435] hover:bg-[#c97129] text-white font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-[3px] transition-all duration-300 shadow-[0_4px_14px_rgba(223,132,53,0.3)] hover:shadow-[0_6px_22px_rgba(223,132,53,0.5)] transform hover:-translate-y-0.5 active:scale-95 cursor-pointer mt-2"
                    >
                      {isExpanded ? 'SHOW LESS ↑' : 'READ MORE →'}
                    </button>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
