const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "@components/(.*)$": "<rootDir>/src/components/$1",
    "@pages/(.*)$": "<rootDir>/src/pages/$1",
    "@contexts/(.*)$": "<rootDir>/src/contexts/$1",
    "@services/(.*)$": "<rootDir>/src/services/$1",
    "@utils/(.*)$": "<rootDir>/src/utils/$1",
    "@libs/(.*)$": "<rootDir>/src/libs/$1",
    "@hooks/(.*)$": "<rootDir>/src/hooks/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  modulePathIgnorePatterns: ["cypress"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
