import { Card, CardBody, CardHeader, Input, Button } from '@heroui/react';
import { useNavigate } from '@tanstack/react-router';
import { Key, Loader } from 'lucide-react';
import React, { useState } from 'react';

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
    <div className="min-h-screen p-4">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">
        Connect Your Bot
      </h1>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Key className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-medium">Bot Configuration</h2>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-800">
              <strong>Almost done!</strong> Paste your Bot Token from BotFather
              to connect your Telegram Mini App.
            </p>
          </div>

          <Input
            label="Telegram Bot API Key"
            placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
            value={botToken}
            onValueChange={setBotToken}
            description="This is the token you received from @BotFather"
            isRequired
            type="password"
          />

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs text-yellow-800">
              <strong>Security:</strong> Your bot token is encrypted and stored
              securely. We never share it with third parties.
            </p>
          </div>
        </CardBody>
      </Card>

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

      <div className="text-center mt-4">
        <p className="text-xs text-gray-500">
          By connecting, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default MiniappConnect;
