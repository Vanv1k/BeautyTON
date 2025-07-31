import { type FC } from 'react';

import { MasterCard, MasterCardSkeleton } from './index';

import type { MasterPreviewEntity } from '~/entities/master';

type SearchResultsProps = {
  masters: MasterPreviewEntity[];
  isLoading: boolean;
  onToggleFavorite: (masterId: string) => void;
  emptyState?: React.ReactNode;
  suggestions?: React.ReactNode;
};

export const SearchResults: FC<SearchResultsProps> = ({
  masters,
  isLoading,
  onToggleFavorite,
  emptyState,
  suggestions,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }, (_, i) => (
          <MasterCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (suggestions) {
    return <>{suggestions}</>;
  }

  if (masters.length > 0) {
    return (
      <div className="space-y-4">
        {masters.map((master) => (
          <MasterCard
            key={master.id}
            master={master}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    );
  }

  return <>{emptyState}</>;
};
