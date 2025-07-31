import { Button } from '@heroui/react';
import { Sparkles } from 'lucide-react';

type CTASectionProps = {
  onStartJourney: () => void;
  onBackToCatalog: () => void;
};

const CTASection: React.FC<CTASectionProps> = ({
  onStartJourney,
  onBackToCatalog,
}) => {
  return (
    <div className="text-center space-y-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        Ready to Transform Your Career?
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Join our community of successful beauty professionals today
      </p>

      <div className="space-y-3">
        <Button
          size="lg"
          onPress={onStartJourney}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold shadow-lg"
          endContent={<Sparkles className="w-5 h-5" />}
        >
          Start Your Master Journey
        </Button>

        <Button
          variant="flat"
          size="lg"
          onPress={onBackToCatalog}
          className="w-full"
        >
          Back to Catalog
        </Button>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
        Free to join • No setup fees • Start earning immediately
      </p>
    </div>
  );
};

export default CTASection;
