import { Avatar, Button, Card, CardBody, Chip } from '@heroui/react';
import { useNavigate } from '@tanstack/react-router';
import {
  Search,
  Star,
  Heart,
  ChevronRight,
  Sparkles,
  Crown,
  FlaskConical,
} from 'lucide-react';
import React, { useState, useEffect, useMemo } from 'react';

type Master = {
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

type Banner = {
  id: number;
  title: string;
  description: string;
  actionText: string;
  gradient: string;
  icon: React.ReactNode;
};

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

  const toggleFavorite = (masterId: number) => {
    // TODO: Implement API call to toggle favorite
    // Temporarily using void to avoid console warning
    void masterId;
  };

  const MasterCard: React.FC<{
    master: Master;
    showFavorite?: boolean;
    isHorizontal?: boolean;
  }> = ({ master, showFavorite = false, isHorizontal = false }) => (
    <Card
      isPressable
      className={`${isHorizontal ? 'min-w-[280px]' : 'w-full'} hover:shadow-lg transition-all duration-300 bg-white/80 dark:bg-gray-800/50 relative`}
      onPress={() => navigate({ to: `/master/${master.nickname}` })}
      isBlurred
    >
      <CardBody className="p-3">
        <div className="flex items-center space-x-3">
          <Avatar
            src={master.avatar}
            size={isHorizontal ? 'md' : 'lg'}
            className="flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                  {master.name}
                </h3>
                <Chip
                  size="sm"
                  color="secondary"
                  variant="flat"
                  className="text-xs"
                >
                  {master.specialty}
                </Chip>
              </div>
              {showFavorite && (
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={() => {
                    toggleFavorite(master.id);
                  }}
                  className="text-pink-500"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </Button>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{master.rating}</span>
                <span className="text-xs text-gray-500">
                  ({master.reviews})
                </span>
                {master.lookingForModels && (
                  <FlaskConical className="w-3 h-3 text-purple-500 ml-1" />
                )}
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  {master.city}
                </span>
                <div className="text-sm font-medium text-pink-600">
                  from ₽{master.priceFrom}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );

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
        <Button
          variant="flat"
          size="lg"
          className="w-full justify-start bg-white/80 dark:bg-gray-800/80 backdrop-blur-md"
          startContent={<Search className="w-5 h-5 text-gray-500" />}
          onPress={handleSearchClick}
        >
          <span className="text-gray-500">Search services or masters...</span>
        </Button>

        {/* My Masters Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              My Masters
            </h2>
            {favoriteMasters.length > 0 && (
              <Button
                variant="light"
                size="sm"
                endContent={<ChevronRight className="w-4 h-4" />}
                onPress={() =>
                  navigate({
                    to: '/catalog/search',
                    search: { favorites: true },
                  })
                }
              >
                View All
              </Button>
            )}
          </div>
          {favoriteMasters.length > 0 ? (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {favoriteMasters.map((master) => (
                <MasterCard
                  key={master.id}
                  master={master}
                  showFavorite
                  isHorizontal
                />
              ))}
            </div>
          ) : (
            <Card className="bg-white/50 dark:bg-gray-800/50">
              <CardBody className="text-center py-8">
                <Heart className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-300">
                  No masters added yet
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Add masters to favorites to see them here
                </p>
              </CardBody>
            </Card>
          )}
        </div>

        {/* Filter Summary Bar */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <Chip variant="flat" color="primary">
            All Categories
          </Chip>
          <Chip variant="flat" color="secondary">
            All Cities
          </Chip>
          <Button
            variant="flat"
            size="sm"
            endContent={<ChevronRight className="w-4 h-4" />}
            onPress={handleSearchClick}
          >
            More Filters
          </Button>
        </div>

        {/* Featured Masters */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              Featured Masters
            </h2>
          </div>
          <div className="space-y-3">
            {promotedMasters.map((master) => (
              <MasterCard key={master.id} master={master} />
            ))}
          </div>
        </div>

        {/* Top Rated Masters */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2 fill-current" />
              Top Rated Masters
            </h2>
            <Button
              variant="light"
              size="sm"
              endContent={<ChevronRight className="w-4 h-4" />}
              onPress={() =>
                navigate({
                  to: '/catalog/search',
                  search: { sortBy: 'rating' },
                })
              }
            >
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {topRatedMasters.slice(0, 4).map((master) => (
              <MasterCard key={master.id} master={master} />
            ))}
          </div>
        </div>

        {/* Rotating Banners */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Special Offers
          </h2>
          <Card
            isPressable
            className={`w-full bg-gradient-to-r ${banners[currentBannerIndex].gradient} text-white relative overflow-hidden`}
          >
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {banners[currentBannerIndex].icon}
                    <h3 className="font-bold text-lg ml-2">
                      {banners[currentBannerIndex].title}
                    </h3>
                  </div>
                  <p className="text-white/90 mb-4">
                    {banners[currentBannerIndex].description}
                  </p>
                  <Button
                    variant="solid"
                    className="bg-white/20 backdrop-blur-md text-white border border-white/30"
                  >
                    {banners[currentBannerIndex].actionText}
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
          {/* Banner indicators */}
          <div className="flex justify-center space-x-2 mt-3">
            {banners.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentBannerIndex
                    ? 'bg-pink-500'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-6">
          <p className="text-sm text-gray-500 mb-4">
            Want to offer your services?
          </p>
          <Button
            color="primary"
            variant="flat"
            onPress={() => navigate({ to: '/master/onboarding' })}
            className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-300"
          >
            Become a Master
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
