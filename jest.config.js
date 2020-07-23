// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!*.d.ts"
  ],
  coverageReporters: [
    "html"
  ],
  moduleNameMapper: {
    "^.+\\.(css|scss)$": "identity-obj-proxy"
  },  
  resolver: "jest-pnp-resolver",
  testMatch: [
    "<rootDir>/src/**/*.test.ts?(x)"
  ],
  testEnvironment: "jsdom",
  testURL: "http://localhost",
  transform: {
    "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$"
  ],
  testPathIgnorePatterns: [
  ],
  //testResultsProcessor: "<rootDir>/node_modules/jest-junit-reporter",
};
