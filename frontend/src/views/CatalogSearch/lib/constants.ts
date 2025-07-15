import type { Category, SortOption } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All Categories' },
  { id: 'makeup', name: 'Makeup Artist' },
  { id: 'hair', name: 'Hair Stylist' },
  { id: 'nails', name: 'Nail Artist' },
  { id: 'eyebrows', name: 'Eyebrow Artist' },
  { id: 'massage', name: 'Massage Therapist' },
  { id: 'cosmetology', name: 'Cosmetologist' },
  { id: 'tattoo', name: 'Tattoo Artist' },
];

export const SORT_OPTIONS: SortOption[] = [
  { value: 'rating', label: 'Rating' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'reviews', label: 'Most Reviewed' },
];

export const CITIES = [
  'Moscow',
  'St. Petersburg',
  'Novosibirsk',
  'Yekaterinburg',
  'Kazan',
  'Nizhny Novgorod',
  'Chelyabinsk',
  'Samara',
  'Omsk',
  'Rostov-on-Don',
  'Ufa',
  'Krasnoyarsk',
  'Voronezh',
  'Perm',
  'Volgograd',
  'Krasnodar',
  'Saratov',
  'Tyumen',
  'Tolyatti',
  'Izhevsk',
];

export const PRICE_RANGE = {
  min: 0,
  max: 10000,
  step: 100,
};

export const RATING_OPTIONS = [
  { value: 0, label: 'Any Rating' },
  { value: 1, label: '1+ Stars' },
  { value: 2, label: '2+ Stars' },
  { value: 3, label: '3+ Stars' },
  { value: 4, label: '4+ Stars' },
  { value: 5, label: '5 Stars' },
];

export const DEFAULT_FILTERS = {
  query: '',
  category: 'all',
  city: '',
  priceFrom: PRICE_RANGE.min,
  priceTo: PRICE_RANGE.max,
  rating: 0,
  lookingForModels: false,
};

export const ITEMS_PER_PAGE = 10;
