import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  addToast,
} from '@heroui/react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
} from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useState } from 'react';

import { MODAL_MOTION_PROPS } from '../config';

type Props = {
  setCalendarRef: (ref: HTMLDivElement | null) => void;
};

const Calendar: React.FC<Props> = ({ setCalendarRef }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth] = useState(new Date());
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState<
    'service' | 'time' | 'confirm'
  >('service');

  const services = [
    { id: '1', name: 'Evening Makeup', price: '3500₽', duration: '1h 30m' },
    { id: '2', name: 'Eyebrow Shaping', price: '2200₽', duration: '45m' },
    { id: '3', name: 'Bridal Package', price: '8500₽', duration: '2h 30m' },
    { id: '4', name: 'Natural Look', price: '2800₽', duration: '1h' },
  ];

  const timeSlots = [
    '09:00',
    '10:30',
    '12:00',
    '13:30',
    '15:00',
    '16:30',
    '18:00',
    '19:30',
  ];

  const monthDays = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const availableDates = monthDays.filter((day) => {
    const dayOfWeek = day.getDay();
    return dayOfWeek !== 0 && day >= new Date(); // Exclude Sundays and past dates
  });

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowBookingModal(true);
    setBookingStep('service');
    setSelectedService(null);
    setSelectedTime(null);
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setBookingStep('time');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setBookingStep('confirm');
  };

  const handleBooking = () => {
    setShowBookingModal(false);

    if (!selectedDate || !selectedService || !selectedTime) {
      addToast({
        title: 'Error',
        description: 'Please complete all steps before confirming.',
        color: 'danger',
      });
      return;
    }

    addToast({
      title: 'Booking Confirmed',
      description: `Your appointment for ${getSelectedServiceDetails()?.name} on ${format(
        selectedDate,
        'MMMM d, yyyy',
      )} at ${selectedTime} has been confirmed.`,
      color: 'success',
    });
  };

  const getSelectedServiceDetails = () => {
    return services.find((s) => s.id === selectedService);
  };

  return (
    <div
      ref={setCalendarRef}
      className="p-4 border-b border-gray-200/50 dark:border-gray-700/50"
    >
      <div className="flex items-center space-x-2 mb-4">
        <CalendarIcon className="w-5 h-5 text-pink-600 dark:text-pink-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Available Dates
        </h2>
      </div>

      <Card className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
        <CardBody className="p-4">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 p-2"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {monthDays.map((day) => {
              const isAvailable = availableDates.some((availableDate) =>
                isSameDay(availableDate, day),
              );
              const isCurrentDay = isToday(day);

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => isAvailable && handleDateClick(day)}
                  disabled={!isAvailable}
                  className={`
                    p-2 text-sm rounded-lg transition-all duration-200 relative
                    ${
                      isAvailable
                        ? 'hover:bg-pink-100 dark:hover:bg-pink-900/30 cursor-pointer text-gray-900 dark:text-white'
                        : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    }
                    ${isCurrentDay ? 'ring-2 ring-pink-400' : ''}
                  `}
                >
                  {format(day, 'd')}
                  {isAvailable && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {/* Booking Modal */}
      <Modal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        size="lg"
        scrollBehavior="inside"
        motionProps={MODAL_MOTION_PROPS}
      >
        <ModalContent>
          <ModalHeader>
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">Book Appointment</h3>
              {selectedDate && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                </p>
              )}
            </div>
          </ModalHeader>

          <ModalBody>
            {bookingStep === 'service' && (
              <div className="space-y-3">
                <h4 className="font-medium mb-3">Select Service</h4>
                {services.map((service) => (
                  <Card
                    key={service.id}
                    isPressable
                    onPress={() => handleServiceSelect(service.id)}
                    className="hover:shadow-md transition-shadow w-full"
                  >
                    <CardBody className="p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <h5 className="font-medium">{service.name}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {service.duration}
                          </p>
                        </div>
                        <span className="font-bold text-pink-600 dark:text-pink-400">
                          {service.price}
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}

            {bookingStep === 'time' && (
              <div className="space-y-3">
                <h4 className="font-medium mb-3">Select Time</h4>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant="flat"
                      onPress={() => handleTimeSelect(time)}
                      className="justify-center"
                      startContent={<Clock className="w-4 h-4" />}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {bookingStep === 'confirm' && (
              <div className="space-y-4">
                <h4 className="font-medium mb-3">Confirm Booking</h4>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-medium">
                      {getSelectedServiceDetails()?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">
                      {selectedDate && format(selectedDate, 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">
                      {getSelectedServiceDetails()?.duration}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-pink-600 dark:text-pink-400">
                      {getSelectedServiceDetails()?.price}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            {bookingStep === 'confirm' && (
              <Button
                color="primary"
                onPress={handleBooking}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600"
                size="lg"
              >
                Confirm Booking
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Calendar;
