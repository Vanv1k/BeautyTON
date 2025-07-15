import {
  Avatar,
  Button,
  Card,
  CardBody,
  Chip,
  Input,
  Select,
  SelectItem,
  Slider,
  Checkbox,
  Spinner,
} from '@heroui/react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {
  Search,
  Star,
  Heart,
  FlaskConical,
  SlidersHorizontal,
  ArrowLeft,
  MapPin,
} from 'lucide-react';
import React, { useState, useEffect, useMemo } from 'react';

import { CATEGORIES } from '../CatalogSearch/lib/constants';
import { MOCK_MASTERS } from '../CatalogSearch/lib/mockData';
import type { Master } from '../CatalogSearch/lib/types';

type SortByType = 'rating' | 'price_asc' | 'price_desc' | 'reviews';

const CatalogSearch: React.FC = () => {
  const navigate = useNavigate();
  const searchParams = useSearch({ from: '/catalog/search' });

  const [searchQuery, setSearchQuery] = useState<string>(searchParams.q ?? '');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.category ?? '',
  );
  const [cityInput, setCityInput] = useState<string>(searchParams.city ?? '');
  const [priceRange, setPriceRange] = useState<number[]>([
    searchParams.priceFrom ?? 0,
    searchParams.priceTo ?? 10000,
  ]);
  const [selectedRating, setSelectedRating] = useState<number>(
    searchParams.rating ?? 0,
  );
  const [lookingForModels, setLookingForModels] = useState<boolean>(
    searchParams.lookingForModels ?? false,
  );
  const [sortBy, setSortBy] = useState<SortByType>(
    searchParams.sortBy ? (searchParams.sortBy as SortByType) : 'rating',
  );
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [masters, setMasters] = useState<Master[]>([]);
  const [favoriteMasters, setFavoriteMasters] = useState<Set<number>>(
    new Set(),
  );

  // Memoized data to prevent re-renders
  const categories = useMemo(() => CATEGORIES, []);
  const allMasters = useMemo(() => MOCK_MASTERS, []);

  // Filtered and sorted masters
  const filteredMasters = useMemo(() => {
    let filtered = [...allMasters];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (master) =>
          master.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          master.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (master.description &&
            master.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())),
      );
    }

    // Filter by category
    if (selectedCategory) {
      const categoryName = categories.find(
        (cat) => cat.id === selectedCategory,
      )?.name;
      if (categoryName) {
        filtered = filtered.filter(
          (master) => master.specialty === categoryName,
        );
      }
    }

    // Filter by city
    if (cityInput) {
      filtered = filtered.filter((master) =>
        master.city.toLowerCase().includes(cityInput.toLowerCase()),
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (master) =>
        master.priceFrom >= priceRange[0] && master.priceFrom <= priceRange[1],
    );

    // Filter by rating
    if (selectedRating > 0) {
      filtered = filtered.filter((master) => master.rating >= selectedRating);
    }

    // Filter by looking for models
    if (lookingForModels) {
      filtered = filtered.filter((master) => master.lookingForModels);
    }

    // Filter by favorites
    if (searchParams.favorites) {
      filtered = filtered.filter((master) => master.isFavorite);
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price_asc':
        filtered.sort((a, b) => a.priceFrom - b.priceFrom);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.priceFrom - a.priceFrom);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    return filtered;
  }, [
    allMasters,
    searchQuery,
    selectedCategory,
    cityInput,
    selectedRating,
    lookingForModels,
    searchParams.favorites,
    sortBy,
    categories,
    priceRange,
  ]);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      setMasters(filteredMasters);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [filteredMasters]);

  useEffect(() => {
    // Initialize favorite masters
    setFavoriteMasters(
      new Set(
        allMasters.filter((m: Master) => m.isFavorite).map((m: Master) => m.id),
      ),
    );
  }, [allMasters]);

  const toggleFavorite = (masterId: number) => {
    setFavoriteMasters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(masterId)) {
        newSet.delete(masterId);
      } else {
        newSet.add(masterId);
      }
      return newSet;
    });
  };

  const updateSearchParams = () => {
    const params: Record<string, unknown> = {};
    if (searchQuery) params.q = searchQuery;
    if (selectedCategory) params.category = selectedCategory;
    if (cityInput) params.city = cityInput;
    if (priceRange[0] > 0) params.priceFrom = priceRange[0];
    if (priceRange[1] < 10000) params.priceTo = priceRange[1];
    if (selectedRating > 0) params.rating = selectedRating;
    if (lookingForModels) params.lookingForModels = true;
    if (sortBy !== 'rating') params.sortBy = sortBy;

    navigate({
      to: '/catalog/search',
      search: params,
      replace: true,
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setCityInput('');
    setPriceRange([0, 10000]);
    setSelectedRating(0);
    setLookingForModels(false);
    setSortBy('rating');
    navigate({ to: '/catalog/search', search: {}, replace: true });
  };

  const MasterCard: React.FC<{ master: Master }> = ({ master }) => (
    <Card
      isPressable
      className="w-full hover:shadow-lg transition-all duration-300 bg-white/80 dark:bg-gray-800/50"
      onPress={() => navigate({ to: `/master/${master.nickname}` })}
      isBlurred
    >
      <CardBody className="p-4">
        <div className="flex items-start space-x-4">
          <Avatar src={master.avatar} size="lg" className="flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                  {master.name}
                </h3>
                <Chip
                  size="sm"
                  color="secondary"
                  variant="flat"
                  className="mb-1"
                >
                  {master.specialty}
                </Chip>
                {master.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {master.description}
                  </p>
                )}
              </div>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => {
                  toggleFavorite(master.id);
                }}
                className={
                  favoriteMasters.has(master.id)
                    ? 'text-pink-500'
                    : 'text-gray-400'
                }
              >
                <Heart
                  className={`w-4 h-4 ${favoriteMasters.has(master.id) ? 'fill-current' : ''}`}
                />
              </Button>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{master.rating}</span>
                  <span className="text-xs text-gray-500">
                    ({master.reviews})
                  </span>
                </div>
                {master.lookingForModels && (
                  <div className="flex items-center">
                    <FlaskConical className="w-4 h-4 text-purple-500" />
                    <span className="text-xs text-purple-600 dark:text-purple-400 ml-1">
                      Looking for models
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>
                  {master.city}, {master.country}
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-pink-600">
                  from ₽{master.priceFrom}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <Button
                size="sm"
                color="primary"
                variant="flat"
                onPress={() => {
                  navigate({ to: `/master/${master.nickname}` });
                }}
                className="w-full"
              >
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Button
            isIconOnly
            variant="light"
            onPress={() => navigate({ to: '/catalog' })}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <Input
              placeholder="Search services or masters..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateSearchParams();
                }
              }}
              startContent={<Search className="w-4 h-4 text-gray-500" />}
              classNames={{
                inputWrapper:
                  'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md',
              }}
            />
          </div>
          <Button
            isIconOnly
            variant="flat"
            onPress={() => setShowFilters(!showFilters)}
            className={showFilters ? 'bg-pink-100 dark:bg-pink-900' : ''}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
            <CardBody className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Filters</h3>
                <Button size="sm" variant="light" onPress={clearFilters}>
                  Clear All
                </Button>
              </div>

              <Select
                label="Category"
                placeholder="Select category"
                selectedKeys={selectedCategory ? [selectedCategory] : []}
                onSelectionChange={(keys) =>
                  setSelectedCategory(Array.from(keys)[0] as string)
                }
              >
                {categories.map((category) => (
                  <SelectItem key={category.id}>{category.name}</SelectItem>
                ))}
              </Select>

              <Input
                label="City"
                placeholder="Enter city name"
                value={cityInput}
                onValueChange={setCityInput}
              />

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Price Range: ₽{priceRange[0]} - ₽{priceRange[1]}
                </label>
                <Slider
                  step={100}
                  minValue={0}
                  maxValue={10000}
                  value={priceRange}
                  onChange={(value) => setPriceRange(value as number[])}
                  className="max-w-md"
                />
              </div>

              <Select
                label="Minimum Rating"
                placeholder="Select minimum rating"
                selectedKeys={
                  selectedRating > 0 ? [selectedRating.toString()] : []
                }
                onSelectionChange={(keys) =>
                  setSelectedRating(Number(Array.from(keys)[0]) || 0)
                }
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <SelectItem key={rating.toString()}>
                    {rating}+ Stars
                  </SelectItem>
                ))}
              </Select>

              <Checkbox
                isSelected={lookingForModels}
                onValueChange={setLookingForModels}
              >
                <div className="flex items-center space-x-2">
                  <FlaskConical className="w-4 h-4 text-purple-500" />
                  <span>Looking for models</span>
                </div>
              </Checkbox>

              <Button
                color="primary"
                onPress={updateSearchParams}
                className="w-full"
              >
                Apply Filters
              </Button>
            </CardBody>
          </Card>
        )}

        {/* Sorting */}
        <div className="flex justify-between items-center">
          <Select
            label="Sort by"
            selectedKeys={[sortBy]}
            onSelectionChange={(keys) =>
              setSortBy(Array.from(keys)[0] as SortByType)
            }
            size="sm"
            className="max-w-xs"
          >
            <SelectItem key="rating">By Rating</SelectItem>
            <SelectItem key="price_asc">Price: Low to High</SelectItem>
            <SelectItem key="price_desc">Price: High to Low</SelectItem>
            <SelectItem key="reviews">Most Reviewed</SelectItem>
          </Select>
          <span className="text-sm text-gray-500">
            {masters.length} results
          </span>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Spinner size="lg" color="primary" />
          </div>
        ) : masters.length > 0 ? (
          <div className="space-y-4">
            {masters.map((master) => (
              <MasterCard key={master.id} master={master} />
            ))}
          </div>
        ) : (
          <Card className="bg-white/50 dark:bg-gray-800/50">
            <CardBody className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
                No masters found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button variant="flat" onPress={clearFilters}>
                Clear Filters
              </Button>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CatalogSearch;
