export type Master = {
  id: number;
  name: string;
  nickname: string;
  specialty: string;
  avatar: string;
  rating: number;
  reviews: number;
  city: string;
  country: string;
  priceFrom: number;
  isPromo?: boolean;
  isFavorite?: boolean;
  lookingForModels?: boolean;
  description?: string;
};

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
