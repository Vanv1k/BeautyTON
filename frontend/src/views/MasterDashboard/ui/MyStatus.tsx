import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
} from '@heroui/react';
import {
  ChevronRight,
  Eye,
  HeartPulse,
  Settings,
  Smartphone,
  Star,
  TrendingUp,
} from 'lucide-react';
import { memo } from 'react';

type Props = {
  hasMiniApp: boolean;
  miniAppVisits: number;
  onViewProfile: () => void;
  onManageMiniApp: () => void;
  onCreateMiniApp: () => void;
};

const MyStatus: React.FC<Props> = ({
  hasMiniApp,
  miniAppVisits,
  onViewProfile,
  onManageMiniApp,
  onCreateMiniApp,
}) => {
  return (
    <Card className="bg-white/80 dark:bg-gray-800/50" isBlurred>
      <CardBody className="space-y-4">
        {/* Profile section */}
        <div className="flex items-center space-x-4">
          <Avatar
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=200"
            size="lg"
            className="ring-2 ring-pink-200 dark:ring-pink-400"
          />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Elena Kozlova
            </h3>
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

        <Button
          variant="flat"
          className="w-full justify-start"
          startContent={<Eye className="w-4 h-4" />}
          endContent={<ChevronRight className="w-4 h-4" />}
          onPress={onViewProfile}
        >
          View my public profile
        </Button>

        {/* Mini App Status */}
        {hasMiniApp ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Chip
                  color="success"
                  variant="flat"
                  size="sm"
                  startContent={<HeartPulse className="w-4 h-4" />}
                >
                  Mini App Active
                </Chip>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                <TrendingUp className="w-4 h-4" />
                <span>{miniAppVisits} visits this week</span>
              </div>
            </div>
            <Button
              variant="flat"
              size="sm"
              className="w-full"
              startContent={<Settings className="w-4 h-4" />}
              onPress={onManageMiniApp}
            >
              Manage Mini App
            </Button>
          </div>
        ) : (
          <Card className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-200/50 dark:border-pink-400/50">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Create Your Own Telegram Mini&nbsp;App
                </h3>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Let clients open your personal page directly inside Telegram —
                through your own bot. It's fully yours: your brand, your
                services, your rules.
              </p>
              <Button
                color="primary"
                size="sm"
                className="bg-gradient-to-r from-pink-500 to-purple-600"
                onPress={onCreateMiniApp}
              >
                Create My Mini App
              </Button>
            </CardBody>
          </Card>
        )}
      </CardBody>
    </Card>
  );
};

export default memo(MyStatus);
