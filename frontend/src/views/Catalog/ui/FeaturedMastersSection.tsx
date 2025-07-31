import { Crown } from 'lucide-react';
import type { FC } from 'react';

import type { Master } from '../lib';

import MasterCard from './MasterCard';

type FeaturedMastersSectionProps = {
  promotedMasters: Master[];
  onToggleFavorite?: (masterId: number) => void;
};

const FeaturedMastersSection: FC<FeaturedMastersSectionProps> = ({
  promotedMasters,
  onToggleFavorite,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Crown className="w-5 h-5 text-yellow-500 mr-2 fill-current" />
          Featured Masters
        </h2>
      </div>
      <div className="space-y-3">
        {promotedMasters.map((master) => (
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

export default FeaturedMastersSection;
