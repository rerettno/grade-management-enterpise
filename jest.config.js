module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: [
    "**/tests/unit/**/*.(test|spec).(ts|tsx|js)", // cari test di tests/unit
  ],
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/out/"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/components/**/*.{ts,tsx}",
    "src/stores/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
};
