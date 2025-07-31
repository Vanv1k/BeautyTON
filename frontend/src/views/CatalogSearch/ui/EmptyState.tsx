import { Button, Card, CardBody } from '@heroui/react';
import { Search } from 'lucide-react';
import { type FC } from 'react';

type EmptyStateProps = {
  onClearFilters: () => void;
};

export const EmptyState: FC<EmptyStateProps> = ({ onClearFilters }) => {
  return (
    <Card className="bg-white/50 dark:bg-gray-800/50">
      <CardBody className="text-center py-12">
        <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
          No masters found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Try adjusting your search criteria or filters
        </p>
        <Button variant="flat" onPress={onClearFilters}>
          Clear Filters
        </Button>
      </CardBody>
    </Card>
  );
};
