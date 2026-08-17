import { useState, useEffect } from 'react';

// Each href maps to an actual section id in the page
const navLinks = [
  { label: 'Home',    href: '#home',         sectionId: 'home' },
  { label: 'Pages',   href: '#about',        sectionId: 'about' },
  { label: 'Blog',    href: '#reviews',      sectionId: 'reviews' },
  { label: 'Order',   href: '#menu',         sectionId: 'menu' },
  { label: 'Menu',    href: '#menu',         sectionId: 'menu' },
  { label: 'Shop',    href: '#newsletter',   sectionId: 'newsletter' },
  { label: 'Contact', href: '#contact',      sectionId: 'contact' },
];

export default function Navbar({ onOpenReservation, onOpenOrder, onOpenContact }) {
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
      .map((link) => ({ label: link.label, el: document.getElementById(link.sectionId) }))
      .filter((item) => item.el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const matched = sectionEls.find((s) => s.el === visible[0].target);
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
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (link) => {
    setActiveTab(link.label);
    if (link.label === 'Order' && onOpenOrder) {
      onOpenOrder();
    }
    if (link.label === 'Contact' && onOpenContact) {
      onOpenContact();
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} transition-all duration-500`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo with smooth hover float & glow */}
            <a href="#home" className="flex items-center gap-3 group">
              <img
                src="/logo.svg"
                alt="TasteNest Logo"
                className="h-10 md:h-12 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300"
              />
            </a>

            {/* Desktop Navigation Links with animated active bar */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive = activeTab === link.label;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => handleNavClick(link)}
                    className={`nav-link text-xs lg:text-sm uppercase tracking-wider font-semibold py-2 px-3 lg:px-4 rounded transition-all duration-200 relative ${
                      isActive ? 'active text-[#DF8435]' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-[#DF8435] to-[#f0a500] rounded-full" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* RESERVATION Button with Shimmer and Pulse Glow on Hover */}
            <div className="hidden md:flex items-center">
              <button
                type="button"
                onClick={onOpenReservation}
                className="btn-shimmer bg-gradient-to-r from-[#DF8435] to-[#c97129] hover:from-[#e28c3d] hover:to-[#df8435] text-white font-bold text-xs md:text-sm uppercase tracking-widest px-7 py-3 rounded-md transition-all duration-300 shadow-[0_4px_16px_rgba(223,132,53,0.35)] hover:shadow-[0_6px_25px_rgba(223,132,53,0.6)] transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                RESERVATION
              </button>
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
            className="text-gray-400 hover:text-white transition-transform duration-200 hover:rotate-90 text-2xl leading-none cursor-pointer"
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
                handleNavClick(link);
                setMobileOpen(false);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            className="btn-shimmer bg-[#DF8435] text-white text-center font-bold text-sm uppercase py-3.5 rounded-md shadow-lg transform hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
            onClick={() => {
              setMobileOpen(false);
              if (onOpenReservation) onOpenReservation();
            }}
          >
            RESERVATION
          </button>
        </div>
      </div>
    </>
  );
}
