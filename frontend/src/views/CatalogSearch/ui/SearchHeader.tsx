import { Button } from '@heroui/react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { type FC } from 'react';

import { Input } from '~/shared/ui/Input';

type SearchHeaderProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
  showFilters: boolean;
  onToggleFilters: () => void;
};

export const SearchHeader: FC<SearchHeaderProps> = ({
  query,
  onQueryChange,
  onSearch,
  showFilters,
  onToggleFilters,
}) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex-1">
        <Input
          placeholder="Search services or masters..."
          value={query}
          onValueChange={onQueryChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch();
            }
          }}
          startContent={<Search className="w-4 h-4 text-gray-500" />}
          classNames={{
            inputWrapper: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md',
          }}
        />
      </div>
      <Button
        isIconOnly
        variant="flat"
        onPress={onToggleFilters}
        className={showFilters ? 'bg-pink-100 dark:bg-pink-900' : ''}
      >
        <SlidersHorizontal className="w-5 h-5" />
      </Button>
    </div>
  );
};
