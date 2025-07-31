import type { MasterPreviewEntity } from '~/entities/master';

// Переиспользуем типы из entity для обратной совместимости
export type Master = MasterPreviewEntity;

export type SearchFilters = {
  query: string;
  category: string;
  city: string;
  priceFrom: number;
  priceTo: number;
  rating: number;
  lookingForModels: boolean;
};

export type SortOption = {
  value: string;
  label: string;
};

export type SearchState = {
  filters: SearchFilters;
  sortBy: string;
  masters: Master[];
  isLoading: boolean;
  hasMore: boolean;
  page: number;
};

export type Category = {
  id: string;
  name: string;
  icon?: string;
};
