import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 320);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ease-out ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      <button
        onClick={handleClick}
        id="back-to-top"
        aria-label="Back to top"
        className="relative w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 active:scale-95 group shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #DF8435, #c97129)',
          boxShadow: '0 6px 25px rgba(223, 132, 53, 0.5)',
          color: '#ffffff',
        }}
      >
        {/* Pulsing Aura Ring */}
        <span className="absolute inset-0 rounded-full bg-[#DF8435] animate-ping opacity-25 pointer-events-none" />

        {/* Arrow Icon */}
        <svg
          className="w-5 h-5 transform group-hover:-translate-y-0.5 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}

