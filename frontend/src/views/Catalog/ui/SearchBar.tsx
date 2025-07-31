import { Button } from '@heroui/react';
import { Search } from 'lucide-react';
import type { FC } from 'react';

type SearchBarProps = {
  onSearchClick: () => void;
};

const SearchBar: FC<SearchBarProps> = ({ onSearchClick }) => {
  return (
    <Button
      variant="flat"
      size="lg"
      className="w-full justify-start bg-white/80 dark:bg-gray-800/80 backdrop-blur-md"
      startContent={<Search className="w-5 h-5 text-gray-500" />}
      onPress={onSearchClick}
    >
      <span className="text-gray-500">Search services or masters...</span>
    </Button>
  );
};

export default SearchBar;
