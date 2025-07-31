import { Button, Card, CardBody } from '@heroui/react';
import { ChevronRight, Heart } from 'lucide-react';
import type { FC } from 'react';

import type { Master } from '../lib';

import MasterCard from './MasterCard';

type MyMastersSectionProps = {
  favoriteMasters: Master[];
  onToggleFavorite: (masterId: number) => void;
  onViewAll: () => void;
};

const MyMastersSection: FC<MyMastersSectionProps> = ({
  favoriteMasters,
  onToggleFavorite,
  onViewAll,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          My Masters
        </h2>
        {favoriteMasters.length > 0 && (
          <Button
            variant="light"
            size="sm"
            endContent={<ChevronRight className="w-4 h-4" />}
            onPress={onViewAll}
          >
            View All
          </Button>
        )}
      </div>
      {favoriteMasters.length > 0 ? (
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {favoriteMasters.map((master) => (
            <MasterCard
              key={master.id}
              master={master}
              showFavorite
              isHorizontal
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <Card className="bg-white/50 dark:bg-gray-800/50">
          <CardBody className="text-center py-8">
            <Heart className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-300">
              No masters added yet
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Add masters to favorites to see them here
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default MyMastersSection;
