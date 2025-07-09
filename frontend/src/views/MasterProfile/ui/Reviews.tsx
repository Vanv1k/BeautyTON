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
import { Star, Filter } from 'lucide-react';
import { useState } from 'react';

import { MODAL_MOTION_PROPS } from '../config';

const Reviews: React.FC = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const reviews = [
    {
      id: 1,
      name: 'Anna Petrova',
      avatar:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      date: '2 days ago',
      text: 'Elena is absolutely amazing! My makeup looked flawless for my wedding day.',
      service: 'Bridal Makeup',
    },
    {
      id: 2,
      name: 'Maria Ivanova',
      avatar:
        'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      date: '1 week ago',
      text: 'Perfect eyebrow shaping. Exactly what I wanted!',
      service: 'Eyebrow Shaping',
    },
    {
      id: 3,
      name: 'Olga Smirnova',
      avatar:
        'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4,
      date: '2 weeks ago',
      text: 'Great evening makeup, lasted the whole night. Professional and friendly.',
      service: 'Evening Makeup',
    },
    {
      id: 4,
      name: 'Ekaterina Volkov',
      avatar:
        'https://images.pexels.com/photos/1164674/pexels-photo-1164674.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      date: '3 weeks ago',
      text: 'Elena has magic hands! My skin never looked better.',
      service: 'Natural Look',
    },
    {
      id: 5,
      name: 'Natasha Kozlov',
      avatar:
        'https://images.pexels.com/photos/3618606/pexels-photo-3618606.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      date: '1 month ago',
      text: 'Highly recommend! Professional, punctual, and talented.',
      service: 'Evening Makeup',
    },
  ];

  const displayedReviews = reviews.slice(0, 3);

  const filteredReviews = filterRating
    ? reviews.filter((review) => review.rating === filterRating)
    : reviews;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Reviews
        </h2>
        <Button
          variant="light"
          size="sm"
          onPress={() => setShowAllReviews(true)}
          className="text-pink-600 dark:text-pink-400"
        >
          See all reviews
        </Button>
      </div>

      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        {displayedReviews.map((review) => (
          <Card
            key={review.id}
            className="flex-shrink-0 w-64 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
          >
            <CardBody className="p-3">
              <div className="flex items-center space-x-3 mb-2">
                <Avatar
                  src={review.avatar}
                  size="sm"
                  className="flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-gray-900 dark:text-white truncate">
                    {review.name}
                  </h4>
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-700 dark:text-gray-300 mb-2 line-clamp-3">
                {review.text}
              </p>

              <div className="flex justify-between items-center">
                <Chip size="sm" variant="flat" className="text-xs">
                  {review.service}
                </Chip>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {review.date}
                </span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* All Reviews Modal */}
      <Modal
        isOpen={showAllReviews}
        onClose={() => setShowAllReviews(false)}
        size="lg"
        scrollBehavior="inside"
        motionProps={MODAL_MOTION_PROPS}
      >
        <ModalContent>
          <ModalHeader>
            <div className="flex justify-between items-center w-full">
              <h3 className="text-lg font-semibold">All Reviews</h3>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <select
                  value={filterRating || ''}
                  onChange={(e) =>
                    setFilterRating(
                      e.target.value ? parseInt(e.target.value) : null,
                    )
                  }
                  className="text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
                >
                  <option value="">All ratings</option>
                  <option value="5">5 stars</option>
                  <option value="4">4 stars</option>
                  <option value="3">3 stars</option>
                  <option value="2">2 stars</option>
                  <option value="1">1 star</option>
                </select>
              </div>
            </div>
          </ModalHeader>

          <ModalBody>
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <Card
                  key={review.id}
                  className="border border-gray-200/50 dark:border-gray-700/50"
                >
                  <CardBody className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar src={review.avatar} size="md" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {review.name}
                            </h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {review.date}
                              </span>
                            </div>
                          </div>
                          <Chip size="sm" variant="flat">
                            {review.service}
                          </Chip>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {review.text}
                        </p>
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

export default Reviews;
