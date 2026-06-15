import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import tsPlugin from '@typescript-eslint/eslint-plugin';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),

  /* 파일 및 폴더 명명 규칙 (eslint-plugin-unicorn */
  {
    plugins: {
      unicorn: eslintPluginUnicorn,
    },
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          checkDirectories: true,
        },
      ],
    },
  },
  {
    files: ['**/components/**/*.{jsx,tsx}', '**/pages/**/*.{jsx,tsx}'],
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'pascalCase',
          checkDirectories: false,
        },
      ],
    },
  },
  {
    files: [
      '**/hooks/**/*.ts',
      '**/hooks/**/*.tsx',
      '**/use*.ts',
      '**/use*.tsx',
    ],
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'camelCase',
          checkDirectories: false,
        },
      ],
    },
  },

  /* 코드 내부 변수/상수 명명 규칙 */
  {
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase'],
        },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['UPPER_CASE', 'camelCase', 'PascalCase'],
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
      ],
    },
  },
]);

export default eslintConfig;
