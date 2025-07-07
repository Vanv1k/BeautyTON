//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config';

export default [
  ...tanstackConfig,
  {
    files: ['src/**/*.d.ts'],
    rules: {
      // Разрешить неиспользуемые переменные в файлах объявлений типов
      '@typescript-eslint/no-unused-vars': 'off',
      // Отключить правила, которые обычно не нужны в файлах объявлений типов
      '@typescript-eslint/no-empty-interface': 'off',
      'import/no-default-export': 'off',
    },
  },
];
