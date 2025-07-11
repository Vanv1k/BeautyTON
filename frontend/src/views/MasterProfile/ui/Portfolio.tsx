import { Modal, ModalContent, ModalBody, Image } from '@heroui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { MODAL_MOTION_PROPS } from '../config';

const Portfolio: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const portfolioImages = [
    {
      id: 2,
      src: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400',
      alt: 'Bridal look',
    },
    {
      id: 3,
      src: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      alt: 'Eyebrow shaping',
    },
    {
      id: 4,
      src: 'https://images.pexels.com/photos/3618606/pexels-photo-3618606.jpeg?auto=compress&cs=tinysrgb&w=400',
      alt: 'Natural makeup',
    },
    {
      id: 5,
      src: 'https://images.pexels.com/photos/1164674/pexels-photo-1164674.jpeg?auto=compress&cs=tinysrgb&w=400',
      alt: 'Glamour look',
    },
  ];

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;

    if (direction === 'prev') {
      setSelectedImage(
        selectedImage > 0 ? selectedImage - 1 : portfolioImages.length - 1,
      );
    } else {
      setSelectedImage(
        selectedImage < portfolioImages.length - 1 ? selectedImage + 1 : 0,
      );
    }
  };

  return (
    <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
      <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        Portfolio
      </h2>

      <div className="flex space-x-3 overflow-x-auto p-2 scrollbar-hide">
        {portfolioImages.map((image, index) => (
          <div
            key={image.id}
            className="flex-shrink-0 cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              className="w-24 h-24 object-cover rounded-lg"
              classNames={{
                wrapper:
                  'ring-2 ring-transparent rounded-lg hover:ring-pink-300 dark:hover:ring-pink-500',
              }}
            />
          </div>
        ))}
      </div>

      <Modal
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        size="full"
        className="bg-black/90"
        classNames={{
          body: 'p-0',
          backdrop: 'bg-black/80',
          closeButton: 'z-50 text-white bg-white/20 hover:bg-white/30',
        }}
        motionProps={MODAL_MOTION_PROPS}
      >
        <ModalContent>
          <ModalBody className="flex items-center justify-center relative">
            {selectedImage !== null && (
              <>
                <Image
                  src={portfolioImages[selectedImage].src}
                  alt={portfolioImages[selectedImage].alt}
                  className="max-h-[80vh] w-auto object-contain"
                />

                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors z-10"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors z-10"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
                  <p className="text-lg font-medium">
                    {portfolioImages[selectedImage].alt}
                  </p>
                  <p className="text-sm opacity-80">
                    {selectedImage + 1} of {portfolioImages.length}
                  </p>
                </div>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Portfolio;
