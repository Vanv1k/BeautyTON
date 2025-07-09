import { Button } from '@heroui/react';
import { ChevronDown, ChevronUp, Instagram, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const AboutSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullText = `Professional makeup artist and brow master with 5+ years of experience. Specializing in evening makeup, bridal looks, and perfect eyebrow shaping. Certified by International Beauty Academy. I believe every woman deserves to feel beautiful and confident. Using only premium products from MAC, Urban Decay, and Anastasia Beverly Hills.`;

  const shortText = fullText.slice(0, 120) + '...';

  return (
    <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="space-y-3">
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {isExpanded ? fullText : shortText}
        </p>

        <Button
          variant="light"
          size="sm"
          className="p-0 h-auto text-pink-600 dark:text-pink-400"
          onPress={() => setIsExpanded(!isExpanded)}
          endContent={
            isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )
          }
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </Button>

        <div className="flex space-x-3">
          <Button
            variant="flat"
            size="sm"
            startContent={<Instagram className="w-4 h-4" />}
            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/50 dark:border-purple-400/50"
          >
            @elena_beauty
          </Button>
          <Button
            variant="flat"
            size="sm"
            startContent={<MessageCircle className="w-4 h-4" />}
            className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-200/50 dark:border-blue-400/50"
          >
            Telegram
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
