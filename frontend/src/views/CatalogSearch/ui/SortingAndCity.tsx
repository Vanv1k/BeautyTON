import { AutocompleteItem, SelectItem } from '@heroui/react';
import { useInfiniteScroll } from '@heroui/use-infinite-scroll';
import { useCallback, useState } from 'react';

import { SORT_OPTIONS } from '../lib';

import { useQueryCitiesList } from '~/entities/city';
import { Autocomplete } from '~/shared/ui/Autocomplete';
import { Select } from '~/shared/ui/Select';

type SortingAndCityProps = {
  sortBy: string;
  city: string;
  onSortChange: (sortBy: 'rating' | 'price_asc' | 'price_desc') => void;
  onCityChange: (city: string) => void;
};

export const SortingAndCity: React.FC<SortingAndCityProps> = ({
  sortBy,
  city,
  onSortChange,
  onCityChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cityInput, setCityInput] = useState(city);

  const citiesQuery = useQueryCitiesList({
    query: cityInput,
  });

  const [, scrollerRef] = useInfiniteScroll({
    hasMore: !citiesQuery.cannotFetchNextPage,
    isEnabled: isOpen,
    shouldUseLoader: false,
    onLoadMore: citiesQuery.fetchNextPage,
  });

  const handleSelectionChange = useCallback(
    (key: React.Key | null) => {
      if (!key) {
        onCityChange('');
        return;
      }
      const city = citiesQuery.flatData.find((city) => city.id === key);
      if (city) {
        onCityChange(city.name);
      }
    },
    [citiesQuery.flatData, onCityChange],
  );

  return (
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
            onSortChange(selectedKey);
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
          placeholder="Select city"
          defaultItems={citiesQuery.flatData}
          onSelectionChange={handleSelectionChange}
          inputValue={cityInput}
          onInputChange={setCityInput}
          allowsCustomValue
          className="max-w-xs"
          onOpenChange={setIsOpen}
          scrollRef={scrollerRef}
          isLoading={citiesQuery.isLoading}
        >
          {(cityItem) => (
            <AutocompleteItem key={cityItem.id} textValue={cityItem.name}>
              {cityItem.name}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </div>
    </div>
  );
};
