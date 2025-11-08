export const verbose = true;
export const silent = false;
export const preset = 'ts-jest';
export const testEnvironment = 'node';
export const transform = {
  '^.+\\.tsx?$': 'ts-jest',
};
export const testMatch = [
  '**/tests/**/*.test.ts',
  '**/__tests__/**/*.test.ts'
];
export const moduleFileExtensions = ['ts', 'js', 'json'];
export const collectCoverageFrom = [
  'app/**/*.ts',
  '!app/**/*.d.ts',
];