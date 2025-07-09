import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@heroui/react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowRight, Camera } from 'lucide-react';
import React, { useState } from 'react';

const MasterOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profilePhoto: '',
    telegramUsername: '@elena_beauty',
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
      <div className="flex items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Create Your Profile
        </h1>
      </div>

      <Card className="mb-6">
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
              className="bg-gray-100"
            >
              Upload Photo
            </Button>
          </div>

          {/* Telegram Username */}
          <Input
            label="Telegram Username"
            placeholder="@your_username"
            value={formData.telegramUsername}
            onValueChange={(value) =>
              handleInputChange('telegramUsername', value)
            }
            startContent="@"
          />

          {/* First Name */}
          <Input
            label="First Name"
            placeholder="Enter your first name"
            value={formData.firstName}
            onValueChange={(value) => handleInputChange('firstName', value)}
            isRequired
          />

          {/* Last Name */}
          <Input
            label="Last Name"
            placeholder="Enter your last name"
            value={formData.lastName}
            onValueChange={(value) => handleInputChange('lastName', value)}
            isRequired
          />

          {/* Service Category */}
          <Select
            label="Service Category"
            placeholder="Select your specialty"
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
