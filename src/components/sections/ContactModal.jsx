import { useEffect, useState } from 'react';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 700);
  };

  const handleCloseAll = () => {
    setIsSent(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-lg overflow-y-auto animate-fade-in">
      
      {/* Backdrop overlay */}
      <div className="fixed inset-0" onClick={handleCloseAll} aria-hidden="true" />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#10171B] border border-[#DF8435]/40 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-6 sm:p-10 my-8 z-10 animate-scale-in max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleCloseAll}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-[#DF8435] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:rotate-90 text-base font-bold cursor-pointer z-20 shadow-md"
          aria-label="Close contact modal"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center mb-8 pr-8 sm:pr-0">
          <div className="inline-flex flex-col items-center gap-1 mb-2">
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#DF8435] uppercase">
              GET IN TOUCH
            </span>
            <span className="w-8 h-[2px] bg-[#DF8435]" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-serif">
            Contact TasteNest Concierge
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            Have questions about table reservations, private catering, or special events? We are here to assist.
          </p>
        </div>

        {isSent ? (
          /* Success confirmation state */
          <div className="text-center py-10 space-y-4 animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-[#DF8435]/20 border border-[#DF8435] text-[#DF8435] text-3xl flex items-center justify-center mx-auto mb-4 animate-badge-pop">
              ✓
            </div>
            <h3 className="text-2xl font-bold text-white font-serif">Message Received!</h3>
            <p className="text-sm text-gray-300 max-w-md mx-auto">
              Thank you, <span className="text-white font-semibold">{formData.name}</span>. Our concierge desk has received your note and will reply to <span className="text-[#DF8435] font-semibold">{formData.email}</span> shortly.
            </p>
            <button
              type="button"
              onClick={handleCloseAll}
              className="btn-shimmer bg-[#DF8435] hover:bg-[#c97129] text-white font-bold text-xs uppercase px-8 py-3 rounded-lg transition-all shadow-md cursor-pointer mt-4"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Direct Info Cards (5 Cols) */}
            <div className="md:col-span-5 space-y-4">
              
              {/* Phone Card */}
              <a
                href="tel:+12576541120"
                className="p-4 rounded-xl bg-[#162026] border border-white/5 hover:border-[#DF8435]/40 flex items-start gap-3.5 transition-all group block"
              >
                <span className="text-2xl p-2 rounded-lg bg-white/5 text-[#DF8435] group-hover:scale-110 transition-transform">
                  📞
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Direct Telephone</h4>
                  <p className="text-xs text-gray-300 mt-0.5 font-semibold group-hover:text-[#DF8435] transition-colors">+1257 6541120</p>
                  <span className="text-[10px] text-gray-400">Available Daily 09:00 AM – 10:00 PM</span>
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:reservations@tastenest.com"
                className="p-4 rounded-xl bg-[#162026] border border-white/5 hover:border-[#DF8435]/40 flex items-start gap-3.5 transition-all group block"
              >
                <span className="text-2xl p-2 rounded-lg bg-white/5 text-[#DF8435] group-hover:scale-110 transition-transform">
                  ✉️
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Direct Email</h4>
                  <p className="text-xs text-gray-300 mt-0.5 font-semibold group-hover:text-[#DF8435] transition-colors">reservations@tastenest.com</p>
                  <span className="text-[10px] text-gray-400">Responses within 2 business hours</span>
                </div>
              </a>

              {/* Location Card */}
              <div className="p-4 rounded-xl bg-[#162026] border border-white/5 flex items-start gap-3.5">
                <span className="text-2xl p-2 rounded-lg bg-white/5 text-[#DF8435]">
                  📍
                </span>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Restaurant Location</h4>
                  <p className="text-xs text-gray-300 mt-0.5">543 Country Club Ave, NC 27587</p>
                  <p className="text-xs text-gray-300">London, United Kingdom</p>
                </div>
              </div>

            </div>

            {/* Right Column: Direct Message Form (7 Cols) */}
            <div className="md:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Alexander Wright"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#121b20] border border-white/15 focus:border-[#DF8435] text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DF8435]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. alex@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#121b20] border border-white/15 focus:border-[#DF8435] text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DF8435]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#121b20] border border-white/15 focus:border-[#DF8435] text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DF8435]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                      Subject / Department
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-[#121b20] border border-white/15 focus:border-[#DF8435] text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DF8435]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Private Dining & VIP Booths">Private Dining & VIP Booths</option>
                      <option value="Event & Wedding Catering">Event & Wedding Catering</option>
                      <option value="Chef Recipes & Masterclasses">Chef Recipes & Masterclasses</option>
                      <option value="Feedback & Support">Feedback & Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="How can our concierge team assist you today?"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#121b20] border border-white/15 focus:border-[#DF8435] text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DF8435] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-shimmer w-full bg-[#DF8435] hover:bg-[#c97129] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg transition-all duration-300 shadow-[0_4px_16px_rgba(223,132,53,0.4)] hover:shadow-[0_8px_25px_rgba(223,132,53,0.6)] transform hover:-translate-y-0.5 active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'SENDING MESSAGE...' : 'SEND MESSAGE TO CONCIERGE'}
                </button>
              </form>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
