import { Button } from '@heroui/react';
import { ArrowRight, Sparkles } from 'lucide-react';

import { FEATURE_FLAGS } from '~/shared/config/featureFlags';

type HeroSectionProps = {
  onStartJourney: () => void;
};

const HeroSection: React.FC<HeroSectionProps> = ({ onStartJourney }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 text-white">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative px-6 py-12 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm mb-4">
            <Sparkles className="w-10 h-10" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Become a Beauty Master</h1>
        <p className="text-lg mb-6 text-white/90 max-w-md mx-auto">
          Join thousands of beauty professionals who've transformed their
          passion into profit
        </p>

        {/* Stats - управляется фичафлагом */}
        {FEATURE_FLAGS.showBecomeMasterStats && (
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold">5K+</div>
              <div className="text-sm text-white/80">Active Masters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm text-white/80">Commission</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">4.9★</div>
              <div className="text-sm text-white/80">Average Rating</div>
            </div>
          </div>
        )}

        <Button
          size="lg"
          onPress={onStartJourney}
          className="bg-white text-purple-600 hover:bg-white/90 font-semibold px-8 shadow-lg"
          endContent={<ArrowRight className="w-5 h-5" />}
        >
          Start Your Journey
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
