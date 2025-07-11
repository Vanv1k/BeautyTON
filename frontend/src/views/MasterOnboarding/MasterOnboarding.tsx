import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  SelectItem,
} from '@heroui/react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowRight, AtSign, Camera } from 'lucide-react';
import React, { useState } from 'react';

import { Input } from '~/shared/ui/Input';
import { Select } from '~/shared/ui/Select';
import { Textarea } from '~/shared/ui/Textarea';

const MasterOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profilePhoto: '',
    telegramUsername: 'elena_beauty',
    firstName: 'Elena',
    lastName: 'Kozlova',
    serviceCategory: '',
    bio: '',
  });

  const serviceCategories = [
    { key: 'makeup', label: 'Makeup Artist' },
    { key: 'brows', label: 'Brow Master' },
    { key: 'hair', label: 'Hair Stylist' },
    { key: 'nails', label: 'Nail Artist' },
    { key: 'lashes', label: 'Lash Artist' },
    { key: 'skincare', label: 'Cosmetologist' },
    { key: 'massage', label: 'Massage Therapist' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    navigate({ to: '/master/dashboard' });
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Create Your Profile
      </h1>

      <Card className="mb-6 bg-white/80 dark:bg-gray-800/50" isBlurred>
        <CardHeader>
          <h2 className="text-lg font-medium">Master Information</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          {/* Profile Photo */}
          <div className="flex flex-col items-center space-y-3">
            <Avatar
              src={
                formData.profilePhoto ||
                'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=200'
              }
              size="lg"
              className="w-20 h-20"
            />
            <Button
              variant="flat"
              size="sm"
              startContent={<Camera className="w-4 h-4" />}
            >
              Upload Photo
            </Button>
          </div>

          {/* Telegram Username */}
          <Input
            label="Telegram Username"
            value={formData.telegramUsername}
            onValueChange={(value) =>
              handleInputChange('telegramUsername', value)
            }
            startContent={<AtSign height="1em" width="1em" />}
          />

          {/* First Name */}
          <Input
            label="First Name"
            value={formData.firstName}
            onValueChange={(value) => handleInputChange('firstName', value)}
            isRequired
          />

          {/* Last Name */}
          <Input
            label="Last Name"
            value={formData.lastName}
            onValueChange={(value) => handleInputChange('lastName', value)}
            isRequired
          />

          {/* Service Category */}
          <Select
            label="Service Category"
            selectedKeys={
              formData.serviceCategory ? [formData.serviceCategory] : []
            }
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              handleInputChange('serviceCategory', selectedKey);
            }}
            isRequired
          >
            {serviceCategories.map((category) => (
              <SelectItem key={category.key}>{category.label}</SelectItem>
            ))}
          </Select>

          {/* Bio */}
          <Textarea
            label="Short Bio"
            placeholder="Tell clients about your experience and specialties..."
            value={formData.bio}
            onValueChange={(value) => handleInputChange('bio', value)}
            maxRows={4}
          />
        </CardBody>
      </Card>

      <Button
        color="primary"
        size="lg"
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600"
        endContent={<ArrowRight className="w-5 h-5" />}
        onPress={handleContinue}
      >
        Continue
      </Button>
    </div>
  );
};

export default MasterOnboarding;
