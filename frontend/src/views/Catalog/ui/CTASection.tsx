import { Button } from '@heroui/react';
import type { FC } from 'react';

type CTASectionProps = {
  onBecomeMaster: () => void;
};

const CTASection: FC<CTASectionProps> = ({ onBecomeMaster }) => {
  return (
    <div className="text-center py-6">
      <p className="text-sm text-gray-500 mb-4">Want to offer your services?</p>
      <Button
        color="primary"
        variant="flat"
        onPress={onBecomeMaster}
        className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-300"
      >
        Become a Master
      </Button>
    </div>
  );
};

export default CTASection;
