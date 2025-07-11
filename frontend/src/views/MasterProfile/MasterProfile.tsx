import { useCallback, useState } from 'react';

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
  const [calendarRef, setCalendarRef] = useState<HTMLDivElement | null>(null);
  const [headerRef, setHeaderRef] = useState<HTMLDivElement | null>(null);

  const handleScrollToCalendar = useCallback(() => {
    if (calendarRef) {
      const headerHeight = headerRef ? headerRef.offsetHeight : 0;
      const calendarTop =
        calendarRef.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: calendarTop - headerHeight,
        behavior: 'smooth',
      });
    }
  }, [calendarRef, headerRef]);

  return (
    <div className="max-w-md mx-auto relative">
      <Header
        setHeaderRef={setHeaderRef}
        onScrollToCalendar={handleScrollToCalendar}
      />
      <main className="pb-20">
        <AboutSection />
        <Portfolio />
        <Services onScrollToCalendar={handleScrollToCalendar} />
        <AdBanner />
        <Calendar setCalendarRef={setCalendarRef} />
        <Reviews />
        <NearbyStylists />
      </main>
      <Footer />
    </div>
  );
};

export default MasterProfile;
