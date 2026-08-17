import { useEffect, useRef } from 'react';

const menuItems = [
  {
    id: 1,
    name: 'Italian Penne Pasta',
    category: 'Pasta',
    time: '15 - 20 Minutes',
    serves: 1,
    price: '$14.50',
    oldPrice: '$16.00',
    img: '/food_1.jpg',
    badge: '🔥 Chef Special',
  },
  {
    id: 2,
    name: 'Gourmet Double Burger',
    category: 'Burgers',
    time: '10 - 15 Minutes',
    serves: 1,
    price: '$12.50',
    oldPrice: '$14.00',
    img: '/food_2.jpg',
    badge: '⭐ Best Seller',
  },
  {
    id: 3,
    name: 'Roasted Garden Platter',
    category: 'Platters',
    time: '15 - 25 Minutes',
    serves: 2,
    price: '$18.00',
    oldPrice: '$20.50',
    img: '/food_3.jpg',
    badge: '🌱 Fresh Organic',
  },
];

export default function Menu({ onOpenOrder }) {
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
    <section id="menu" className="bg-[#0B0E11] py-20 sm:py-28 text-white border-t border-white/5 relative overflow-hidden" ref={sectionRef}>
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-[#DF8435]/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto reveal">
          <div className="inline-flex flex-col items-center gap-1.5 mb-3">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-gray-300 uppercase">
              MENU
            </span>
            <span className="accent-line-expand h-[2.5px] bg-gradient-to-r from-[#DF8435] to-[#f0a500] rounded-full" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Explore Our Foods
          </h2>

          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-normal">
            Prepared fresh to order using finest culinary traditions, farm-to-table organic produce, and chef special seasoning.
          </p>
        </div>

        {/* 3 Food Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {menuItems.map((item, idx) => (
            <div
              key={item.id}
              className={`bg-[#10171B] rounded-2xl border border-white/5 hover:border-[#DF8435]/40 overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(0,0,0,0.5),0_0_25px_rgba(223,132,53,0.15)] group reveal-scale stagger-${idx + 1}`}
            >
              {/* Dish Image with Hover Zoom & Floating Badge */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Tag */}
                <span className="absolute top-3 right-3 text-[10px] font-bold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white shadow-lg animate-float-gentle">
                  {item.badge}
                </span>
              </div>

              {/* Dish Details */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-[#DF8435] font-extrabold text-lg sm:text-xl tracking-wide mb-1 group-hover:text-[#f0a500] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-xs font-medium mb-4 flex items-center gap-2">
                    <span>⏱️ {item.time}</span>
                    <span>•</span>
                    <span>🍽️ Serves {item.serves}</span>
                  </p>
                </div>

                {/* Price & Order Now Button */}
                <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[#DF8435] font-black text-lg sm:text-xl">
                      {item.price}
                    </span>
                    <span className="line-through text-gray-500 text-xs font-semibold">
                      {item.oldPrice}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenOrder) {
                        onOpenOrder(item);
                      }
                    }}
                    className="btn-shimmer bg-[#DF8435] hover:bg-[#c97129] text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-[3px] transition-all duration-300 shadow-[0_4px_12px_rgba(223,132,53,0.3)] hover:shadow-[0_6px_20px_rgba(223,132,53,0.5)] transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                  >
                    Order Now
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


