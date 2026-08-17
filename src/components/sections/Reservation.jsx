import { useEffect, useState } from 'react';

const timeSlots = [
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM',
  '09:00 PM',
  '10:00 PM',
];

const guestOptions = [
  { label: '1 Person', count: 1 },
  { label: '2 Guests', count: 2 },
  { label: '4 Guests', count: 4 },
  { label: '6+ Guests (VIP)', count: 6 },
];

const seatingAreas = [
  { id: 'main', name: 'Main Dining Hall', icon: '🏛️', desc: 'Lively atmosphere & open kitchen' },
  { id: 'terrace', name: 'Garden Terrace', icon: '🌿', desc: 'Open-air al fresco dining' },
  { id: 'chef', name: "Chef's Counter", icon: '👨‍🍳', desc: 'Front-row culinary view' },
  { id: 'vip', name: 'Private VIP Lounge', icon: '✨', desc: 'Dedicated sommelier & booth' },
];

const occasions = [
  'Casual Dining',
  'Romantic Date',
  'Birthday Celebration',
  'Anniversary',
  'Business Meeting',
];

export default function Reservation({ isOpen, onClose }) {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 2,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    time: '07:00 PM',
    seating: 'main',
    occasion: 'Casual Dining',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Close on Escape key & manage body scroll lock
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
    if (!formData.name || !formData.phone || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const bookingId = 'TN-' + Math.floor(100000 + Math.random() * 900000);
      setConfirmedBooking({
        ...formData,
        bookingId,
        seatingName: seatingAreas.find((s) => s.id === formData.seating)?.name || 'Main Dining Hall',
        timestamp: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      });
    }, 800);
  };

  const handleCloseAll = () => {
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-lg overflow-y-auto animate-fade-in">
      
      {/* Background click to close overlay */}
      <div className="fixed inset-0" onClick={handleCloseAll} aria-hidden="true" />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-[#10171B] border border-[#DF8435]/40 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-6 sm:p-10 my-8 z-10 animate-scale-in max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleCloseAll}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-[#DF8435] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:rotate-90 text-base font-bold cursor-pointer z-20 shadow-md"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center mb-8 pr-8 sm:pr-0">
          <div className="inline-flex flex-col items-center gap-1 mb-2">
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#DF8435] uppercase">
              TABLE RESERVATION
            </span>
            <span className="w-8 h-[2px] bg-[#DF8435]" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-serif">
            Book Your Exclusive Table
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            Fill in your details below to reserve your luxury dining experience at TasteNest.
          </p>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Booking Form (7 Cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Party Size */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-2">
                  1. Party Size
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {guestOptions.map((g) => (
                    <button
                      type="button"
                      key={g.label}
                      onClick={() => setFormData({ ...formData, guests: g.count })}
                      className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer text-center ${
                        formData.guests === g.count
                          ? 'bg-[#DF8435] text-white shadow-[0_0_12px_rgba(223,132,53,0.5)] scale-[1.02]'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    2. Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#121b20] border border-white/15 focus:border-[#DF8435] text-white text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DF8435] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    3. Time Slot
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-[#121b20] border border-white/15 focus:border-[#DF8435] text-white text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DF8435] transition-all"
                  >
                    {timeSlots.map((t) => (
                      <option key={t} value={t} className="bg-[#121b20] text-white">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seating Zone */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-2">
                  4. Choose Seating Zone
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {seatingAreas.map((area) => (
                    <div
                      key={area.id}
                      onClick={() => setFormData({ ...formData, seating: area.id })}
                      className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 flex items-start gap-2.5 ${
                        formData.seating === area.id
                          ? 'bg-[#DF8435]/15 border-[#DF8435] shadow-[0_0_12px_rgba(223,132,53,0.25)]'
                          : 'bg-white/[0.02] border-white/5 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-lg flex-shrink-0">{area.icon}</span>
                      <div>
                        <h4 className="text-white text-xs font-bold">{area.name}</h4>
                        <p className="text-gray-400 text-[10px] leading-tight mt-0.5">{area.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guest Details */}
              <div className="space-y-2.5 pt-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300">
                  5. Contact Information
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#121b20] border border-white/15 focus:border-[#DF8435] text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DF8435]"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#121b20] border border-white/15 focus:border-[#DF8435] text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DF8435]"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone *"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#121b20] border border-white/15 focus:border-[#DF8435] text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DF8435]"
                  />
                </div>
              </div>

              {/* Occasion & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                    Special Occasion
                  </label>
                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    className="w-full bg-[#121b20] border border-white/15 focus:border-[#DF8435] text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DF8435]"
                  >
                    {occasions.map((o) => (
                      <option key={o} value={o} className="bg-[#121b20] text-white">
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                    Dietary Notes / Requests
                  </label>
                  <input
                    type="text"
                    name="notes"
                    placeholder="e.g. Vegetarian, Window seat"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full bg-[#121b20] border border-white/15 focus:border-[#DF8435] text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DF8435]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-shimmer w-full bg-[#DF8435] hover:bg-[#c97129] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg transition-all duration-300 shadow-[0_4px_16px_rgba(223,132,53,0.4)] hover:shadow-[0_8px_25px_rgba(223,132,53,0.6)] transform hover:-translate-y-0.5 active:scale-95 cursor-pointer disabled:opacity-50 mt-4"
              >
                {isSubmitting ? 'CONFIRMING TABLE...' : 'CONFIRM RESERVATION NOW'}
              </button>
            </form>
          </div>

          {/* Right: Live Preview Summary Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#162026] p-5 sm:p-6 rounded-xl border border-white/10 shadow-xl">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <h3 className="text-white font-bold text-sm tracking-wide flex items-center gap-2">
                  <span>📋</span> Live Summary
                </h3>
                <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-0.5 border-b border-white/5">
                  <span className="text-gray-400">Guests:</span>
                  <span className="text-white font-bold">{formData.guests} {formData.guests === 1 ? 'Person' : 'Guests'}</span>
                </div>

                <div className="flex justify-between items-center py-0.5 border-b border-white/5">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-[#DF8435] font-bold">{formData.date}</span>
                </div>

                <div className="flex justify-between items-center py-0.5 border-b border-white/5">
                  <span className="text-gray-400">Time Slot:</span>
                  <span className="text-[#DF8435] font-bold">{formData.time}</span>
                </div>

                <div className="flex justify-between items-center py-0.5 border-b border-white/5">
                  <span className="text-gray-400">Seating:</span>
                  <span className="text-white font-semibold">
                    {seatingAreas.find((s) => s.id === formData.seating)?.name}
                  </span>
                </div>

                <div className="flex justify-between items-center py-0.5 border-b border-white/5">
                  <span className="text-gray-400">Occasion:</span>
                  <span className="text-white font-medium">{formData.occasion}</span>
                </div>
              </div>

              {/* Complimentary Perks Banner */}
              <div className="mt-4 p-3 rounded-lg bg-[#DF8435]/10 border border-[#DF8435]/30 flex items-start gap-2.5">
                <span className="text-lg">🥂</span>
                <div>
                  <h4 className="text-[11px] font-bold text-white">Welcome Aperitif Included</h4>
                  <p className="text-[10px] text-gray-300 leading-tight">
                    Every online booking receives a signature house aperitif and chef bite.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Concierge Line */}
            <div className="bg-[#121b20] p-4 rounded-xl border border-white/5 flex items-center justify-between text-xs">
              <div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#DF8435]">Need Assistance?</span>
                <p className="font-bold text-white text-xs mt-0.5">+1257 6541120</p>
              </div>
              <a
                href="tel:+12576541120"
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#DF8435] text-white text-xs font-bold transition-colors"
              >
                Call Desk
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Confirmation Receipt Modal */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in">
          <div className="bg-[#11181C] max-w-md w-full rounded-2xl border border-[#DF8435]/40 shadow-[0_20px_60px_rgba(0,0,0,0.95)] p-6 sm:p-8 relative text-center animate-scale-in">
            
            {/* Close Modal Button on receipt */}
            <button
              onClick={handleCloseAll}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-[#DF8435] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 text-sm font-bold cursor-pointer"
              aria-label="Close receipt"
            >
              ✕
            </button>

            {/* Success Icon */}
            <div className="w-16 h-16 rounded-full bg-[#DF8435]/20 border border-[#DF8435] text-[#DF8435] text-3xl flex items-center justify-center mx-auto mb-4 animate-badge-pop">
              ✓
            </div>

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#DF8435]">
              RESERVATION CONFIRMED
            </span>
            <h3 className="text-2xl font-black text-white font-serif mt-1 mb-2">
              We Look Forward To Welcoming You!
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              A confirmation email has been dispatched to <span className="text-white font-semibold">{confirmedBooking.email}</span>.
            </p>

            {/* Receipt Summary Card */}
            <div className="bg-[#162026] p-4 rounded-xl border border-white/5 text-left space-y-2 text-xs mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Reservation ID:</span>
                <span className="font-mono font-bold text-[#DF8435]">{confirmedBooking.bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Primary Guest:</span>
                <span className="font-semibold text-white">{confirmedBooking.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date & Time:</span>
                <span className="font-semibold text-white">{confirmedBooking.date} at {confirmedBooking.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Party & Seating:</span>
                <span className="font-semibold text-white">{confirmedBooking.guests} Guests • {confirmedBooking.seatingName}</span>
              </div>
            </div>

            {/* Modal Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCloseAll}
                className="btn-shimmer flex-1 bg-[#DF8435] hover:bg-[#c97129] text-white font-bold text-xs uppercase py-3 rounded-lg transition-all shadow-md cursor-pointer"
              >
                Done
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase rounded-lg transition-all cursor-pointer"
              >
                Print
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
