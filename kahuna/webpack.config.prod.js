const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const shared = require('./webpack.config.shared');

module.exports = {
  entry: shared.entry,
  output: shared.output,
  module: shared.module,
  resolve: shared.resolve,
  plugins: [
    new UglifyJSPlugin(),
  ],
};
