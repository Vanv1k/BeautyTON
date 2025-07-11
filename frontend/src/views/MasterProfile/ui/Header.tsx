import { Avatar, Button, Chip } from '@heroui/react';
import { Star, MapPin } from 'lucide-react';

type Props = {
  setHeaderRef: (ref: HTMLDivElement | null) => void;
  onScrollToCalendar: VoidFunction;
};

const Header: React.FC<Props> = ({ setHeaderRef, onScrollToCalendar }) => {
  return (
    <div
      ref={setHeaderRef}
      className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50"
    >
      <div className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=200"
            size="lg"
            className="ring-2 ring-pink-200 dark:ring-pink-400"
          />
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Elena Kozlova
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Brow Master & Makeup Artist
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">4.8</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                (120 reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
            <MapPin className="w-4 h-4" />
            <span>Moscow, Arbat District</span>
          </div>
          <Chip
            color="success"
            variant="flat"
            size="sm"
            className="animate-pulse"
          >
            Available Today
          </Chip>
        </div>

        <Button
          color="primary"
          size="lg"
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 font-semibold"
          onPress={onScrollToCalendar}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Header;
