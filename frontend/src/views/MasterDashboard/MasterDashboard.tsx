import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
} from '@heroui/react';
import { useNavigate } from '@tanstack/react-router';
import { Calendar, Smartphone, Upload } from 'lucide-react';
import React from 'react';

const MasterDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome, Elena! 👋
        </h1>
        <p className="text-gray-600">Let's set up your beauty business</p>
      </div>

      {/* Profile Card */}
      <Card
        className="mb-6 w-full"
        isPressable
        onPress={() => navigate({ to: '/master/profile' })}
      >
        <CardHeader>
          <h2 className="text-lg font-medium">Your Profile</h2>
        </CardHeader>
        <CardBody>
          <div className="flex items-center space-x-4">
            <Avatar
              src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=200"
              size="lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Elena Kozlova</h3>
              <p className="text-sm text-gray-600">@elena_beauty</p>
              <Chip size="sm" color="secondary" variant="flat" className="mt-1">
                Makeup Artist
              </Chip>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3 mb-8">
        <Button
          variant="flat"
          size="lg"
          className="w-full justify-start bg-gray-100"
          startContent={<Upload className="w-5 h-5" />}
        >
          Upload Portfolio
        </Button>

        <Button
          variant="flat"
          size="lg"
          className="w-full justify-start bg-gray-100"
          startContent={<Calendar className="w-5 h-5" />}
        >
          Set Work Schedule
        </Button>
      </div>

      {/* Main CTA */}
      <Card className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-200 mb-4">
        <CardBody className="text-center p-6">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Create Your Own Telegram Mini App
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Let clients open your personal page directly inside Telegram —
            through your own bot. It’s fully yours: your brand, your services,
            your rules.
          </p>
          <Button
            color="primary"
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-purple-600"
            onPress={() => navigate({ to: '/master/miniapp/create' })}
          >
            Get Started
          </Button>
        </CardBody>
      </Card>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          Your mini app will be available at:
          <br />
          <span className="font-mono">
            miniapp.beautyton.com/masters/elena-kozlova
          </span>
        </p>
      </div>
    </div>
  );
};

export default MasterDashboard;
