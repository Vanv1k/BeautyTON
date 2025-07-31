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
      const query =
        newFilters.query !== undefined ? newFilters.query : search.q;
      if (query && query !== DEFAULT_FILTERS.query) {
        params.q = query;
      }

      // Handle category
      const category =
        newFilters.category !== undefined
          ? newFilters.category
          : search.category;
      if (category && category !== DEFAULT_FILTERS.category) {
        params.category = category;
      }

      // Handle city
      const city =
        newFilters.city !== undefined ? newFilters.city : search.city;
      if (city && city !== DEFAULT_FILTERS.city) {
        params.city = city;
      }

      // Handle price range
      const priceFrom =
        newFilters.priceFrom !== undefined
          ? newFilters.priceFrom
          : search.priceFrom;
      const priceTo =
        newFilters.priceTo !== undefined ? newFilters.priceTo : search.priceTo;

      if (priceFrom && priceFrom > DEFAULT_FILTERS.priceFrom) {
        params.priceFrom = priceFrom;
      }
      if (priceTo && priceTo < DEFAULT_FILTERS.priceTo) {
        params.priceTo = priceTo;
      }

      // Handle rating
      const rating =
        newFilters.rating !== undefined ? newFilters.rating : search.rating;
      if (rating && rating > DEFAULT_FILTERS.rating) {
        params.rating = rating;
      }

      // Handle lookingForModels
      const lookingForModels =
        newFilters.lookingForModels !== undefined
          ? newFilters.lookingForModels
          : search.lookingForModels;
      if (
        lookingForModels &&
        lookingForModels !== DEFAULT_FILTERS.lookingForModels
      ) {
        params.lookingForModels = lookingForModels;
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

  /** Значения только установленных фильтров (без значений по умолчанию) */
  const activeSearchParams = useMemo(() => {
    const params: Record<string, unknown> = {};

    if (search.q && search.q !== DEFAULT_FILTERS.query) {
      params.query = search.q;
    }

    if (search.category && search.category !== DEFAULT_FILTERS.category) {
      params.category = search.category;
    }

    if (search.city && search.city !== DEFAULT_FILTERS.city) {
      params.city = search.city;
    }

    if (search.priceFrom && search.priceFrom > DEFAULT_FILTERS.priceFrom) {
      params.priceFrom = search.priceFrom;
    }

    if (search.priceTo && search.priceTo < DEFAULT_FILTERS.priceTo) {
      params.priceTo = search.priceTo;
    }

    if (search.rating && search.rating > DEFAULT_FILTERS.rating) {
      params.rating = search.rating;
    }

    if (
      search.lookingForModels &&
      search.lookingForModels !== DEFAULT_FILTERS.lookingForModels
    ) {
      params.lookingForModels = search.lookingForModels;
    }

    if (search.sortBy) {
      params.sortBy = search.sortBy;
    }

    return params;
  }, [search]);

  return {
    filters,
    sortBy,
    updateFilters,
    updateSort,
    clearFilters,
    activeSearchParams,
  };
};
