import type { SearchFilters } from './types';

import type { MasterPreviewEntity } from '~/entities/master';

export const filterMasters = (
  masters: MasterPreviewEntity[],
  filters: SearchFilters,
): MasterPreviewEntity[] => {
  return masters.filter((master) => {
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const searchText =
        `${master.name} ${master.specialty} ${master.city}`.toLowerCase();
      if (!searchText.includes(query)) return false;
    }

    if (filters.category && filters.category !== 'all') {
      const categoryMap: Record<string, string> = {
        makeup: 'Makeup Artist',
        hair: 'Hair Stylist',
        nails: 'Nail Artist',
        eyebrows: 'Eyebrow Artist',
      };
      if (master.specialty !== categoryMap[filters.category]) return false;
    }

    if (
      filters.city &&
      !master.city.toLowerCase().includes(filters.city.toLowerCase())
    ) {
      return false;
    }

    if (filters.priceFrom && master.priceFrom < filters.priceFrom) return false;
    if (filters.priceTo && master.priceFrom > filters.priceTo) return false;
    if (filters.rating && master.rating < filters.rating) return false;
    if (filters.lookingForModels && !master.lookingForModels) return false;

    return true;
  });
};

export const sortMasters = (
  masters: MasterPreviewEntity[],
  sortBy: string,
): MasterPreviewEntity[] => {
  const sorted = [...masters];

  switch (sortBy) {
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'price_asc':
      return sorted.sort((a, b) => a.priceFrom - b.priceFrom);
    case 'price_desc':
      return sorted.sort((a, b) => b.priceFrom - a.priceFrom);
    case 'reviews':
      return sorted.sort((a, b) => b.reviews - a.reviews);
    default:
      return sorted;
  }
};

export const formatPrice = (price: number): string => {
  return `$${price.toLocaleString()}`;
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
