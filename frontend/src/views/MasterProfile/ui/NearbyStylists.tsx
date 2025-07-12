import {
  Card,
  CardBody,
  Avatar,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Chip,
} from '@heroui/react';
import { MapPin, Star } from 'lucide-react';
import { useState } from 'react';

import { MODAL_MOTION_PROPS } from '../config';

const NearbyStylists: React.FC = () => {
  const [showAllStylists, setShowAllStylists] = useState(false);

  const nearbyStylists = [
    {
      id: 1,
      name: 'Sofia Mikhailova',
      specialty: 'Hair Stylist',
      avatar:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4.7,
      distance: '0.8 km',
      reviews: 89,
      priceRange: '2000-4500₽',
    },
    {
      id: 2,
      name: 'Diana Volkov',
      specialty: 'Nail Artist',
      avatar:
        'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4.9,
      distance: '1.2 km',
      reviews: 156,
      priceRange: '1500-3000₽',
    },
    {
      id: 3,
      name: 'Anastasia Popov',
      specialty: 'Lash Artist',
      avatar:
        'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4.6,
      distance: '1.5 km',
      reviews: 203,
      priceRange: '2500-6000₽',
    },
    {
      id: 4,
      name: 'Valentina Orlov',
      specialty: 'Massage Therapist',
      avatar:
        'https://images.pexels.com/photos/1164674/pexels-photo-1164674.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4.8,
      distance: '2.1 km',
      reviews: 94,
      priceRange: '3000-5500₽',
    },
    {
      id: 5,
      name: 'Ksenia Fedorov',
      specialty: 'Cosmetologist',
      avatar:
        'https://images.pexels.com/photos/3618606/pexels-photo-3618606.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4.9,
      distance: '2.3 km',
      reviews: 127,
      priceRange: '4000-8000₽',
    },
  ];

  const displayedStylists = nearbyStylists.slice(0, 3);

  return (
    <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Stylists Nearby
        </h2>
        <Button
          variant="light"
          size="sm"
          onPress={() => setShowAllStylists(true)}
          className="text-pink-600 dark:text-pink-400"
        >
          See all
        </Button>
      </div>

      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        {displayedStylists.map((stylist) => (
          <Card
            key={stylist.id}
            className="flex-shrink-0 w-48 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-all duration-300"
            isPressable
          >
            <CardBody className="p-3 text-center">
              <Avatar src={stylist.avatar} size="lg" className="mx-auto mb-2" />

              <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-1">
                {stylist.name}
              </h4>

              <Chip
                size="sm"
                variant="flat"
                color="secondary"
                className="mb-2 mx-auto"
              >
                {stylist.specialty}
              </Chip>

              <div className="flex items-center justify-center space-x-1 mb-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{stylist.rating}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({stylist.reviews})
                </span>
              </div>

              <div className="flex items-center justify-center space-x-1 mb-2">
                <MapPin className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {stylist.distance}
                </span>
              </div>

              <p className="text-xs text-pink-600 dark:text-pink-400 font-medium">
                {stylist.priceRange}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* All Stylists Modal */}
      <Modal
        isOpen={showAllStylists}
        onClose={() => setShowAllStylists(false)}
        size="lg"
        scrollBehavior="inside"
        motionProps={MODAL_MOTION_PROPS}
      >
        <ModalContent>
          <ModalHeader>
            <h3 className="text-lg font-semibold">Beauty Masters Nearby</h3>
          </ModalHeader>

          <ModalBody>
            <div className="space-y-3">
              {nearbyStylists.map((stylist) => (
                <Card
                  key={stylist.id}
                  className="w-full border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-shadow"
                  isPressable
                >
                  <CardBody className="p-4">
                    <div className="flex items-center space-x-4">
                      <Avatar src={stylist.avatar} size="md" />

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {stylist.name}
                            </h4>
                            <Chip size="sm" variant="flat" color="secondary">
                              {stylist.specialty}
                            </Chip>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1 mb-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">
                                {stylist.rating}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {stylist.reviews} reviews
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {stylist.distance}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-pink-600 dark:text-pink-400">
                            {stylist.priceRange}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default NearbyStylists;
