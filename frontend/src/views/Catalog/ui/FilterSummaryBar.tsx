import { Button, Chip } from '@heroui/react';
import { ChevronRight } from 'lucide-react';
import type { FC } from 'react';

type FilterSummaryBarProps = {
  onMoreFiltersClick: () => void;
};

const FilterSummaryBar: FC<FilterSummaryBarProps> = ({
  onMoreFiltersClick,
}) => {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2">
      <Chip variant="flat" color="primary">
        All Categories
      </Chip>
      <Chip variant="flat" color="secondary">
        All Cities
      </Chip>
      <Button
        variant="flat"
        size="sm"
        endContent={<ChevronRight className="w-4 h-4" />}
        onPress={onMoreFiltersClick}
      >
        More Filters
      </Button>
    </div>
  );
};

export default FilterSummaryBar;
