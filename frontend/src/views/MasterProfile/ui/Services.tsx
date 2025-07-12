import { Card, CardBody, Button, Image, Chip } from '@heroui/react';
import { Clock, Star } from 'lucide-react';

type Props = {
  onScrollToCalendar: VoidFunction;
};

const Services: React.FC<Props> = ({ onScrollToCalendar }) => {
  const services = [
    {
      id: 2,
      name: 'Eyebrow Shaping & Tinting',
      duration: '45m',
      price: '2200₽',
      image:
        'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.8,
      popular: false,
    },
    {
      id: 3,
      name: 'Bridal Makeup Package',
      duration: '2h 30m',
      price: '8500₽',
      image:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 5.0,
      popular: true,
    },
    {
      id: 4,
      name: 'Natural Day Look',
      duration: '1h',
      price: '2800₽',
      image:
        'https://images.pexels.com/photos/3618606/pexels-photo-3618606.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.7,
      popular: false,
    },
  ];

  return (
    <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Services
      </h2>

      <div className="space-y-3">
        {services.map((service) => (
          <Card
            key={service.id}
            className="w-full bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300"
            isPressable
            onPress={onScrollToCalendar}
          >
            <CardBody className="p-3">
              <div className="flex space-x-3">
                <div className="relative">
                  <Image
                    src={service.image}
                    alt={service.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  {service.popular && (
                    <Chip
                      size="sm"
                      color="warning"
                      variant="solid"
                      className="absolute -top-1 -right-1 text-xs z-10"
                    >
                      Popular
                    </Chip>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {service.name}
                    </h3>
                    <span className="font-bold text-pink-600 dark:text-pink-400 text-sm">
                      {service.price}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {service.rating}
                      </span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-300/50 dark:border-pink-400/50 text-pink-700 dark:text-pink-300"
                    onPress={onScrollToCalendar}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services;
