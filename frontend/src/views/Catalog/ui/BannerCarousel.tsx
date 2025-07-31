import { Button, Card, CardBody } from '@heroui/react';
import type { FC } from 'react';

import type { Banner } from '../lib';

type BannerCarouselProps = {
  banners: Banner[];
  currentBannerIndex: number;
  onBannerAction?: (bannerId: number) => void;
};

const BannerCarousel: FC<BannerCarouselProps> = ({
  banners,
  currentBannerIndex,
  onBannerAction,
}) => {
  const currentBanner = banners[currentBannerIndex];

  const handleActionClick = () => {
    onBannerAction?.(currentBanner.id);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Special Offers
      </h2>
      <Card
        className={`w-full bg-gradient-to-r ${currentBanner.gradient} text-white relative overflow-hidden`}
      >
        <CardBody className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                {currentBanner.icon}
                <h3 className="font-bold text-lg ml-2">
                  {currentBanner.title}
                </h3>
              </div>
              <p className="text-white/90 mb-4">{currentBanner.description}</p>
              <Button
                variant="solid"
                className="bg-white/20 backdrop-blur-md text-white border border-white/30"
                onPress={handleActionClick}
              >
                {currentBanner.actionText}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      {/* Banner indicators */}
      <div className="flex justify-center space-x-2 mt-3">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentBannerIndex
                ? 'bg-pink-500'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
