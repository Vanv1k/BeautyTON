import { Avatar, Button, Card, CardBody, Chip } from '@heroui/react';
import { useNavigate } from '@tanstack/react-router';
import { FlaskConical, Heart, Star } from 'lucide-react';
import type { FC } from 'react';

import type { Master } from '../lib';

type MasterCardProps = {
  master: Master;
  showFavorite?: boolean;
  isHorizontal?: boolean;
  onToggleFavorite?: (masterId: number) => void;
};

const MasterCard: FC<MasterCardProps> = ({
  master,
  showFavorite = false,
  isHorizontal = false,
  onToggleFavorite,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log('test');
    navigate({ to: `/master/${master.nickname}` });
  };

  const handleFavoritePress = () => {
    onToggleFavorite?.(master.id);
  };

  return (
    <Card
      className={`${isHorizontal ? 'min-w-[280px]' : 'w-full'} shadow-sm hover:shadow-lg transition-all duration-300 bg-white/80 dark:bg-gray-800/50 relative cursor-pointer`}
      onPress={handleCardClick}
      isPressable
      isBlurred
    >
      <CardBody className="p-3">
        <div className="flex items-center space-x-3">
          <Avatar
            src={master.avatar}
            size={isHorizontal ? 'md' : 'lg'}
            className="flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                  {master.name}
                </h3>
                <Chip
                  size="sm"
                  color="secondary"
                  variant="flat"
                  className="text-xs"
                >
                  {master.specialty}
                </Chip>
              </div>
              {showFavorite && onToggleFavorite && (
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={handleFavoritePress}
                  className="text-pink-500"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </Button>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{master.rating}</span>
                <span className="text-xs text-gray-500">
                  ({master.reviews})
                </span>
                {master.lookingForModels && (
                  <FlaskConical className="w-3 h-3 text-purple-500 ml-1" />
                )}
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  {master.city}
                </span>
                <div className="text-sm font-medium text-pink-600">
                  from ₽{master.priceFrom}
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
