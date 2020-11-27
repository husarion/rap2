const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './src/rap.js'),
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/assets/favicon.ico',
      template: path.resolve(__dirname, './src/template.html'),
      filename: 'index.html'
    }),

    new MiniCssExtractPlugin()
  ],

  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.gltf$/,
        use: 'gltf-webpack-loader'
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