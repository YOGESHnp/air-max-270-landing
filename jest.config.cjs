module.exports = {
  testEnvironment: 'jest-environment-jsdom', // Simulates a browser environment
  // setupFilesAfterEnv: ['@testing-library/jest-dom'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transpils JS/JSX via Babel
  },
  moduleFileExtensions: ['js', 'jsx'], // Recognizes .js and .jsx files
};
