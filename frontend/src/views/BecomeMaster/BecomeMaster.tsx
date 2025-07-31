import { useNavigate } from '@tanstack/react-router';

import { benefits, features } from './model';
import {
  HeroSection,
  BenefitsSection,
  FeaturesSection,
  SuccessStory,
  CTASection,
} from './ui';

const BecomeMaster: React.FC = () => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate({ to: '/master/onboarding' });
  };

  const handleBackToCatalog = () => {
    navigate({ to: '/catalog' });
  };

  return (
    <div className="min-h-screen pb-20">
      <HeroSection onStartJourney={handleStartJourney} />

      <div className="px-6 py-12">
        <BenefitsSection benefits={benefits} />
        <FeaturesSection features={features} />
        <SuccessStory />
        <CTASection
          onStartJourney={handleStartJourney}
          onBackToCatalog={handleBackToCatalog}
        />
      </div>
    </div>
  );
};

export default BecomeMaster;
