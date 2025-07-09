import { Card, CardBody, Button } from '@heroui/react';
import { useNavigate } from '@tanstack/react-router';
import { CheckCircle, ExternalLink, Share, Home } from 'lucide-react';
import React from 'react';

const MiniappSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-4 flex flex-col justify-center">
      <div className="text-center mb-8">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Your Mini App is now live! 🎉
        </h1>
        <p className="text-gray-600">
          Clients can now book your services directly through Telegram
        </p>
      </div>

      <Card className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
        <CardBody className="p-6 text-center">
          <h3 className="font-semibold text-gray-900 mb-2">
            Your Bot is Ready!
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Share your bot link with clients so they can access your beauty
            services
          </p>
          <div className="bg-white rounded-lg p-3 mb-4">
            <code className="text-sm font-mono text-gray-800">
              https://t.me/elena_beauty_bot
            </code>
          </div>
        </CardBody>
      </Card>

      <div className="space-y-3 mb-6">
        <Button
          color="primary"
          size="lg"
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500"
          startContent={<ExternalLink className="w-5 h-5" />}
        >
          Open my Telegram Bot
        </Button>

        <Button
          variant="flat"
          size="lg"
          className="w-full"
          startContent={<Share className="w-5 h-5" />}
        >
          Share Bot Link
        </Button>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-gray-900 mb-2">What's next?</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Upload your portfolio photos</li>
          <li>• Set your available time slots</li>
          <li>• Configure your service prices</li>
          <li>• Share your bot with clients</li>
        </ul>
      </div>

      <Button
        variant="flat"
        size="lg"
        className="w-full"
        startContent={<Home className="w-5 h-5" />}
        onPress={() => navigate({ to: '/master/dashboard' })}
      >
        Back to Dashboard
      </Button>
    </div>
  );
};

export default MiniappSuccess;
