import { Card, CardBody, CardHeader, Button, Alert } from '@heroui/react';
import { useNavigate } from '@tanstack/react-router';
import { Loader } from 'lucide-react';
import React, { useState } from 'react';

import { Input } from '~/shared/ui/Input';

const MiniappConnect: React.FC = () => {
  const navigate = useNavigate();
  const [botToken, setBotToken] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (!botToken.trim()) return;

    setIsConnecting(true);

    // Simulate API call
    setTimeout(() => {
      setIsConnecting(false);
      navigate({ to: '/master/miniapp/success', replace: true });
    }, 2000);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Connect Your Bot
        </h1>

        <Card className="mb-6 bg-white/80 dark:bg-gray-800/50" isBlurred>
          <CardHeader>
            <h2 className="text-lg font-medium">Bot Configuration</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Alert
              title="Almost done!"
              description="Paste your Bot Token from BotFather to connect your Telegram Mini App."
              color="primary"
              variant="flat"
              className="mb-4"
              hideIcon
            />

            <Input
              label="Telegram Bot API Key"
              placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
              value={botToken}
              onValueChange={setBotToken}
              description="This is the token you received from @BotFather"
              isRequired
              type="password"
            />

            <Alert
              description="Your bot token is encrypted and stored securely. We never share it with third parties."
              color="warning"
              variant="flat"
              className="mb-4"
              hideIcon
            />
          </CardBody>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            By connecting, you agree to our Terms&nbsp;of&nbsp;Service and
            Privacy&nbsp;Policy
          </p>
        </div>
        <Button
          color="primary"
          size="lg"
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600"
          onPress={handleConnect}
          isDisabled={!botToken.trim() || isConnecting}
          isLoading={isConnecting}
          spinner={<Loader className="w-4 h-4 animate-spin" />}
        >
          {isConnecting ? 'Connecting...' : 'Connect Mini App'}
        </Button>
      </div>
    </div>
  );
};

export default MiniappConnect;
