import { Button } from '@heroui/react';
import { ChevronRight, Star } from 'lucide-react';
import type { FC } from 'react';

import type { Master } from '../lib';

import MasterCard from './MasterCard';

type TopRatedMastersSectionProps = {
  topRatedMasters: Master[];
  onToggleFavorite?: (masterId: number) => void;
  onViewAll: () => void;
};

const TopRatedMastersSection: FC<TopRatedMastersSectionProps> = ({
  topRatedMasters,
  onToggleFavorite,
  onViewAll,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Star className="w-5 h-5 text-yellow-500 mr-2 fill-current" />
          Top Rated Masters
        </h2>
        <Button
          variant="light"
          size="sm"
          endContent={<ChevronRight className="w-4 h-4" />}
          onPress={onViewAll}
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {topRatedMasters.slice(0, 4).map((master) => (
          <MasterCard
            key={master.id}
            master={master}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default TopRatedMastersSection;
