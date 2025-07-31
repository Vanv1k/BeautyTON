import { useNavigate } from '@tanstack/react-router';
import { Sparkles, Crown, Star } from 'lucide-react';
import React, { useState, useEffect, useMemo } from 'react';

import {
  BannerCarousel,
  CTASection,
  FeaturedMastersSection,
  FilterSummaryBar,
  MyMastersSection,
  SearchBar,
  TopRatedMastersSection,
  type Banner,
  type Master,
} from './ui';

const Catalog: React.FC = () => {
  const navigate = useNavigate();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [favoriteMasters, setFavoriteMasters] = useState<Master[]>([]);
  const [promotedMasters, setPromotedMasters] = useState<Master[]>([]);
  const [topRatedMasters, setTopRatedMasters] = useState<Master[]>([]);

  // Mock data
  const mockMasters: Master[] = useMemo(
    () => [
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
      },
    ],
    [],
  );

  const banners: Banner[] = [
    {
      id: 1,
      title: 'Start accepting TON payments',
      description: 'Easy crypto payments for your services',
      actionText: 'Learn More',
      gradient: 'from-blue-500 to-purple-600',
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      id: 2,
      title: 'Become a master',
      description: 'Join our platform and grow your business',
      actionText: 'Get Started',
      gradient: 'from-pink-500 to-orange-500',
      icon: <Crown className="w-6 h-6" />,
    },
    {
      id: 3,
      title: 'Promo of the month',
      description: '50% off first booking for new clients',
      actionText: 'Claim Now',
      gradient: 'from-green-500 to-teal-600',
      icon: <Star className="w-6 h-6 fill-current" />,
    },
  ];

  useEffect(() => {
    // Simulate API calls
    setFavoriteMasters(mockMasters.filter((m) => m.isFavorite));
    setPromotedMasters(mockMasters.filter((m) => m.isPromo).slice(0, 3));
    setTopRatedMasters(
      mockMasters.sort((a, b) => b.rating - a.rating).slice(0, 6),
    );
  }, [mockMasters]);

  useEffect(() => {
    // Rotate banners every 5 seconds
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const handleSearchClick = () => {
    navigate({ to: '/catalog/search' });
  };

  const handleToggleFavorite = (masterId: number) => {
    // TODO: Implement API call to toggle favorite
    void masterId;
  };

  const handleMyMastersViewAll = () => {
    navigate({
      to: '/catalog/search',
      search: { favorites: true },
    });
  };

  const handleTopRatedViewAll = () => {
    navigate({
      to: '/catalog/search',
      search: { sortBy: 'rating' },
    });
  };

  const handleBecomeMaster = () => {
    navigate({ to: '/master/onboarding' });
  };

  const handleBannerAction = (bannerId: number) => {
    // TODO: Implement banner-specific actions
    void bannerId;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            BeautyTON
          </h1>
        </div>

        {/* Search Field */}
        <SearchBar onSearchClick={handleSearchClick} />

        {/* My Masters Section */}
        <MyMastersSection
          favoriteMasters={favoriteMasters}
          onToggleFavorite={handleToggleFavorite}
          onViewAll={handleMyMastersViewAll}
        />

        {/* Filter Summary Bar */}
        <FilterSummaryBar onMoreFiltersClick={handleSearchClick} />

        {/* Featured Masters */}
        <FeaturedMastersSection
          promotedMasters={promotedMasters}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Top Rated Masters */}
        <TopRatedMastersSection
          topRatedMasters={topRatedMasters}
          onToggleFavorite={handleToggleFavorite}
          onViewAll={handleTopRatedViewAll}
        />

        {/* Rotating Banners */}
        <BannerCarousel
          banners={banners}
          currentBannerIndex={currentBannerIndex}
          onBannerAction={handleBannerAction}
        />

        {/* CTA Section */}
        <CTASection onBecomeMaster={handleBecomeMaster} />
      </div>
    </div>
  );
};

export default Catalog;
