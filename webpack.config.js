const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  output: {
    filename: 'bundle.js'
  },
  plugins: [new UglifyJSPlugin()]
}
