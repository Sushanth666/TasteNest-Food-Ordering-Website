import { useEffect, useRef, useState } from 'react';

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
  { id: 'main', name: 'Main Dining Hall', icon: '🏛️', desc: 'Lively atmospheric setting with master kitchen views' },
  { id: 'terrace', name: 'Garden Terrace', icon: '🌿', desc: 'Open-air al fresco dining under ambient lanterns' },
  { id: 'chef', name: "Chef's Counter", icon: '👨‍🍳', desc: 'Front-row culinary artistry and direct chef interaction' },
  { id: 'vip', name: 'Private VIP Lounge', icon: '✨', desc: 'Exclusive intimate booth with dedicated sommelier' },
];

const occasions = [
  'Casual Dining',
  'Romantic Date',
  'Birthday Celebration',
  'Anniversary',
  'Business Meeting',
];

export default function Reservation() {
  const sectionRef = useRef(null);

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
    }, 900);
  };

  const resetForm = () => {
    setConfirmedBooking(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      guests: 2,
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      time: '07:00 PM',
      seating: 'main',
      occasion: 'Casual Dining',
      notes: '',
    });
  };

  return (
    <section id="reservation" className="bg-[#0B0E11] py-20 sm:py-28 text-white border-t border-white/5 relative overflow-hidden" ref={sectionRef}>
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#DF8435]/10 blur-3xl pointer-events-none animate-ambient-orb" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#f0a500]/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto reveal">
          <div className="inline-flex flex-col items-center gap-1.5 mb-3">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-gray-300 uppercase">
              ONLINE RESERVATION
            </span>
            <span className="accent-line-expand h-[2.5px] bg-gradient-to-r from-[#DF8435] to-[#f0a500] rounded-full" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 font-serif">
            Book Your Exclusive Table
          </h2>

          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-normal max-w-xl mx-auto">
            Reserve your seats in advance to experience world-class fine dining, bespoke coffee blends, and customized culinary tasting menus.
          </p>
        </div>

        {/* Main 2-Column Booking Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Form Column (7 Cols) */}
          <div className="lg:col-span-7 bg-[#10171B] p-6 sm:p-10 rounded-2xl border border-white/5 shadow-2xl reveal-left">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Guest count chips */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-3">
                  1. Party Size / Number of Guests
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {guestOptions.map((g) => (
                    <button
                      type="button"
                      key={g.label}
                      onClick={() => setFormData({ ...formData, guests: g.count })}
                      className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer text-center ${
                        formData.guests === g.count
                          ? 'bg-[#DF8435] text-white shadow-[0_0_15px_rgba(223,132,53,0.5)] scale-[1.02]'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 2: Date & Time Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    2. Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#121b20] border border-white/15 focus:border-[#DF8435] text-white text-xs sm:text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DF8435] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    3. Preferred Time Slot
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-[#121b20] border border-white/15 focus:border-[#DF8435] text-white text-xs sm:text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DF8435] transition-all"
                  >
                    {timeSlots.map((t) => (
                      <option key={t} value={t} className="bg-[#121b20] text-white">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Seating Area Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-3">
                  4. Choose Seating Zone
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {seatingAreas.map((area) => (
                    <div
                      key={area.id}
                      onClick={() => setFormData({ ...formData, seating: area.id })}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-300 flex items-start gap-3 ${
                        formData.seating === area.id
                          ? 'bg-[#DF8435]/15 border-[#DF8435] shadow-[0_0_15px_rgba(223,132,53,0.25)]'
                          : 'bg-white/[0.02] border-white/5 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-xl flex-shrink-0 mt-0.5">{area.icon}</span>
                      <div>
                        <h4 className="text-white text-xs font-bold">{area.name}</h4>
                        <p className="text-gray-400 text-[11px] leading-tight mt-0.5">{area.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 4: Guest Contact Details */}
              <div className="space-y-4 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                  5. Contact Information
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Full Name *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#121b20] border border-white/15 focus:border-[#DF8435] text-white text-xs px-3.5 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DF8435] transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#121b20] border border-white/15 focus:border-[#DF8435] text-white text-xs px-3.5 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DF8435] transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#121b20] border border-white/15 focus:border-[#DF8435] text-white text-xs px-3.5 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DF8435] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Row 5: Occasion & Special Requests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    Special Occasion
                  </label>
                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    className="w-full bg-[#121b20] border border-white/15 focus:border-[#DF8435] text-white text-xs px-3.5 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DF8435] transition-all"
                  >
                    {occasions.map((o) => (
                      <option key={o} value={o} className="bg-[#121b20] text-white">
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    Dietary Notes / Requests
                  </label>
                  <input
                    type="text"
                    name="notes"
                    placeholder="e.g. Vegetarian, Nut Allergy, Window Seat"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full bg-[#121b20] border border-white/15 focus:border-[#DF8435] text-white text-xs px-3.5 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DF8435] transition-all"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-shimmer w-full bg-[#DF8435] hover:bg-[#c97129] text-white font-bold text-xs sm:text-sm uppercase tracking-widest py-4 rounded-lg transition-all duration-300 shadow-[0_4px_20px_rgba(223,132,53,0.4)] hover:shadow-[0_8px_30px_rgba(223,132,53,0.6)] transform hover:-translate-y-0.5 active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'CONFIRMING TABLE...' : 'CONFIRM RESERVATION NOW'}
              </button>
            </form>
          </div>

          {/* Right Summary & VIP Info Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 reveal-scale">
            
            {/* Live Booking Summary Preview Card */}
            <div className="bg-[#10171B]/95 p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <h3 className="text-white font-bold text-base tracking-wide flex items-center gap-2">
                  <span>📋</span> Booking Summary
                </h3>
                <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Available
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-gray-400">Guests:</span>
                  <span className="text-white font-bold">{formData.guests} {formData.guests === 1 ? 'Person' : 'Guests'}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-[#DF8435] font-bold">{formData.date}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-gray-400">Time Slot:</span>
                  <span className="text-[#DF8435] font-bold">{formData.time}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-gray-400">Seating Zone:</span>
                  <span className="text-white font-semibold">
                    {seatingAreas.find((s) => s.id === formData.seating)?.name}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-gray-400">Occasion:</span>
                  <span className="text-white font-medium">{formData.occasion}</span>
                </div>
              </div>

              {/* Complimentary Perks Banner */}
              <div className="mt-6 p-4 rounded-xl bg-[#DF8435]/10 border border-[#DF8435]/30 flex items-start gap-3">
                <span className="text-xl">🥂</span>
                <div>
                  <h4 className="text-xs font-bold text-white mb-0.5">Complimentary Welcome Drink</h4>
                  <p className="text-[11px] text-gray-300 leading-tight">
                    Every online booking receives a signature house aperitif and artisanal chef bite.
                  </p>
                </div>
              </div>
            </div>

            {/* Need Immediate Assistance Card */}
            <div className="bg-[#121b20]/80 p-6 rounded-2xl border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#DF8435]">Direct Concierge</span>
                <h4 className="text-sm font-extrabold text-white mt-0.5">Need a Special Event Setup?</h4>
                <p className="text-xs text-gray-400 mt-1">Call our reservation desk at +1257 6541120</p>
              </div>
              <a
                href="#contact"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#DF8435] text-white flex items-center justify-center transition-colors"
                aria-label="Contact Concierge"
              >
                📞
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* Confirmation Modal Receipt */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#11181C] max-w-md w-full rounded-2xl border border-[#DF8435]/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-6 sm:p-8 relative text-center animate-scale-in">
            
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
                onClick={resetForm}
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

    </section>
  );
}
