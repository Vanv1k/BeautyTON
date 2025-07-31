import { Button } from '@heroui/react';
import { memo } from 'react';

import { useNavbar } from '../lib/useNavbar';

type BottomNavbarProps = {
  userRole: 'user' | 'master';
};

const BottomNavbar: React.FC<BottomNavbarProps> = ({ userRole }) => {
  const { navItems, handleNavigation, isActive } = useNavbar(userRole);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50">
      <div className="px-2 py-1">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            const isSpecialButton = item.isSpecial;

            if (isSpecialButton) {
              return (
                <div key={item.key} className="relative">
                  <Button
                    isIconOnly
                    size="lg"
                    onPress={() => handleNavigation(item.path)}
                    className={`w-14 h-14 rounded-full transition-all duration-300 transform shadow-lg hover:shadow-xl hover:scale-110 ${
                      item.key === 'spark'
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                    }`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </Button>
                </div>
              );
            }

            return (
              <Button
                key={item.key}
                variant="light"
                size="sm"
                onPress={() => handleNavigation(item.path)}
                className={`flex flex-col items-center justify-center h-16 w-16 rounded-xl transition-all duration-200 ${
                  active
                    ? 'text-pink-600 dark:text-pink-400 bg-pink-50/50 dark:bg-pink-900/20'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                <Icon
                  className={`w-5 h-5 mb-1 transition-all duration-200 ${
                    active ? 'transform scale-110' : ''
                  }`}
                />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(BottomNavbar);
