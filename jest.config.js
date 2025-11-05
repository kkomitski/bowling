/** @type {import('jest').Config} */

const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFiles: ['<rootDir>/test/config/setup-file.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/config/setup-files-after-env.ts'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: true,
};

export default config;
