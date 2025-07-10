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
  return (
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
  );
};

export default MasterProfile;
