import { Card, CardBody } from '@heroui/react';
import type { LucideIcon } from 'lucide-react';

type Benefit = {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
};

type BenefitsSectionProps = {
  benefits: Benefit[];
};

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ benefits }) => {
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Why Join BeautyTON?
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Everything you need to build a successful beauty business
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 transform hover:scale-105 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm"
            >
              <CardBody className="p-6 text-center">
                <div
                  className={`m-auto mb-3 inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${benefit.gradient} rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BenefitsSection;
