module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coveragePathIgnorePatterns: ['index.ts', 'protocols.ts'],
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb'
}
