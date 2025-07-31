import { type FC, useCallback, useEffect, useState } from 'react';

import { DEFAULT_FILTERS, type SearchFilters } from './lib';
import { useSearchParams } from './model';
import {
  ActiveFilters,
  EmptyState,
  FilterPanel,
  SearchHeader,
  SearchResults,
  SearchSuggestions,
  SortingAndCity,
} from './ui';

import { useQueryMastersSearch } from '~/entities/master/api/search/query';
import { FEATURE_FLAGS } from '~/shared/config/featureFlags';

const CatalogSearch: FC = () => {
  const {
    filters,
    sortBy,
    activeSearchParams,
    updateFilters,
    updateSort,
    clearFilters,
  } = useSearchParams();
  const searchMastersQuery = useQueryMastersSearch({
    ...activeSearchParams,
    sortBy,
  });

  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);

  // Синхронизируем локальные фильтры с глобальными
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleApplyFilters = () => {
    updateFilters(localFilters);
    setShowFilters(false);
  };

  const handleSearchSubmit = () => {
    updateFilters({ query: localFilters.query });
  };

  const handleRemoveFilter = (key: keyof SearchFilters) => {
    const newFilters = { ...filters }; // Используем глобальные filters, а не localFilters

    switch (key) {
      case 'query':
        newFilters.query = '';
        break;
      case 'category':
        newFilters.category = '';
        break;
      case 'city':
        newFilters.city = '';
        break;
      case 'rating':
        newFilters.rating = 0;
        break;
      case 'priceFrom':
        // Сбрасываем оба значения цены к дефолтным
        newFilters.priceFrom = DEFAULT_FILTERS.priceFrom;
        newFilters.priceTo = DEFAULT_FILTERS.priceTo;
        break;
      case 'priceTo':
        // Тоже сбрасываем оба значения цены к дефолтным
        newFilters.priceFrom = DEFAULT_FILTERS.priceFrom;
        newFilters.priceTo = DEFAULT_FILTERS.priceTo;
        break;
      case 'lookingForModels':
        newFilters.lookingForModels = false;
        break;
    }

    // Важно: передаем полный объект фильтров для перезаписи URL
    setLocalFilters(newFilters);
    updateFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    setLocalFilters(DEFAULT_FILTERS);
    updateFilters(DEFAULT_FILTERS); // Используем updateFilters вместо clearFilters для полного контроля
  };

  const handleSuggestionClick = (suggestion: string) => {
    const newFilters = { ...localFilters, query: suggestion };
    setLocalFilters(newFilters);
    updateFilters({ query: suggestion });
  };

  const handleCityChange = (city: string) => {
    const newFilters = { ...localFilters, city };
    setLocalFilters(newFilters);
    updateFilters({ city });
  };

  const handleToggleFavorite = useCallback(() => {
    // todo: create
  }, []);

  const hasAnyFilters =
    filters.query ||
    filters.category ||
    filters.rating > 0 ||
    filters.priceFrom > DEFAULT_FILTERS.priceFrom ||
    filters.priceTo < DEFAULT_FILTERS.priceTo ||
    filters.lookingForModels;

  const showSuggestions =
    !FEATURE_FLAGS.hideSuggestionsInSearch &&
    !searchMastersQuery.isLoading &&
    !hasAnyFilters;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="p-4 space-y-4">
        {/* Header */}
        <SearchHeader
          query={localFilters.query}
          onQueryChange={(value) =>
            setLocalFilters((prev) => ({ ...prev, query: value }))
          }
          onSearch={handleSearchSubmit}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />

        {/* Filter Panel */}
        {showFilters && (
          <FilterPanel
            filters={localFilters}
            onFiltersChange={setLocalFilters}
            onApplyFilters={handleApplyFilters}
            onClearFilters={() => {
              setLocalFilters(DEFAULT_FILTERS);
              handleClearAllFilters();
            }}
          />
        )}

        {/* Active Filters */}
        <ActiveFilters
          filters={filters}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
        />

        {/* Sorting and City */}
        <SortingAndCity
          sortBy={sortBy}
          city={localFilters.city}
          onSortChange={updateSort}
          onCityChange={handleCityChange}
        />

        {/* Results */}
        {searchMastersQuery.data && (
          <SearchResults
            masters={searchMastersQuery.flatData}
            isLoading={searchMastersQuery.isLoading}
            onToggleFavorite={handleToggleFavorite}
            emptyState={<EmptyState onClearFilters={clearFilters} />}
            suggestions={
              showSuggestions ? (
                <SearchSuggestions onSuggestionClick={handleSuggestionClick} />
              ) : null
            }
          />
        )}
      </div>
    </div>
  );
};

export default CatalogSearch;
