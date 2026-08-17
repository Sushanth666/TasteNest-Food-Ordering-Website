import { useState, useEffect } from 'react';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import WhyChooseUs from './components/sections/WhyChooseUs';
import WorkingHours from './components/sections/WorkingHours';
import Reviews from './components/sections/Reviews';
import AppDownload from './components/sections/AppDownload';
import Menu from './components/sections/Menu';
import Newsletter from './components/sections/Newsletter';

// Modals
import Reservation from './components/sections/Reservation';
import OrderModal from './components/sections/OrderModal';
import ContactModal from './components/sections/ContactModal';

// Common
import BackToTop from './components/common/BackToTop';

function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedOrderDish, setSelectedOrderDish] = useState(null);

  const openReservation = () => setIsReservationOpen(true);
  const closeReservation = () => setIsReservationOpen(false);

  const openOrder = (dish = null) => {
    setSelectedOrderDish(dish);
    setIsOrderOpen(true);
  };
  const closeOrder = () => {
    setIsOrderOpen(false);
    setSelectedOrderDish(null);
  };

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  // Moving / Scrolling Marquee Animation for Browser Tab Title & Global Triggers
  useEffect(() => {
    const fullText = '🍽️ TasteNest — Reserve Your Table | Artisanal Coffee & Gourmet Dining   ';
    let currentText = fullText;

    const interval = setInterval(() => {
      if (!document.hidden) {
        currentText = currentText.substring(1) + currentText.charAt(0);
        document.title = currentText;
      }
    }, 240);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = '😋 We miss you! — TasteNest Table Reservation';
      } else {
        document.title = currentText;
      }
    };

    // Catch any #reservation, #order, or #contact anchor clicks globally
    const handleGlobalClick = (e) => {
      const resTarget = e.target.closest('a[href="#reservation"], [data-open-reservation]');
      if (resTarget) {
        e.preventDefault();
        openReservation();
        return;
      }

      const orderTarget = e.target.closest('a[href="#order"], [data-open-order]');
      if (orderTarget) {
        e.preventDefault();
        openOrder();
        return;
      }

      const contactTarget = e.target.closest('a[href="#contact"], [data-open-contact]');
      if (contactTarget) {
        // If user is clicking "Contact Us" buttons, open the contact modal
        if (contactTarget.textContent.toLowerCase().includes('contact')) {
          e.preventDefault();
          openContact();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('click', handleGlobalClick);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#0d0d0d' }}>
      <Navbar
        onOpenReservation={openReservation}
        onOpenOrder={openOrder}
        onOpenContact={openContact}
      />
      <Hero onOpenReservation={openReservation} />          {/* Home */}
      <About />                                             {/* Pages */}
      <WhyChooseUs />
      <WorkingHours
        onOpenReservation={openReservation}
        onOpenContact={openContact}
      />
      <Reviews />                                           {/* Reviews & Statistics */}
      <AppDownload onOpenOrder={openOrder} />               {/* Order Section */}
      <Menu onOpenOrder={openOrder} />                      {/* Menu */}
      <Newsletter />                                        {/* Shop */}
      <Footer
        onOpenReservation={openReservation}
        onOpenContact={openContact}
      />                                                    {/* Contact */}

      {/* Back to Top Floating Button */}
      <BackToTop />

      {/* Luxury Reservation Popup Modal */}
      <Reservation isOpen={isReservationOpen} onClose={closeReservation} />

      {/* Gourmet Food Order Popup Modal */}
      <OrderModal isOpen={isOrderOpen} selectedDish={selectedOrderDish} onClose={closeOrder} />

      {/* Contact & Concierge Inquiry Popup Modal */}
      <ContactModal isOpen={isContactOpen} onClose={closeContact} />
    </div>
  );
}

export default App;
