const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './main.jsx'),
  },

  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: './assets/favicon.ico',
      template: path.resolve(__dirname, './template.html'),
      filename: 'index.html',
    }),

    new MiniCssExtractPlugin(),
  ],

  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      // Forward all three imports to our exports file
      // three$: path.resolve('./three-exports.js'),
      three$: path.resolve('./threejs-exports.js'),
      Drei$: path.resolve('./drei-exports.js'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.worker\.js$/,
        use: { loader: "worker-loader" },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(gltf|.glb)$/,
        use: [
          {
            loader: 'file-loader',
            options: { esModule: false },
          },
          '@vxna/gltf-loader',
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  }
}