import { useEffect, useRef, useState } from 'react';

export default function Newsletter() {
  const sectionRef = useRef(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-scale')
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setEmail('');
        setTimeout(() => setIsSuccess(false), 5000);
      }, 700);
    }
  };

  return (
    <section id="newsletter" className="relative min-h-[380px] sm:min-h-[420px] flex items-center overflow-hidden text-white bg-[#0B0E11]" ref={sectionRef}>
      {/* Background Image with subtle scale */}
      <img
        src="/newsletter_bg.jpg"
        alt="Subscribe to TasteNest Newsletter"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 scale-105"
      />

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/75 z-10" />

      {/* Ambient Floating Glow */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-[#DF8435]/15 blur-3xl pointer-events-none animate-ambient-orb z-10" />

      {/* Content Container */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 w-full py-16 sm:py-24">
        <div className="max-w-2xl reveal-left">
          
          {/* Tagline */}
          <div className="flex flex-col items-start gap-1.5 mb-3">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-gray-200 uppercase">
              NEWSLETTER
            </span>
            <span className="accent-line-expand h-[2.5px] bg-gradient-to-r from-[#DF8435] to-[#f0a500] rounded-full" />
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Subscribe Our Newsletter
          </h2>

          {/* Subtitle */}
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-8 max-w-xl font-normal">
            Get special promotions, secret recipes, invitations to exclusive tasting events, and monthly culinary perks directly to your inbox.
          </p>

          {/* Form / Success Alert */}
          {isSuccess ? (
            <div className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 px-5 py-4 rounded-xl flex items-center gap-3 animate-badge-pop max-w-lg shadow-xl backdrop-blur-md">
              <span className="text-xl">🎉</span>
              <div>
                <h4 className="font-bold text-sm text-white">Thank you for subscribing!</h4>
                <p className="text-xs text-emerald-200">Welcome to the TasteNest VIP culinary club.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-lg">
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-[#121b20]/90 border border-white/15 focus:border-[#DF8435] text-white placeholder-gray-400 px-5 py-3.5 rounded-lg w-full text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#DF8435]/30 transition-all shadow-inner"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-shimmer w-full sm:w-auto bg-[#DF8435] hover:bg-[#c97129] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-lg transition-all duration-300 shadow-[0_4px_16px_rgba(223,132,53,0.35)] hover:shadow-[0_8px_25px_rgba(223,132,53,0.55)] flex-shrink-0 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}


