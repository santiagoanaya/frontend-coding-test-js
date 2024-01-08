const path = require('path')
module.exports = {
  moduleFileExtensions: ['js', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: ['**/tests/unit/**/*.spec.js'],
  moduleNameMapper: {
    '^@/(.*)$': path.join(__dirname, './src/$1'),
    // this was for a @ alias problem
  },
}
