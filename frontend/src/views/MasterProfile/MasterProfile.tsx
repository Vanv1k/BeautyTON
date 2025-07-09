import { useState } from 'react';

import AboutSection from './ui/AboutSection';
import AdBanner from './ui/AdBanner';
import Calendar from './ui/Calendar';
import Footer from './ui/Footer';
import Header from './ui/Header';
import NearbyStylists from './ui/NearbyStylists';
import Portfolio from './ui/Portfolio';
import Reviews from './ui/Reviews';
import Services from './ui/Services';

const MasterProfile = () => {
  // todo: Replace with actual dark mode logic
  const [isDark] = useState(false);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
          : 'bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 text-gray-900'
      }`}
    >
      <div className="max-w-md mx-auto relative">
        <Header />
        <main className="pb-20">
          <AboutSection />
          <Portfolio />
          <Services />
          <AdBanner />
          <Calendar />
          <Reviews />
          <NearbyStylists />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MasterProfile;
