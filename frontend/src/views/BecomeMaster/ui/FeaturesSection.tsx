import type { LucideIcon } from 'lucide-react';

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type FeaturesSectionProps = {
  features: Feature[];
};

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features }) => {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Powerful Features at Your Fingertips
      </h3>
      <div className="space-y-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-white/60 dark:bg-gray-800/30 rounded-xl backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/50 transition-colors duration-200"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturesSection;
