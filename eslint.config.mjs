import { createConfigForNuxt } from '@nuxt/eslint-config/flat';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default createConfigForNuxt({
  features: {
    tooling: true,
    stylistic: {
      semi: true,
    },
  },
}).append({
  plugins: {
    'simple-import-sort': simpleImportSort,
    'rules': {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Packages `vue` related packages come first.
            ['^(vue|nuxt|#imports)'],
            ['^@?\\w'],
            // Internal packages.
            ['^(@|components)(/.*|$)'],
            // Side effect imports.
            ['^\\u0000'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ],
        },
      ],
    },
  },
});
