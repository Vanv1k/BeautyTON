import { useNavigate, useSearch } from '@tanstack/react-router';
import { useCallback, useMemo } from 'react';

import type { SearchFilters } from '../lib';
import { DEFAULT_FILTERS } from '../lib';

export const useSearchParams = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: '/catalog/search' });

  const filters: SearchFilters = useMemo(
    () => ({
      query: search.q ?? DEFAULT_FILTERS.query,
      category: search.category ?? DEFAULT_FILTERS.category,
      city: search.city ?? DEFAULT_FILTERS.city,
      priceFrom: search.priceFrom ?? DEFAULT_FILTERS.priceFrom,
      priceTo: search.priceTo ?? DEFAULT_FILTERS.priceTo,
      rating: search.rating ?? DEFAULT_FILTERS.rating,
      lookingForModels:
        search.lookingForModels ?? DEFAULT_FILTERS.lookingForModels,
    }),
    [search],
  );

  const sortBy = search.sortBy ?? 'rating';

  const updateFilters = useCallback(
    (newFilters: Partial<SearchFilters>) => {
      const params: Record<string, unknown> = {};

      // Map query to q parameter
      if (newFilters.query !== undefined) {
        params.q = newFilters.query;
      } else if (search.q) {
        params.q = search.q;
      }

      // Handle other filters
      if (newFilters.category && newFilters.category !== 'all') {
        params.category = newFilters.category;
      } else if (search.category && search.category !== 'all') {
        params.category = search.category;
      }

      if (newFilters.city) {
        params.city = newFilters.city;
      } else if (search.city) {
        params.city = search.city;
      }

      if (
        newFilters.priceFrom &&
        newFilters.priceFrom > DEFAULT_FILTERS.priceFrom
      ) {
        params.priceFrom = newFilters.priceFrom;
      } else if (
        search.priceFrom &&
        search.priceFrom > DEFAULT_FILTERS.priceFrom
      ) {
        params.priceFrom = search.priceFrom;
      }

      if (newFilters.priceTo && newFilters.priceTo < DEFAULT_FILTERS.priceTo) {
        params.priceTo = newFilters.priceTo;
      } else if (search.priceTo && search.priceTo < DEFAULT_FILTERS.priceTo) {
        params.priceTo = search.priceTo;
      }

      if (newFilters.rating && newFilters.rating > 0) {
        params.rating = newFilters.rating;
      } else if (search.rating && search.rating > 0) {
        params.rating = search.rating;
      }

      if (newFilters.lookingForModels) {
        params.lookingForModels = newFilters.lookingForModels;
      } else if (search.lookingForModels) {
        params.lookingForModels = search.lookingForModels;
      }

      navigate({
        to: '/catalog/search',
        search: params,
        replace: true,
      });
    },
    [navigate, search],
  );

  const updateSort = useCallback(
    (newSortBy: 'rating' | 'price_asc' | 'price_desc') => {
      navigate({
        to: '/catalog/search',
        search: {
          ...search,
          sortBy: newSortBy,
        },
        replace: true,
      });
    },
    [navigate, search],
  );

  const clearFilters = useCallback(() => {
    navigate({
      to: '/catalog/search',
      search: {},
      replace: true,
    });
  }, [navigate]);

  return {
    filters,
    sortBy,
    updateFilters,
    updateSort,
    clearFilters,
  };
};
