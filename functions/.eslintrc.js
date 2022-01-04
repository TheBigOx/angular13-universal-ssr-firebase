module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
    '/tests/**/*',
    '/dist/**/*',
    '/cp-angular.js',
  ],
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'indent': ['off', 2],
    'quotes': ['error', 'single'],
    'linebreak-style': 0, // ['error', 'windows'],
    'object-curly-spacing': [2, 'always'],
    'max-len': [2, { 'code': 120, 'tabWidth': 2, 'ignoreUrls': true, 'ignoreComments': true }],
    'no-trailing-spaces': ['error', {
      'skipBlankLines': true, 'ignoreComments': true,
    }],
  },
};
