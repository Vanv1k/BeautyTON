import { Card, CardBody } from '@heroui/react';
import { useNavigate } from '@tanstack/react-router';
import { Sparkles, User } from 'lucide-react';

const RoleSelection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Who are you?</h1>
        <p className="text-gray-600">Choose your role to get started</p>
      </div>

      <div className="space-y-4">
        <Card
          isPressable
          onPress={() => navigate({ to: '/catalog' })}
          className="w-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <CardBody className="p-6 text-center">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              I am a Client
            </h2>
            <p className="text-gray-600 text-sm">
              Find and book beauty services near you
            </p>
          </CardBody>
        </Card>

        <Card
          isPressable
          onPress={() => navigate({ to: '/master/onboarding' })}
          className="w-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <CardBody className="p-6 text-center">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              I am a Master
            </h2>
            <p className="text-gray-600 text-sm">
              Offer your beauty services and grow your business
            </p>
          </CardBody>
        </Card>
      </div>

      <div className="text-center mt-8">
        <p className="text-xs text-gray-500">
          Join thousands of beauty professionals and clients
        </p>
      </div>
    </div>
  );
};

export default RoleSelection;
