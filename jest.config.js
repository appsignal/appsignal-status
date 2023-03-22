module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFiles: ["<rootDir>/setupTests.js"],
  setupFilesAfterEnv: ["<rootDir>/setupTestsAfterEnv.js"],
  globalSetup: "<rootDir>/jest.global-setup.js",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "react-markdown":
      "<rootDir>/node_modules/react-markdown/react-markdown.min.js",
  },
};
