import {
  Card,
  CardBody,
  Button,
  Progress,
  Snippet,
  Code,
  Avatar,
  Link,
} from '@heroui/react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import React, { useState } from 'react';

import botFatherImage from '~/assets/botFather.jpg';

const MiniappCreate: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Open BotFather',
      content: (
        <div className="text-center space-y-4">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mb-4">
            <Avatar
              radius="lg"
              src={botFatherImage}
              className="w-18 h-18 mx-auto mb-2"
            />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Open Telegram and search for{' '}
              <Link size="sm" href="https://t.me/BotFather">
                @BotFather
              </Link>
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Send the command: <Code>/newbot</Code>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Follow the instructions to create your bot
          </p>
        </div>
      ),
    },
    {
      title: 'Copy Bot Token',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            After creating your bot, BotFather will give you an API token that
            looks like:
          </p>
          <Code>123456789:ABCdefGHIjklMNOpqrsTUVwxyz</Code>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Important:</strong> Keep this token safe and don't share it
            publicly!
          </p>
        </div>
      ),
    },
    {
      title: 'Connect Mini App to Telegram',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            In BotFather, send: <Code>/mybots</Code>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Select your bot</strong> →{' '}
            <strong>Bot&nbsp;Settings</strong> →{' '}
            <strong>Configure&nbsp;Mini&nbsp;App</strong> →{' '}
            <strong>Enable&nbsp;Mini&nbsp;App</strong>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Copy and paste this URL as your Web App URL:
          </p>
          <Snippet hideSymbol className="w-full overflow-auto">
            https://miniapp.beautyton.com/masters/elena-kozlova/personal
          </Snippet>
          <p className="text-xs text-gray-500">
            This URL will be your personal beauty profile page
          </p>
        </div>
      ),
    },
    {
      title: 'Add Menu Button (Optional)',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            In BotFather, send: <Code>/mybots</Code>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Select your bot</strong> → <strong>Menu&nbsp;Button</strong>{' '}
            → <strong>Configure&nbsp;Menu&nbsp;Button</strong>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Copy and paste this URL as your Web App URL:
          </p>
          <Snippet hideSymbol className="w-full overflow-auto">
            https://miniapp.beautyton.com/masters/elena-kozlova/personal
          </Snippet>
          <p className="text-xs text-gray-500 mb-3">
            This URL will be your personal beauty profile page
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Set the button text, for example:{' '}
            <Code>My&nbsp;Beauty&nbsp;Profile</Code>
          </p>
        </div>
      ),
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate({ to: '/master/miniapp/connect' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Setup Mini App
        </h1>

        {/* Progress */}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
            <span>
              Step {currentStep + 1} of {steps.length}
            </span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <Progress
            value={((currentStep + 1) / steps.length) * 100}
            className="mb-4"
            color="primary"
          />
        </div>

        {/* Step Content */}
        <Card className="bg-background/60 dark:bg-default-100/50" isBlurred>
          <CardBody className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-300 mb-4">
              {steps[currentStep].title}
            </h2>
            {steps[currentStep].content}
          </CardBody>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        {/* Help Link */}
        <div className="text-center">
          <Button
            variant="light"
            size="sm"
            startContent={<ExternalLink className="w-4 h-4" />}
            className="text-blue-600 dark:text-blue-500"
          >
            Need help? Watch tutorial
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex space-x-3">
          {currentStep > 0 && (
            <Button
              size="lg"
              variant="flat"
              onPress={prevStep}
              // className="flex-1"
              startContent={<ArrowLeft className="w-4 h-4 " />}
            />
          )}
          <Button
            color="primary"
            size="lg"
            onPress={nextStep}
            className="flex-grow bg-gradient-to-r from-pink-500 to-purple-600"
            endContent={<ArrowRight className="w-4 h-4" />}
          >
            {currentStep === steps.length - 1
              ? "I've completed all steps"
              : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MiniappCreate;
