import {
  Button,
  Card,
  CardBody,
  Checkbox,
  SelectItem,
  Slider,
} from '@heroui/react';
import { type FC } from 'react';

import {
  CATEGORIES,
  PRICE_RANGE,
  RATING_OPTIONS,
  type SearchFilters,
} from '../lib';

import { Select } from '~/shared/ui/Select';

type FilterPanelProps = {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
};

export const FilterPanel: FC<FilterPanelProps> = ({
  filters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters,
}) => {
  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
      <CardBody className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Filters</h3>
          <Button size="sm" variant="light" onPress={onClearFilters}>
            Clear All
          </Button>
        </div>

        <Select
          label="Category"
          placeholder="Select category"
          selectedKeys={filters.category ? [filters.category] : []}
          onSelectionChange={(keys) =>
            onFiltersChange({
              ...filters,
              category: Array.from(keys)[0] as string,
            })
          }
        >
          {CATEGORIES.map((category) => (
            <SelectItem key={category.id}>{category.name}</SelectItem>
          ))}
        </Select>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Price Range: ₽{filters.priceFrom} - ₽{filters.priceTo}
          </label>
          <Slider
            step={PRICE_RANGE.step}
            minValue={PRICE_RANGE.min}
            maxValue={PRICE_RANGE.max}
            value={[filters.priceFrom, filters.priceTo]}
            onChange={(value) =>
              onFiltersChange({
                ...filters,
                priceFrom: (value as number[])[0],
                priceTo: (value as number[])[1],
              })
            }
            className="max-w-md"
          />
        </div>

        <Select
          label="Minimum Rating"
          placeholder="Select minimum rating"
          selectedKeys={filters.rating > 0 ? [filters.rating.toString()] : []}
          onSelectionChange={(keys) =>
            onFiltersChange({
              ...filters,
              rating: Number(Array.from(keys)[0]) || 0,
            })
          }
        >
          {RATING_OPTIONS.map((option) => (
            <SelectItem key={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </Select>

        <Checkbox
          isSelected={filters.lookingForModels}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, lookingForModels: value })
          }
        >
          Looking for models
        </Checkbox>

        <Button
          color="primary"
          onPress={onApplyFilters}
          className="w-full mt-4"
        >
          Apply Filters
        </Button>
      </CardBody>
    </Card>
  );
};
