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
};

export type Banner = {
  id: number;
  title: string;
  description: string;
  actionText: string;
  gradient: string;
  icon: React.ReactNode;
};
