import { Card, CardBody } from '@heroui/react';

const SuccessStory: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-pink-200/50 dark:border-pink-400/30 mb-8">
      <CardBody className="p-6">
        <div className="text-center">
          <div className="text-4xl mb-3">✨</div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            "My income tripled in just 3 months!"
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 italic mb-3">
            "BeautyTON helped me turn my hobby into a thriving business. The
            platform is so easy to use, and my clients love the seamless booking
            experience."
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            — Elena K., Makeup Artist from Moscow
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default SuccessStory;
