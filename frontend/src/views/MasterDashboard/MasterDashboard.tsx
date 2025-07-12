import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Accordion,
  AccordionItem,
  Snippet,
} from '@heroui/react';
import { useNavigate } from '@tanstack/react-router';
import {
  Calendar,
  ChevronRight,
  Eye,
  Edit,
  Plus,
  Settings,
  Smartphone,
  Star,
  Wallet,
  QrCode,
  ExternalLink,
  TrendingUp,
  HeartPulse,
  BarChart3,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';

type TimeSlot = {
  time: string;
  status: 'booked' | 'free' | 'inactive';
  client?: string | null;
  service?: string | null;
};

const MasterDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null,
  );

  // Mock data
  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  const todayAppointments = 3;
  const totalSlots = 6; // Total available slots for today
  const hasMiniApp = false;
  const miniAppVisits = 127;
  const isWalletConnected = true;
  const isDayOff = false; // Set to true to see empty state
  const currentHour = new Date().getHours();

  // Constants
  const SLOT_INTERVAL = 0.5; // 30 minute intervals
  const WORK_START_HOUR = 8;
  const WORK_END_HOUR = 22;

  // Mock time slots for today (08:00-22:00) with 30-minute intervals
  const timeSlots: TimeSlot[] = Array.from(
    { length: (WORK_END_HOUR - WORK_START_HOUR) / SLOT_INTERVAL },
    (_, i) => {
      const totalMinutes = WORK_START_HOUR * 60 + i * (SLOT_INTERVAL * 60);
      const hour = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const currentTotalMinutes = currentHour * 60 + new Date().getMinutes();
      const isPast = totalMinutes < currentTotalMinutes;
      const random1 = Math.random();
      const random2 = Math.random();

      let status: 'booked' | 'free' | 'inactive';
      if (isPast) {
        status = random1 > 0.6 ? 'booked' : 'inactive';
      } else {
        status = random1 > 0.7 ? 'booked' : random2 > 0.4 ? 'free' : 'inactive';
      }

      const clients = ['Anna K.', 'Maria S.', 'Sofia P.'];
      const services = ['Brow Shaping', 'Evening Makeup', 'Bridal Look'];

      return {
        time: `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
        status,
        client:
          status === 'booked'
            ? clients[Math.floor(Math.random() * clients.length)]
            : null,
        service:
          status === 'booked'
            ? services[Math.floor(Math.random() * services.length)]
            : null,
      };
    },
  );

  // Mock upcoming days
  const upcomingDays = Array.from({ length: 8 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    const bookings = Math.floor(Math.random() * 5);
    const busyness =
      bookings === 0 ? 'free' : bookings <= 2 ? 'moderate' : 'busy';

    return {
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      bookings,
      busyness,
      fullDate: date.toISOString().split('T')[0],
    };
  });

  const handleTimeSlotPress = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    onOpen();
  };

  return (
    <div className="max-w-md mx-auto relative min-h-screen">
      <main className="p-4 space-y-6 pb-20">
        {/* Block 1 - Daily Hero Panel */}
        <div className="flex flex-col items-center space-y-3 py-3">
          <h1 className="text-2xl font-light text-gray-900 dark:text-white">
            {todayDate}
          </h1>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Today: {todayAppointments} / {totalSlots} slots booked
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-pink-600 dark:text-pink-400">
              Make beauty, not burnout
            </span>
          </div>
        </div>

        {/* Block 2 - Time Slots for Today */}
        <Card className="bg-white/80 dark:bg-gray-800/50" isBlurred>
          <CardHeader>
            <h2 className="text-lg font-medium">Today's Schedule</h2>
          </CardHeader>
          <CardBody className="pt-0">
            {isDayOff ? (
              // Empty state for day off
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🧘‍♀️</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Today is your day off
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Enjoy your rest, or update your schedule.
                </p>
                <Button
                  variant="flat"
                  size="sm"
                  startContent={<Calendar className="w-4 h-4" />}
                >
                  Update Schedule
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Time slots horizontal scroll */}
                <div className="relative">
                  <div
                    className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide"
                    style={{
                      scrollBehavior: 'smooth',
                    }}
                    ref={(el) => {
                      if (el) {
                        // Auto-scroll to current time on mount
                        const currentIndex = timeSlots.findIndex((slot) => {
                          const [hours, minutes] = slot.time
                            .split(':')
                            .map(Number);
                          const slotTime = hours * 60 + minutes;
                          const currentTime =
                            currentHour * 60 + new Date().getMinutes();
                          return slotTime >= currentTime;
                        });
                        if (currentIndex > 0) {
                          setTimeout(() => {
                            const scrollPosition = Math.max(
                              0,
                              (currentIndex - 2) * 72,
                            ); // 64px width + 8px gap
                            el.scrollLeft = scrollPosition;
                          }, 100);
                        }
                      }
                    }}
                  >
                    {timeSlots.map((slot) => {
                      const [hours, minutes] = slot.time.split(':').map(Number);
                      const slotTime = hours * 60 + minutes;
                      const currentTime =
                        currentHour * 60 + new Date().getMinutes();
                      const isPast = slotTime < currentTime;
                      const isCurrentSlot =
                        Math.abs(slotTime - currentTime) <= 15; // Within 15 minutes

                      return (
                        <div key={slot.time} className="relative flex-shrink-0">
                          {/* Current time indicator */}
                          {isCurrentSlot && (
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-blue-500 z-10" />
                          )}

                          <button
                            onClick={() => handleTimeSlotPress(slot)}
                            className={`w-16 h-12 rounded-lg border-2 transition-all hover:scale-105 flex flex-col items-center justify-center text-xs font-medium ${
                              isPast
                                ? 'opacity-50 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                                : slot.status === 'booked'
                                  ? 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-600 text-red-700 dark:text-red-300'
                                  : slot.status === 'free'
                                    ? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-600 text-green-700 dark:text-green-300'
                                    : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                            } ${isCurrentSlot ? 'ring-2 ring-blue-500 ring-offset-1' : ''}`}
                          >
                            <span className="text-xs">{slot.time}</span>
                            <div className="w-1 h-1 rounded-full mt-1">
                              {slot.status === 'booked' && (
                                <div className="w-full h-full bg-red-500 rounded-full" />
                              )}
                              {slot.status === 'free' && (
                                <div className="w-full h-full bg-green-500 rounded-full" />
                              )}
                            </div>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center space-x-6 text-xs text-gray-500 dark:text-gray-400 pt-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded" />
                    <span>Busy</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded" />
                    <span>Free</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-gray-400 rounded" />
                    <span>Inactive</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-0.5 h-3 bg-blue-500" />
                    <span>Now</span>
                  </div>
                </div>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Upcoming Days */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Upcoming Days
          </h2>
          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {upcomingDays.map((day, index) => (
              <Card
                key={index}
                isPressable
                isBlurred
                onPress={() => navigate({ to: '/master/dashboard' })}
                className={`min-w-[80px] shadow-md bg-white/80 dark:bg-gray-800/50 ${
                  day.busyness === 'busy'
                    ? 'border-red-200 dark:border-red-400'
                    : day.busyness === 'moderate'
                      ? 'border-orange-200 dark:border-orange-400'
                      : 'border-green-200 dark:border-green-400'
                }`}
              >
                <CardBody className="p-3 text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {day.weekday}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {day.date}
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full mx-auto mb-1 ${
                      day.busyness === 'busy'
                        ? 'bg-red-500'
                        : day.busyness === 'moderate'
                          ? 'bg-orange-500'
                          : 'bg-green-500'
                    }`}
                  />
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    {day.bookings} bookings
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* My Status */}
        <Card className="bg-white/80 dark:bg-gray-800/50" isBlurred>
          <CardHeader>
            <h2 className="text-lg font-medium">My Status</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            {/* Profile section */}
            <div className="flex items-center space-x-4">
              <Avatar
                src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=200"
                size="lg"
                className="ring-2 ring-pink-200 dark:ring-pink-400"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Elena Kozlova
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Brow Master & Makeup Artist
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    (120 reviews)
                  </span>
                </div>
              </div>
            </div>

            <Button
              variant="flat"
              className="w-full justify-start"
              startContent={<Eye className="w-4 h-4" />}
              endContent={<ChevronRight className="w-4 h-4" />}
              onPress={() => navigate({ to: '/master/profile' })}
            >
              View my public profile
            </Button>

            {/* Mini App Status */}
            {hasMiniApp ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Chip
                      color="success"
                      variant="flat"
                      size="sm"
                      startContent={<HeartPulse className="w-4 h-4" />}
                    >
                      Mini App Active
                    </Chip>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                    <TrendingUp className="w-4 h-4" />
                    <span>{miniAppVisits} visits this week</span>
                  </div>
                </div>
                <Button
                  variant="flat"
                  size="sm"
                  className="w-full"
                  startContent={<Settings className="w-4 h-4" />}
                  onPress={() => navigate({ to: '/master/miniapp/create' })}
                >
                  Manage Mini App
                </Button>
              </div>
            ) : (
              <Card className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-200/50 dark:border-pink-400/50">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Create Your Own Telegram Mini&nbsp;App
                    </h3>
                  </div>
                </CardHeader>
                <CardBody className="pt-0">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Let clients open your personal page directly inside Telegram
                    — through your own bot. It's fully yours: your brand, your
                    services, your rules.
                  </p>
                  <Button
                    color="primary"
                    size="sm"
                    className="bg-gradient-to-r from-pink-500 to-purple-600"
                    onPress={() => navigate({ to: '/master/miniapp/create' })}
                  >
                    Create My Mini App
                  </Button>
                </CardBody>
              </Card>
            )}
          </CardBody>
        </Card>

        {/* Quick Tools */}
        <Accordion variant="splitted">
          <AccordionItem
            key="1"
            aria-label="Quick Tools"
            title="Quick Tools"
            startContent={<Settings className="w-5 h-5" />}
            className="bg-white/80 dark:bg-gray-800/50"
          >
            <div className="space-y-2">
              <Button
                variant="flat"
                className="w-full justify-start"
                startContent={<Edit className="w-4 h-4" />}
                size="sm"
              >
                Edit portfolio
              </Button>
              <Button
                variant="flat"
                className="w-full justify-start"
                startContent={<Plus className="w-4 h-4" />}
                size="sm"
              >
                Add portfolio item
              </Button>
              <Button
                variant="flat"
                className="w-full justify-start"
                startContent={<ExternalLink className="w-4 h-4" />}
                size="sm"
              >
                Preview my page
              </Button>
              <Button
                variant="flat"
                className="w-full justify-start"
                startContent={<Calendar className="w-4 h-4" />}
                size="sm"
              >
                Update schedule
              </Button>
            </div>
          </AccordionItem>
        </Accordion>

        {/* TON Wallet */}
        <Card className="bg-white/80 dark:bg-gray-800/50" isBlurred>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Wallet className="w-5 h-5" />
              <h2 className="text-lg font-medium">TON Wallet</h2>
            </div>
          </CardHeader>
          <CardBody className="space-y-3">
            {isWalletConnected ? (
              <>
                <div className="flex items-center justify-between">
                  <Chip color="success" variant="flat" size="sm">
                    Connected
                  </Chip>
                  <Button
                    variant="light"
                    size="sm"
                    startContent={<QrCode className="w-4 h-4" />}
                  >
                    QR Code
                  </Button>
                </div>
                <Snippet>UQBvH_jKHWdqZukjIXgB0Y3...</Snippet>
              </>
            ) : (
              <div className="text-center">
                <Chip color="warning" variant="flat" size="sm" className="mb-3">
                  Not connected
                </Chip>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Connect your TON wallet to receive crypto payments
                </p>
              </div>
            )}
            <Button
              variant="flat"
              className="w-full"
              startContent={<Settings className="w-4 h-4" />}
            >
              Configure wallet
            </Button>
          </CardBody>
        </Card>
      </main>

      {/* Time Slot Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Time Slot: {selectedTimeSlot?.time}
              </ModalHeader>
              <ModalBody className="pb-6">
                {selectedTimeSlot?.status === 'booked' ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span className="font-medium">Booked</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        Client: {selectedTimeSlot.client}
                      </p>
                      <p className="text-sm text-gray-600">
                        Service: {selectedTimeSlot.service}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="flat" size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button variant="flat" size="sm" className="flex-1">
                        Contact Client
                      </Button>
                    </div>
                  </div>
                ) : selectedTimeSlot?.status === 'free' ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="font-medium">Available</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      This time slot is available for bookings.
                    </p>
                    <Button color="primary" className="w-full">
                      Block Time Slot
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gray-400 rounded-full" />
                      <span className="font-medium">Inactive</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      This time is outside your working hours.
                    </p>
                    <Button variant="flat" className="w-full">
                      Extend Working Hours
                    </Button>
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MasterDashboard;
