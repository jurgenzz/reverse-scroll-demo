var path = require('path');

module.exports = {
  entry: './public/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/build')
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["babel-loader"] }
      ]
  }
}



