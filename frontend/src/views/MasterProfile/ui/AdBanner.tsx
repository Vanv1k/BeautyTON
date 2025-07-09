import { Card, CardBody, Button, Chip } from '@heroui/react';
import { Sparkles, Gift } from 'lucide-react';

const AdBanner: React.FC = () => {
  return (
    <div className="p-4">
      <Card className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-purple-200/50 dark:border-purple-400/30 backdrop-blur-sm">
        <CardBody className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    Beauty Week Special
                  </h3>
                  <Chip size="sm" color="warning" variant="solid">
                    -25%
                  </Chip>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Premium skincare packages • Limited time
                </p>
              </div>
            </div>

            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium"
              endContent={<Sparkles className="w-3 h-3" />}
            >
              Explore
            </Button>
          </div>

          <div className="mt-2 pt-2 border-t border-purple-200/30 dark:border-purple-400/20">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Sponsored by Telegram Beauty Deals
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdBanner;
