import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Snippet,
} from '@heroui/react';
import { QrCode, Settings, Wallet } from 'lucide-react';
import { memo } from 'react';

type Props = {
  isWalletConnected: boolean;
};

const WalletCard: React.FC<Props> = ({ isWalletConnected }) => {
  return (
    <Card className="bg-white/80 dark:bg-gray-800/50" isBlurred>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Wallet className="w-5 h-5" />
          <h2 className="text-lg font-medium">TON Wallet</h2>
        </div>
      </CardHeader>
      <CardBody className="space-y-3">
        {isWalletConnected ? (
          <>
            <div className="flex items-center justify-between">
              <Chip color="success" variant="flat" size="sm">
                Connected
              </Chip>
              <Button
                variant="light"
                size="sm"
                startContent={<QrCode className="w-4 h-4" />}
              >
                QR Code
              </Button>
            </div>
            <Snippet>UQBvH_jKHWdqZukjIXgB0Y3...</Snippet>
          </>
        ) : (
          <div className="text-center">
            <Chip color="warning" variant="flat" size="sm" className="mb-3">
              Not connected
            </Chip>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Connect your TON wallet to receive crypto payments
            </p>
          </div>
        )}
        <Button
          variant="flat"
          className="w-full"
          startContent={<Settings className="w-4 h-4" />}
        >
          Configure wallet
        </Button>
      </CardBody>
    </Card>
  );
};

export default memo(WalletCard);
