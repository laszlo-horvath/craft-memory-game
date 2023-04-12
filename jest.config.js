module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx)?$': ['ts-jest', { isolatedModules: true }],
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^redux/(.*)$": "<rootDir>/src/redux/$1",
    "config": "<rootDir>/src/config/index.ts",
    "^lib/(.*)$": "<rootDir>/src/lib/$1",
    "^types/(.*)$": "<rootDir>/src/types/$1",
  },
}