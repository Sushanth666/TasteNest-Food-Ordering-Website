import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const socialLinks = [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      ),
    },
    {
      label: 'Twitter',
      href: 'https://twitter.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
        </svg>
      ),
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
    },
  ];

  return (
    <footer id="contact" className="bg-[#0B0E11] text-gray-400 border-t border-white/5 pt-16 pb-12 font-sans relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Column 1: Brand Info & Social Icons */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="TasteNest Logo"
                className="h-10 w-auto object-contain drop-shadow"
              />
            </div>
            
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal max-w-sm">
              Artisanal fine dining and specialty coffee house offering hand-crafted culinary recipes, farm-to-table ingredients, and luxury ambient hospitality.
            </p>

            {/* Social Icons with Spring-hover & Amber Glow */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white text-[#DF8435] hover:bg-[#DF8435] hover:text-white flex items-center justify-center transition-all duration-300 shadow-md font-bold text-xs transform hover:-translate-y-1.5 hover:rotate-6 hover:shadow-[0_0_15px_rgba(223,132,53,0.7)]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Working Hours */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-sm tracking-wide mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DF8435]" />
              Working Hours
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-normal">
              <li className="hover:text-gray-200 transition-colors">Monday: 09:00am - 08:00pm</li>
              <li className="hover:text-gray-200 transition-colors">Tuesday: 09:00am - 08:00pm</li>
              <li className="hover:text-gray-200 transition-colors">Wednesday: 09:00am - 08:00pm</li>
              <li className="hover:text-gray-200 transition-colors">Thu - We: 09:00am - 10:00pm</li>
              <li className="text-[#DF8435] font-semibold">Friday: Open for Special Events</li>
            </ul>
          </div>

          {/* Column 3: User Link */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm tracking-wide mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DF8435]" />
              User Link
            </h4>
            <ul className="space-y-3 text-xs text-gray-400 font-normal">
              <li>
                <a href="#about" className="hover:text-[#DF8435] transition-all duration-200 inline-flex items-center gap-1 group">
                  <span className="opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all text-[#DF8435]">›</span>
                  About Us
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenContact) onOpenContact();
                  }}
                  className="hover:text-[#DF8435] transition-all duration-200 inline-flex items-center gap-1 group cursor-pointer text-left"
                >
                  <span className="opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all text-[#DF8435]">›</span>
                  Contact Us
                </button>
              </li>
              <li>
                <a href="#app-download" className="hover:text-[#DF8435] transition-all duration-200 inline-flex items-center gap-1 group">
                  <span className="opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all text-[#DF8435]">›</span>
                  Order Delivery
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#DF8435] transition-all duration-200 inline-flex items-center gap-1 group">
                  <span className="opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all text-[#DF8435]">›</span>
                  Food Menu
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#DF8435] transition-all duration-200 inline-flex items-center gap-1 group">
                  <span className="opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all text-[#DF8435]">›</span>
                  Guest Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us & Subscribe Form */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-sm tracking-wide mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DF8435]" />
              Contact Us
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed font-normal">
              543 Country Club Ave,
            </p>
            <p className="text-xs text-gray-400 leading-relaxed font-normal mb-1">
              NC 27587, London, UK
            </p>
            <p className="text-xs text-[#DF8435] font-semibold leading-relaxed mb-6">
              +1257 6541120
            </p>

            {/* Email + Subscribe Form with feedback */}
            {subscribed ? (
              <div className="bg-[#DF8435]/20 border border-[#DF8435]/40 text-[#DF8435] px-3.5 py-2.5 rounded-md text-xs font-semibold animate-badge-pop">
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-stretch overflow-hidden rounded-md shadow-md max-w-xs border border-white/10 group focus-within:border-[#DF8435] transition-colors">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white text-gray-800 placeholder-gray-400 px-4 py-2.5 text-xs w-full focus:outline-none"
                />
                <button
                  type="submit"
                  className="btn-shimmer bg-[#DF8435] hover:bg-[#c97129] text-white font-semibold text-xs px-5 py-2.5 transition-all duration-300 flex-shrink-0 whitespace-nowrap cursor-pointer active:scale-95"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </footer>
  );
}

