import { useState, useEffect } from 'react';

// Each href maps to an actual section id in the page
const navLinks = [
  { label: 'Home',    href: '#home',         sectionId: 'home' },
  { label: 'Pages',   href: '#about',        sectionId: 'about' },
  { label: 'Blog',    href: '#reviews',      sectionId: 'reviews' },
  { label: 'Order',   href: '#app-download', sectionId: 'app-download' },
  { label: 'Menu',    href: '#menu',         sectionId: 'menu' },
  { label: 'Shop',    href: '#newsletter',   sectionId: 'newsletter' },
  { label: 'Contact', href: '#contact',      sectionId: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  // Scroll shadow effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: auto-update active tab based on which section is visible
  useEffect(() => {
    const sectionEls = navLinks
      .map(link => ({ label: link.label, el: document.getElementById(link.sectionId) }))
      .filter(item => item.el);

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is intersecting and has the highest ratio
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const matched = sectionEls.find(s => s.el === visible[0].target);
          if (matched) setActiveTab(matched.label);
        }
      },
      { threshold: 0.3, rootMargin: '-60px 0px -30% 0px' }
    );

    sectionEls.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} transition-all duration-500`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo with smooth hover float & glow */}
            <a href="#home" className="flex items-center group py-2 transition-transform duration-300 hover:scale-105">
              <img
                src="/logo.svg"
                alt="TasteNest Logo"
                className="h-14 md:h-16 w-auto object-contain drop-shadow-md transition-all duration-300 group-hover:brightness-110"
              />
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = activeTab === link.label;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setActiveTab(link.label)}
                    className={`relative py-1 text-sm md:text-[15px] font-medium tracking-wide transition-all duration-300 ${
                      isActive ? 'text-white font-semibold transform -translate-y-0.5' : 'text-gray-300 hover:text-white hover:-translate-y-0.5'
                    }`}
                  >
                    {link.label}
                    {isActive ? (
                      <span className="absolute -bottom-2 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#DF8435] to-[#f0a500] rounded-full shadow-[0_0_8px_rgba(223,132,53,0.8)] transition-all duration-300" />
                    ) : (
                      <span className="absolute -bottom-2 left-1/2 w-0 h-[2px] bg-[#DF8435] rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* RESERVATION Button with Shimmer and Pulse Glow on Hover */}
            <div className="hidden md:flex items-center">
              <a
                href="#reservation"
                className="btn-shimmer bg-gradient-to-r from-[#DF8435] to-[#c97129] hover:from-[#e28c3d] hover:to-[#df8435] text-white font-bold text-xs md:text-sm uppercase tracking-widest px-7 py-3 rounded-md transition-all duration-300 shadow-[0_4px_16px_rgba(223,132,53,0.35)] hover:shadow-[0_6px_25px_rgba(223,132,53,0.6)] transform hover:-translate-y-0.5 active:scale-95"
              >
                RESERVATION
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              id="hamburger-btn"
              className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer focus:outline-none transition-transform duration-200 active:scale-90"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line w-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 mb-4">
            <img
              src="/logo.svg"
              alt="TasteNest Logo"
              className="h-10 w-auto object-contain"
            />
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-gray-400 hover:text-white transition-transform duration-200 hover:rotate-90 text-2xl leading-none"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              style={{ transitionDelay: `${idx * 40}ms` }}
              className="mobile-nav-link transform hover:translate-x-2 transition-all duration-200"
              onClick={() => {
                setActiveTab(link.label);
                setMobileOpen(false);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-3">
          <a
            href="#reservation"
            className="btn-shimmer bg-[#DF8435] text-white text-center font-bold text-sm uppercase py-3.5 rounded-md shadow-lg transform hover:-translate-y-0.5 active:scale-95 transition-all"
            onClick={() => setMobileOpen(false)}
          >
            RESERVATION
          </a>
        </div>
      </div>
    </>
  );
}

