import { useEffect, useState } from 'react';

const defaultMenuItems = [
  {
    id: 1,
    name: 'Italian Penne Pasta',
    category: 'Pasta',
    time: '15 - 20 Mins',
    serves: 1,
    price: 14.50,
    priceStr: '$14.50',
    oldPrice: '$16.00',
    img: '/food_1.jpg',
    badge: '🔥 Chef Special',
    desc: 'Artisanal penne tossed in slow-simmered San Marzano tomato sauce, fresh basil, and shaved aged Parmigiano-Reggiano.',
  },
  {
    id: 2,
    name: 'Gourmet Double Burger',
    category: 'Burgers',
    time: '10 - 15 Mins',
    serves: 1,
    price: 12.50,
    priceStr: '$12.50',
    oldPrice: '$14.00',
    img: '/food_2.jpg',
    badge: '⭐ Best Seller',
    desc: 'Prime Angus beef double patties with aged cheddar, caramelized shallots, and house truffle aioli on a brioche bun.',
  },
  {
    id: 3,
    name: 'Roasted Garden Platter',
    category: 'Platters',
    time: '15 - 25 Mins',
    serves: 2,
    price: 18.00,
    priceStr: '$18.00',
    oldPrice: '$20.50',
    img: '/food_3.jpg',
    badge: '🌱 Fresh Organic',
    desc: 'Heirloom roasted garden vegetables, whipped goat cheese, balsamic reduction, and crispy herb focaccia.',
  },
];

const availableAddons = [
  { id: 'cheese', name: 'Extra Aged Parmesan', price: 1.50 },
  { id: 'garlic_bread', name: 'Truffle Garlic Herb Bread', price: 3.00 },
  { id: 'coffee', name: 'Signature Artisanal Iced Coffee', price: 4.50 },
  { id: 'sauce', name: 'House Smoked Chili Dip', price: 1.00 },
];

export default function OrderModal({ isOpen, selectedDish, onClose }) {
  const [currentDishId, setCurrentDishId] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [deliveryType, setDeliveryType] = useState('delivery'); // 'delivery' | 'pickup'
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    instructions: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Sync selected dish prop when modal opens
  useEffect(() => {
    if (selectedDish) {
      if (typeof selectedDish === 'number') {
        setCurrentDishId(selectedDish);
      } else if (selectedDish.id) {
        setCurrentDishId(selectedDish.id);
      }
    }
  }, [selectedDish, isOpen]);

  // Handle escape key and body scroll locking
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

  const currentDish =
    defaultMenuItems.find((item) => item.id === currentDishId) || defaultMenuItems[0];

  const handleAddonToggle = (addonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const handleInfoChange = (e) => {
    setCustomerInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Price calculations
  const baseDishTotal = currentDish.price * quantity;
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = availableAddons.find((a) => a.id === id);
    return sum + (addon ? addon.price * quantity : 0);
  }, 0);
  const subtotal = baseDishTotal + addonsTotal;
  const deliveryFee = deliveryType === 'delivery' ? (subtotal >= 30 ? 0 : 2.50) : 0;
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + deliveryFee + tax;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone) return;
    if (deliveryType === 'delivery' && !customerInfo.address) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const orderId = 'TN-ORD-' + Math.floor(100000 + Math.random() * 900000);
      setConfirmedOrder({
        orderId,
        dishName: currentDish.name,
        quantity,
        addons: selectedAddons.map((id) => availableAddons.find((a) => a.id === id)?.name),
        deliveryType,
        deliveryFee,
        subtotal,
        finalTotal,
        customerInfo,
        paymentMethod,
        estTime: deliveryType === 'delivery' ? '30 - 40 Mins' : '15 - 20 Mins',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }, 800);
  };

  const handleCloseAll = () => {
    setConfirmedOrder(null);
    setSelectedAddons([]);
    setQuantity(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-lg overflow-y-auto animate-fade-in">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={handleCloseAll} aria-hidden="true" />

      {/* Modal Container */}
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
              ONLINE FOOD ORDER
            </span>
            <span className="w-8 h-[2px] bg-[#DF8435]" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-serif">
            Order Fresh Gourmet Dishes
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            Prepared fresh to order and delivered hot to your doorstep or ready for express takeaway.
          </p>
        </div>

        {/* 2-Column Order Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Dish Selector & Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleSubmitOrder} className="space-y-5">
              
              {/* 1. Select Dish Selector Cards */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-2">
                  1. Select Dish
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {defaultMenuItems.map((item) => {
                    const isSelected = item.id === currentDishId;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setCurrentDishId(item.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#DF8435]/15 border-[#DF8435] shadow-[0_0_12px_rgba(223,132,53,0.3)] scale-[1.02]'
                            : 'bg-white/[0.02] border-white/5 hover:bg-white/5'
                        }`}
                      >
                        <div className="w-full h-14 rounded-lg overflow-hidden mb-2">
                          <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="text-white text-[11px] font-bold truncate leading-tight">{item.name}</h4>
                        <span className="text-[#DF8435] font-black text-xs mt-1">{item.priceStr}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Quantity & Delivery Type Switcher */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-[#121b20] p-3.5 rounded-xl border border-white/5">
                {/* Quantity Controls */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Quantity
                  </label>
                  <div className="inline-flex items-center gap-3 bg-[#10171B] border border-white/10 rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-7 h-7 rounded bg-white/10 hover:bg-[#DF8435] text-white font-bold flex items-center justify-center transition-colors cursor-pointer text-sm"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-extrabold text-white text-sm">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                      className="w-7 h-7 rounded bg-white/10 hover:bg-[#DF8435] text-white font-bold flex items-center justify-center transition-colors cursor-pointer text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Delivery Type */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Order Type
                  </label>
                  <div className="grid grid-cols-2 gap-1 bg-[#10171B] p-1 rounded-lg border border-white/10">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('delivery')}
                      className={`py-1.5 px-2 rounded text-[11px] font-bold transition-all cursor-pointer ${
                        deliveryType === 'delivery'
                          ? 'bg-[#DF8435] text-white shadow-sm'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      🛵 Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('pickup')}
                      className={`py-1.5 px-2 rounded text-[11px] font-bold transition-all cursor-pointer ${
                        deliveryType === 'pickup'
                          ? 'bg-[#DF8435] text-white shadow-sm'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      🛍️ Pickup
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. Gourmet Add-Ons */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-2">
                  2. Customize & Add-Ons (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {availableAddons.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => handleAddonToggle(addon.id)}
                        className={`p-2.5 rounded-lg border cursor-pointer flex items-center justify-between transition-all duration-200 ${
                          isChecked
                            ? 'bg-[#DF8435]/15 border-[#DF8435] text-white'
                            : 'bg-white/[0.02] border-white/5 text-gray-300 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold border ${
                            isChecked ? 'bg-[#DF8435] border-[#DF8435] text-white' : 'border-white/20'
                          }`}>
                            {isChecked ? '✓' : ''}
                          </span>
                          <span className="text-xs font-semibold">{addon.name}</span>
                        </div>
                        <span className="text-xs font-bold text-[#DF8435]">+${addon.price.toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4. Customer Information */}
              <div className="space-y-2.5 pt-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300">
                  3. Contact & Delivery Info
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name *"
                    value={customerInfo.name}
                    onChange={handleInfoChange}
                    required
                    className="w-full bg-[#121b20] border border-white/15 focus:border-[#DF8435] text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DF8435]"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={customerInfo.phone}
                    onChange={handleInfoChange}
                    required
                    className="w-full bg-[#121b20] border border-white/15 focus:border-[#DF8435] text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DF8435]"
                  />
                </div>

                {deliveryType === 'delivery' && (
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address, Apt / Suite *"
                    value={customerInfo.address}
                    onChange={handleInfoChange}
                    required
                    className="w-full bg-[#121b20] border border-white/15 focus:border-[#DF8435] text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DF8435]"
                  />
                )}

                <input
                  type="text"
                  name="instructions"
                  placeholder="Special instructions (e.g. Leave at door, extra spicy)"
                  value={customerInfo.instructions}
                  onChange={handleInfoChange}
                  className="w-full bg-[#121b20] border border-white/15 focus:border-[#DF8435] text-white text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DF8435]"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-shimmer w-full bg-[#DF8435] hover:bg-[#c97129] text-white font-bold text-xs sm:text-sm uppercase tracking-widest py-3.5 rounded-lg transition-all duration-300 shadow-[0_4px_16px_rgba(223,132,53,0.4)] hover:shadow-[0_8px_25px_rgba(223,132,53,0.6)] transform hover:-translate-y-0.5 active:scale-95 cursor-pointer disabled:opacity-50 mt-2"
              >
                {isSubmitting ? 'PLACING ORDER...' : `PLACE ORDER • $${finalTotal.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Right Column: Selected Dish Preview & Bill Summary (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Selected Dish Card */}
            <div className="bg-[#162026] p-4 sm:p-5 rounded-xl border border-white/10 shadow-xl overflow-hidden">
              <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                <img src={currentDish.img} alt={currentDish.name} className="w-full h-full object-cover" />
                <span className="absolute top-2 right-2 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white">
                  {currentDish.badge}
                </span>
              </div>
              <h3 className="text-white font-bold text-sm tracking-wide">{currentDish.name}</h3>
              <p className="text-gray-400 text-[11px] leading-relaxed mt-1">{currentDish.desc}</p>
            </div>

            {/* Live Bill Breakdown */}
            <div className="bg-[#121b20] p-4 sm:p-5 rounded-xl border border-white/5 space-y-2.5 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] pb-2 border-b border-white/10">
                Payment Summary
              </h4>

              <div className="flex justify-between items-center text-gray-300">
                <span>{currentDish.name} × {quantity}</span>
                <span className="font-bold text-white">${baseDishTotal.toFixed(2)}</span>
              </div>

              {selectedAddons.length > 0 && (
                <div className="flex justify-between items-center text-gray-300">
                  <span>Add-ons ({selectedAddons.length})</span>
                  <span className="font-bold text-white">+${addonsTotal.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-gray-300">
                <span>Delivery Fee {subtotal >= 30 && deliveryType === 'delivery' && '(Free Promo)'}</span>
                <span className="font-bold text-white">
                  {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between items-center text-gray-300">
                <span>Taxes & Kitchen Service (8%)</span>
                <span className="font-bold text-white">${tax.toFixed(2)}</span>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white uppercase">Total Amount</span>
                <span className="text-lg font-black text-[#DF8435]">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Quick Delivery Guarantee */}
            <div className="p-3 rounded-lg bg-[#DF8435]/10 border border-[#DF8435]/25 flex items-center gap-3 text-xs">
              <span className="text-xl">⚡</span>
              <div>
                <p className="font-bold text-white text-[11px]">Estimated Service Time</p>
                <p className="text-gray-300 text-[10px]">
                  {deliveryType === 'delivery' ? 'Hot Express Delivery: 30 - 40 Mins' : 'Ready for Counter Pickup: 15 - 20 Mins'}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Order Confirmation Receipt Modal */}
      {confirmedOrder && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in">
          <div className="bg-[#11181C] max-w-md w-full rounded-2xl border border-[#DF8435]/40 shadow-[0_20px_60px_rgba(0,0,0,0.95)] p-6 sm:p-8 relative text-center animate-scale-in">
            
            {/* Close Receipt Button */}
            <button
              onClick={handleCloseAll}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-[#DF8435] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 text-sm font-bold cursor-pointer"
              aria-label="Close receipt"
            >
              ✕
            </button>

            {/* Success Icon */}
            <div className="w-16 h-16 rounded-full bg-[#DF8435]/20 border border-[#DF8435] text-[#DF8435] text-3xl flex items-center justify-center mx-auto mb-4 animate-badge-pop">
              🍕
            </div>

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#DF8435]">
              ORDER CONFIRMED & IN PREP
            </span>
            <h3 className="text-2xl font-black text-white font-serif mt-1 mb-2">
              Thank You For Your Order!
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Our kitchen has received your order and begun fresh preparation.
            </p>

            {/* Step Progress Tracker */}
            <div className="flex items-center justify-between mb-6 px-2">
              <div className="flex flex-col items-center">
                <span className="w-7 h-7 rounded-full bg-[#DF8435] text-white flex items-center justify-center text-xs font-bold shadow-md">✓</span>
                <span className="text-[10px] text-gray-300 font-semibold mt-1">Confirmed</span>
              </div>
              <div className="flex-1 h-[2px] bg-[#DF8435] mx-2" />
              <div className="flex flex-col items-center">
                <span className="w-7 h-7 rounded-full bg-[#DF8435] text-white flex items-center justify-center text-xs font-bold animate-pulse shadow-md">👨‍🍳</span>
                <span className="text-[10px] text-[#DF8435] font-bold mt-1">Kitchen</span>
              </div>
              <div className="flex-1 h-[2px] bg-white/10 mx-2" />
              <div className="flex flex-col items-center">
                <span className="w-7 h-7 rounded-full bg-white/10 text-gray-400 flex items-center justify-center text-xs">🛵</span>
                <span className="text-[10px] text-gray-500 font-semibold mt-1">Delivery</span>
              </div>
            </div>

            {/* Receipt Summary Details */}
            <div className="bg-[#162026] p-4 rounded-xl border border-white/5 text-left space-y-2 text-xs mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Order ID:</span>
                <span className="font-mono font-bold text-[#DF8435]">{confirmedOrder.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Dish Ordered:</span>
                <span className="font-semibold text-white">{confirmedOrder.dishName} × {confirmedOrder.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Customer:</span>
                <span className="font-semibold text-white">{confirmedOrder.customerInfo.name} ({confirmedOrder.customerInfo.phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Estimated Arrival:</span>
                <span className="font-semibold text-emerald-400">{confirmedOrder.estTime}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/5">
                <span className="text-gray-400 font-bold uppercase">Total Paid:</span>
                <span className="font-extrabold text-[#DF8435] text-sm">${confirmedOrder.finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Modal Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCloseAll}
                className="btn-shimmer flex-1 bg-[#DF8435] hover:bg-[#c97129] text-white font-bold text-xs uppercase py-3 rounded-lg transition-all shadow-md cursor-pointer"
              >
                Track Live Order
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
