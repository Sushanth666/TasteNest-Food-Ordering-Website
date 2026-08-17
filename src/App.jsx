import { useEffect } from 'react';

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

// Common
import BackToTop from './components/common/BackToTop';

function App() {
  // Moving / Scrolling Marquee Animation for Browser Tab Title
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

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#0d0d0d' }}>
      <Navbar />
      <Hero />          {/* Home */}
      <About />         {/* Pages */}
      <WhyChooseUs />
      <WorkingHours />
      <Reviews />       {/* Reviews & Statistics */}
      <AppDownload />   {/* Order Section placed directly next to Reviews */}
      <Menu />          {/* Menu */}
      <Newsletter />    {/* Shop */}
      <Footer />        {/* Contact */}

      {/* Back to Top Floating Button */}
      <BackToTop />
    </div>
  );
}

export default App;
