export default {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
      "^.+\\.ts$": "ts-jest",
    },
    moduleNameMapper: {
      "^(\\.{1,2}/.*)\\.js$": "$1",
    },
  };
  