module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/*.spec.js'],
  testPathIgnorePatterns: ['tests/e2e'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
};
