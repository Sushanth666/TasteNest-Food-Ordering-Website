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

// Reservation Modal Popup
import Reservation from './components/sections/Reservation';

// Common
import BackToTop from './components/common/BackToTop';

function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const openReservation = () => setIsReservationOpen(true);
  const closeReservation = () => setIsReservationOpen(false);

  // Moving / Scrolling Marquee Animation for Browser Tab Title & Global Reservation trigger
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

    // Catch any #reservation anchor clicks globally to open the popup modal
    const handleGlobalClick = (e) => {
      const target = e.target.closest('a[href="#reservation"], [data-open-reservation]');
      if (target) {
        e.preventDefault();
        openReservation();
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
      <Navbar onOpenReservation={openReservation} />
      <Hero onOpenReservation={openReservation} />          {/* Home */}
      <About />                                             {/* Pages */}
      <WhyChooseUs />
      <WorkingHours onOpenReservation={openReservation} />
      <Reviews />                                           {/* Reviews & Statistics */}
      <AppDownload />                                       {/* Order Section */}
      <Menu />                                              {/* Menu */}
      <Newsletter />                                        {/* Shop */}
      <Footer />                                            {/* Contact */}

      {/* Back to Top Floating Button */}
      <BackToTop />

      {/* Luxury Reservation Popup Modal */}
      <Reservation isOpen={isReservationOpen} onClose={closeReservation} />
    </div>
  );
}

export default App;
