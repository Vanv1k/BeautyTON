import { Avatar, Button, Card, CardBody, Chip } from '@heroui/react';
import { useNavigate } from '@tanstack/react-router';
import { FlaskConical, Heart, Star } from 'lucide-react';
import type { FC } from 'react';

import { formatPrice, formatRating } from '../lib';

import type { MasterPreviewEntity } from '~/entities/master';

type MasterCardProps = {
  master: MasterPreviewEntity;
  onToggleFavorite?: (masterId: string) => void;
};

const MasterCard: FC<MasterCardProps> = ({ master, onToggleFavorite }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate({ to: `/master/${master.nickname}` });
  };

  const handleFavoritePress = () => {
    onToggleFavorite?.(master.id);
  };

  return (
    <Card
      className="w-full hover:shadow-lg transition-all duration-300 bg-white/80 dark:bg-gray-800/50 relative cursor-pointer"
      onClick={handleCardClick}
      isBlurred
    >
      <CardBody className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar src={master.avatar} size="lg" className="flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white text-base truncate">
                  {master.name}
                </h3>
                <Chip
                  size="sm"
                  color="secondary"
                  variant="flat"
                  className="text-xs mt-1"
                >
                  {master.specialty}
                </Chip>
              </div>
              {onToggleFavorite && (
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={handleFavoritePress}
                  className={
                    master.isFavorite ? 'text-pink-500' : 'text-gray-400'
                  }
                >
                  <Heart
                    className={`w-5 h-5 ${master.isFavorite ? 'fill-current' : ''}`}
                  />
                </Button>
              )}
            </div>

            {master.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {master.description}
              </p>
            )}

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">
                    {formatRating(master.rating)}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({master.reviews})
                  </span>
                </div>
                {master.lookingForModels && (
                  <div className="flex items-center">
                    <FlaskConical className="w-4 h-4 text-purple-500" />
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {master.city}, {master.country}
                </div>
                <div className="text-base font-semibold text-pink-600">
                  from {formatPrice(master.priceFrom)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default MasterCard;
