import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Slider,
} from '@heroui/react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Search, SlidersHorizontal } from 'lucide-react';
import { type FC, useState } from 'react';

import {
  CATEGORIES,
  CITIES,
  DEFAULT_FILTERS,
  PRICE_RANGE,
  RATING_OPTIONS,
  SORT_OPTIONS,
  type SearchFilters,
} from './lib';
import { useSearchMasters, useSearchParams } from './model';
import { MasterCard, MasterCardSkeleton } from './ui';

const CatalogSearch: FC = () => {
  const navigate = useNavigate();
  const { filters, sortBy, updateFilters, updateSort, clearFilters } =
    useSearchParams();
  const { masters, isLoading, toggleFavorite } = useSearchMasters(
    filters,
    sortBy,
  );

  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);

  const handleApplyFilters = () => {
    updateFilters(localFilters);
    setShowFilters(false);
  };

  const handleSearchSubmit = () => {
    updateFilters({ query: localFilters.query });
  };

  const EmptyState: FC = () => (
    <Card className="bg-white/50 dark:bg-gray-800/50">
      <CardBody className="text-center py-12">
        <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
          No masters found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Try adjusting your search criteria or filters
        </p>
        <Button variant="flat" onPress={clearFilters}>
          Clear Filters
        </Button>
      </CardBody>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Button
            isIconOnly
            variant="light"
            onPress={() => navigate({ to: '/catalog' })}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <Input
              placeholder="Search services or masters..."
              value={localFilters.query}
              onValueChange={(value) =>
                setLocalFilters((prev) => ({ ...prev, query: value }))
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
              startContent={<Search className="w-4 h-4 text-gray-500" />}
              classNames={{
                inputWrapper:
                  'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md',
              }}
            />
          </div>
          <Button
            isIconOnly
            variant="flat"
            onPress={() => setShowFilters(!showFilters)}
            className={showFilters ? 'bg-pink-100 dark:bg-pink-900' : ''}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
            <CardBody className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Filters</h3>
                <Button
                  size="sm"
                  variant="light"
                  onPress={() => {
                    setLocalFilters(DEFAULT_FILTERS);
                    clearFilters();
                  }}
                >
                  Clear All
                </Button>
              </div>

              <Select
                label="Category"
                placeholder="Select category"
                selectedKeys={
                  localFilters.category ? [localFilters.category] : []
                }
                onSelectionChange={(keys) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    category: Array.from(keys)[0] as string,
                  }))
                }
              >
                {CATEGORIES.map((category) => (
                  <SelectItem key={category.id}>{category.name}</SelectItem>
                ))}
              </Select>

              <Input
                label="City"
                placeholder="Enter city name"
                value={localFilters.city}
                onValueChange={(value) =>
                  setLocalFilters((prev) => ({ ...prev, city: value }))
                }
              />

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Price Range: ₽{localFilters.priceFrom} - ₽
                  {localFilters.priceTo}
                </label>
                <Slider
                  step={PRICE_RANGE.step}
                  minValue={PRICE_RANGE.min}
                  maxValue={PRICE_RANGE.max}
                  value={[localFilters.priceFrom, localFilters.priceTo]}
                  onChange={(value) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      priceFrom: (value as number[])[0],
                      priceTo: (value as number[])[1],
                    }))
                  }
                  className="max-w-md"
                />
              </div>

              <Select
                label="Minimum Rating"
                placeholder="Select minimum rating"
                selectedKeys={
                  localFilters.rating > 0
                    ? [localFilters.rating.toString()]
                    : []
                }
                onSelectionChange={(keys) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    rating: Number(Array.from(keys)[0]) || 0,
                  }))
                }
              >
                {RATING_OPTIONS.map((option) => (
                  <SelectItem key={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select>

              <Checkbox
                isSelected={localFilters.lookingForModels}
                onValueChange={(value) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    lookingForModels: value,
                  }))
                }
              >
                Looking for models
              </Checkbox>

              <Button
                color="primary"
                onPress={handleApplyFilters}
                className="w-full mt-4"
              >
                Apply Filters
              </Button>
            </CardBody>
          </Card>
        )}

        {/* Sorting and City Filter */}
        <div className="flex gap-3 items-center">
          <div className="flex-1">
            <Select
              label="Sort by"
              size="sm"
              selectedKeys={[sortBy]}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0] as
                  | 'rating'
                  | 'price_asc'
                  | 'price_desc';
                updateSort(selectedKey);
              }}
              className="max-w-xs"
            >
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex-1">
            <Autocomplete
              label="City"
              size="sm"
              defaultInputValue={localFilters.city}
              onInputChange={(value) =>
                setLocalFilters((prev) => ({ ...prev, city: value }))
              }
              onSelectionChange={(key) => {
                const cityValue = key ? String(key) : '';
                setLocalFilters((prev) => ({ ...prev, city: cityValue }));
                updateFilters({ city: cityValue });
              }}
              className="max-w-xs"
            >
              {CITIES.map((city) => (
                <AutocompleteItem key={city}>{city}</AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }, (_, i) => (
              <MasterCardSkeleton key={i} />
            ))}
          </div>
        ) : masters.length > 0 ? (
          <div className="space-y-4">
            {masters.map((master) => (
              <MasterCard
                key={master.id}
                master={master}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default CatalogSearch;
