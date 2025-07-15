import type { Master, SearchFilters } from './types';
import { filterMasters, sortMasters } from './utils';

export const MOCK_MASTERS: Master[] = [
  {
    id: 1,
    name: 'Elena Kozlova',
    nickname: 'Lena-Beauty',
    specialty: 'Makeup Artist',
    avatar:
      'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 4.8,
    reviews: 120,
    city: 'Moscow',
    country: 'Russia',
    priceFrom: 2500,
    isPromo: true,
    isFavorite: true,
    description: 'Professional makeup artist with 8+ years of experience',
  },
  {
    id: 2,
    name: 'Sofia Mikhailova',
    nickname: 'SofiaStyle',
    specialty: 'Hair Stylist',
    avatar:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 4.7,
    reviews: 89,
    city: 'St. Petersburg',
    country: 'Russia',
    priceFrom: 2000,
    isFavorite: true,
    lookingForModels: true,
    description:
      'Creative hair stylist specializing in modern cuts and coloring',
  },
  {
    id: 3,
    name: 'Diana Volkov',
    nickname: 'DianaNails',
    specialty: 'Nail Artist',
    avatar:
      'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 4.9,
    reviews: 156,
    city: 'Moscow',
    country: 'Russia',
    priceFrom: 1500,
    isPromo: true,
    description: 'Expert nail artist with unique design skills',
  },
  {
    id: 4,
    name: 'Anna Petrova',
    nickname: 'AnnaBrows',
    specialty: 'Eyebrow Artist',
    avatar:
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 4.6,
    reviews: 95,
    city: 'Kazan',
    country: 'Russia',
    priceFrom: 1800,
    lookingForModels: true,
    description: 'Certified eyebrow artist and microblading specialist',
  },
  {
    id: 5,
    name: 'Maria Smirnova',
    nickname: 'MariaMakeup',
    specialty: 'Makeup Artist',
    avatar:
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 4.5,
    reviews: 78,
    city: 'Novosibirsk',
    country: 'Russia',
    priceFrom: 2200,
    description: 'Wedding and event makeup specialist',
  },
  {
    id: 6,
    name: 'Ksenia Ivanova',
    nickname: 'KseniaHair',
    specialty: 'Hair Stylist',
    avatar:
      'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 4.8,
    reviews: 142,
    city: 'Yekaterinburg',
    country: 'Russia',
    priceFrom: 3000,
    lookingForModels: true,
    description: 'Fashion hair stylist with international experience',
  },
  {
    id: 7,
    name: 'Alina Fedorova',
    nickname: 'AlinaNails',
    specialty: 'Nail Artist',
    avatar:
      'https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 4.7,
    reviews: 103,
    city: 'Rostov-on-Don',
    country: 'Russia',
    priceFrom: 1700,
    description: 'Nail art specialist with creative gel designs',
  },
  {
    id: 8,
    name: 'Victoria Popova',
    nickname: 'VictoriaEyes',
    specialty: 'Eyebrow Artist',
    avatar:
      'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 4.9,
    reviews: 167,
    city: 'Moscow',
    country: 'Russia',
    priceFrom: 2100,
    isPromo: true,
    description: 'Master of eyebrow architecture and permanent makeup',
  },
];

export const generateMockMasters = (
  count: number,
  filters?: SearchFilters,
  sortBy?: string,
): Master[] => {
  let filteredMasters = MOCK_MASTERS;

  if (filters) {
    filteredMasters = filterMasters(MOCK_MASTERS, filters);
  }

  if (sortBy) {
    filteredMasters = sortMasters(filteredMasters, sortBy);
  }

  return filteredMasters.slice(0, count);
};
