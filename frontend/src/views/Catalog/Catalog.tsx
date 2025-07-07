import React from 'react';
import { Avatar, Button, Card, CardBody, Chip } from '@heroui/react';
import { MapPin, Search, Star } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

const Catalog: React.FC = () => {
  const navigate = useNavigate();

  const masters = [
    {
      id: 1,
      name: 'Elena Kozlova',
      specialty: 'Makeup Artist',
      avatar:
        'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 4.8,
      reviews: 120,
      distance: '0.5 km',
      priceRange: '2500-5000₽',
    },
    {
      id: 2,
      name: 'Sofia Mikhailova',
      specialty: 'Hair Stylist',
      avatar:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 4.7,
      reviews: 89,
      distance: '0.8 km',
      priceRange: '2000-4500₽',
    },
    {
      id: 3,
      name: 'Diana Volkov',
      specialty: 'Nail Artist',
      avatar:
        'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 4.9,
      reviews: 156,
      distance: '1.2 km',
      priceRange: '1500-3000₽',
    },
  ];

  return (
    <div className="min-h-screen p-4">
      <div className="flex items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Beauty Masters</h1>
      </div>

      <div className="mb-6">
        <Button
          variant="flat"
          size="lg"
          className="w-full justify-start bg-gray-100"
          startContent={<Search className="w-5 h-5" />}
        >
          Search services or masters...
        </Button>
      </div>

      <div className="space-y-4">
        {masters.map((master) => (
          <Card
            key={master.id}
            isPressable
            className="w-full hover:shadow-lg transition-all duration-300"
          >
            <CardBody className="p-4">
              <div className="flex items-center space-x-4">
                <Avatar
                  src={master.avatar}
                  size="lg"
                  className="flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {master.name}
                      </h3>
                      <Chip size="sm" color="secondary" variant="flat">
                        {master.specialty}
                      </Chip>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {master.rating}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {master.reviews} reviews
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {master.distance}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-pink-600">
                      {master.priceRange}
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-500 mb-4">
          Want to offer your services?
        </p>
        <Button
          color="primary"
          variant="flat"
          onPress={() => navigate({ to: '/master/onboarding' })}
          className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-300"
        >
          Become a Master
        </Button>
      </div>
    </div>
  );
};

export default Catalog;
