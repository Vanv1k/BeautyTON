import eslint from '@eslint/js';
import import_ from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '**/dist',
      '**/build',
      '**/public',
      '**/*.cjs',
      '**/sitemap',
      '**/node_modules',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    files: ['src/**/*.tsx'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-useless-empty-export': 'error',
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
      '@typescript-eslint/non-nullable-type-assertion-style': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/unbound-method': 'off',
    },
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['packages/*/vite.config.ts'],
    languageOptions: {
      parserOptions: {
        project: ['./packages/*/tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: { prettier, import: import_, react, 'react-hooks': reactHooks },
    settings: {
      react: {
        version: 'detect', // Автоматическое определение версии React
      },
    },
    rules: {
      'eol-last': ['error', 'always'],
      'prettier/prettier': 'error',
      'no-console': 'error',
      'import/no-cycle': [
        'error',
        {
          maxDepth: '∞',
        },
      ],
      'linebreak-style': ['error', 'unix'],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'object',
            'parent',
            'sibling',
            'index',
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          alphabetize: {
            order: 'asc',
          },
          'newlines-between': 'always',
        },
      ],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'export',
        },
      ],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off', // Отключить необходимость в prop-types для TypeScript
      'react/display-name': 'off', // Не требует указания displayName для компонентов
      'react/no-unknown-property': 'error', // Запрещает использование неизвестных атрибутов
      'react/self-closing-comp': 'error', // Предпочтение самозакрывающихся тегов
      'react-hooks/rules-of-hooks': 'error', // Проверяет правила хуков
      'react-hooks/exhaustive-deps': 'warn', // Проверяет зависимости в useEffect и других хуках
    },
  },
);
