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
      href: '#',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      ),
    },
    {
      label: 'Twitter',
      href: '#',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
        </svg>
      ),
    },
    {
      label: 'Instagram',
      href: '#',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: '#',
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

          {/* Column 1: Logo & Description */}
          <div className="lg:col-span-4">
            {/* Logo Image */}
            <a href="#home" className="inline-block mb-5 transform hover:scale-105 transition-transform duration-300">
              <img
                src="/logo.svg"
                alt="TasteNest Logo"
                className="h-12 md:h-14 w-auto object-contain"
              />
            </a>

            <p className="text-gray-400 text-xs leading-relaxed mb-6 font-normal max-w-xs">
              TasteNest is committed to artisanal culinary mastery, exceptional coffee roasting, and world-class hospitality in every experience.
            </p>

            {/* Social Icons with Spring Hover & Glow */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-9 h-9 rounded-full bg-white text-[#DF8435] flex items-center justify-center hover:bg-[#DF8435] hover:text-white transition-all duration-300 shadow-md font-bold text-xs transform hover:-translate-y-1 hover:rotate-6 hover:shadow-[0_0_15px_rgba(223,132,53,0.7)]"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Opening Restaurant */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-sm tracking-wide mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DF8435]" />
              Opening Restaurant
            </h4>
            <ul className="space-y-3 text-xs text-gray-400 font-normal">
              <li className="hover:text-gray-200 transition-colors">Sa - We: 09:00am - 10:00pm</li>
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
                <a href="#contact" className="hover:text-[#DF8435] transition-all duration-200 inline-flex items-center gap-1 group">
                  <span className="opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all text-[#DF8435]">›</span>
                  Contact Us
                </a>
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

