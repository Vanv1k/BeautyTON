import { useCallback, useEffect, useState } from 'react';

import type { Master, SearchFilters } from '../lib';
import { generateMockMasters } from '../lib';

export const useSearchMasters = (filters: SearchFilters, sortBy: string) => {
  const [masters, setMasters] = useState<Master[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteMasters, setFavoriteMasters] = useState<Set<number>>(
    new Set(),
  );

  useEffect(() => {
    setIsLoading(true);

    // Simulate API call
    const timer = setTimeout(() => {
      const filteredMasters = generateMockMasters(50, filters, sortBy);
      setMasters(filteredMasters);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, sortBy]);

  useEffect(() => {
    // Initialize favorites from mock data
    const initialFavorites = new Set<number>();
    generateMockMasters(50).forEach((master) => {
      if (master.isFavorite) {
        initialFavorites.add(master.id);
      }
    });
    setFavoriteMasters(initialFavorites);
  }, []);

  const toggleFavorite = useCallback((masterId: number) => {
    setFavoriteMasters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(masterId)) {
        newSet.delete(masterId);
      } else {
        newSet.add(masterId);
      }

      // Update masters data
      setMasters((prevMasters) =>
        prevMasters.map((master) =>
          master.id === masterId
            ? { ...master, isFavorite: newSet.has(masterId) }
            : master,
        ),
      );

      return newSet;
    });
  }, []);

  return {
    masters,
    isLoading,
    favoriteMasters,
    toggleFavorite,
  };
};
