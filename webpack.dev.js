const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'development',

  devtool: 'inline-source-map',

  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    contentBase: './dist',
    watchOptions: {
      ignored: /node_modules/
    }
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ],

});