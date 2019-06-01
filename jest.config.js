module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  setupFiles: ['<rootDir>/test/test-shim.js', '<rootDir>/test/test-setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['**/__tests__/*.(ts|tsx|js)']
};
