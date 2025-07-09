import { Button } from '@heroui/react';
import { Plus, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 p-4">
      <div className="flex space-x-3">
        <Button
          variant="flat"
          className="flex-1 bg-gradient-to-r from-pink-500/10 to-purple-600/10 border border-pink-300/50 dark:border-pink-400/50"
          startContent={<Heart className="w-4 h-4" />}
        >
          Save Profile
        </Button>

        <Button
          color="primary"
          className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          startContent={<Plus className="w-4 h-4" />}
        >
          Become a Master
        </Button>
      </div>

      <div className="text-center mt-2">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Join 1000+ beauty professionals on Telegram
        </p>
      </div>
    </div>
  );
};

export default Footer;
