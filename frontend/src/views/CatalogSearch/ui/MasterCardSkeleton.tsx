import { Card, CardBody, Skeleton } from '@heroui/react';
import { Star } from 'lucide-react';
import type { FC } from 'react';

const MasterCardSkeleton: FC = () => (
  <Card className="w-full">
    <CardBody className="p-3">
      <div className="flex items-center space-x-3">
        <Skeleton className="w-16 h-16 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-gray-300" />
              <Skeleton className="h-3 w-8" />
            </div>
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
    </CardBody>
  </Card>
);

export default MasterCardSkeleton;
