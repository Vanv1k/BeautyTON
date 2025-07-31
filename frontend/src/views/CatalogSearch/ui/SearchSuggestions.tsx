import { Button, Card, CardBody } from '@heroui/react';
import { Search, TrendingUp } from 'lucide-react';
import { type FC } from 'react';

type SearchSuggestionsProps = {
  onSuggestionClick: (suggestion: string) => void;
  className?: string;
};

const POPULAR_SEARCHES = [
  'Manicure',
  'Hair styling',
  'Eyebrow shaping',
  'Massage',
  'Makeup',
  'Hair coloring',
];

const TRENDING_SEARCHES = [
  'Korean skincare',
  'Lash extensions',
  'Balayage',
  'Brazilian blowout',
];

export const SearchSuggestions: FC<SearchSuggestionsProps> = ({
  onSuggestionClick,
  className = '',
}) => {
  return (
    <Card
      className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-md ${className}`}
    >
      <CardBody className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Search className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Popular searches
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SEARCHES.map((search) => (
              <Button
                key={search}
                size="sm"
                variant="flat"
                onPress={() => onSuggestionClick(search)}
                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
              >
                {search}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Trending now
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {TRENDING_SEARCHES.map((search) => (
              <Button
                key={search}
                size="sm"
                variant="flat"
                color="primary"
                onPress={() => onSuggestionClick(search)}
                className="bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/30 dark:hover:bg-primary-900/50"
              >
                {search}
              </Button>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
