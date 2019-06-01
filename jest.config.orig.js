module.exports = {
  verbose: true,
  setupFiles: ['<rootDir>/test/test-shim.js', '<rootDir>/test/test-setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': '<rootDir>/test/test-preprocessor.js'
  },
  testMatch: ['**/__tests__/*.(ts|tsx|js)']
};
