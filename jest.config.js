export default {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'libs/**/*.js',
    '!libs/**/*.test.js',
    '!libs/**/*.spec.js',
    '!libs/**/*.helpers.js'
  ],
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],
  transform: {}
};
