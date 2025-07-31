import { Button, Chip } from '@heroui/react';
import { X } from 'lucide-react';
import { type FC } from 'react';

import { CATEGORIES, DEFAULT_FILTERS, type SearchFilters } from '../lib';

type ActiveFiltersProps = {
  filters: SearchFilters;
  onRemoveFilter: (key: keyof SearchFilters) => void;
  onClearAll: () => void;
};

export const ActiveFilters: FC<ActiveFiltersProps> = ({
  filters,
  onRemoveFilter,
  onClearAll,
}) => {
  const activeFilters: { key: keyof SearchFilters; label: string }[] = [];

  if (filters.query) {
    activeFilters.push({ key: 'query', label: `"${filters.query}"` });
  }
  if (filters.category) {
    const categoryName =
      CATEGORIES.find((cat) => cat.id === filters.category)?.name ||
      filters.category;
    activeFilters.push({ key: 'category', label: categoryName });
  }
  // Убираем город из активных фильтров - он теперь в SortingAndCity
  if (filters.rating > 0) {
    activeFilters.push({
      key: 'rating',
      label: `${filters.rating}+ stars`,
    });
  }
  if (
    filters.priceFrom > DEFAULT_FILTERS.priceFrom ||
    filters.priceTo < DEFAULT_FILTERS.priceTo
  ) {
    activeFilters.push({
      key: 'priceFrom', // We'll handle both price filters as one
      label: `₽${filters.priceFrom} - ₽${filters.priceTo}`,
    });
  }
  if (filters.lookingForModels) {
    activeFilters.push({
      key: 'lookingForModels',
      label: 'Looking for models',
    });
  }

  if (activeFilters.length === 0) {
    return null;
  }

  const handleRemoveFilter = (key: keyof SearchFilters) => {
    onRemoveFilter(key);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg">
      <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
        Active filters:
      </span>
      {activeFilters.map((filter) => (
        <Chip
          key={filter.key}
          onClose={() => handleRemoveFilter(filter.key)}
          variant="flat"
          color="primary"
          size="sm"
          classNames={{
            base: 'bg-primary-100 dark:bg-primary-900/50',
            content: 'text-primary-800 dark:text-primary-200',
            closeButton: 'text-primary-600 hover:text-primary-800',
          }}
        >
          {filter.label}
        </Chip>
      ))}
      <Button
        size="sm"
        variant="light"
        onPress={onClearAll}
        startContent={<X className="w-3 h-3" />}
        className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
      >
        Clear all
      </Button>
    </div>
  );
};
