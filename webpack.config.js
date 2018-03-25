const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: {
    app: './src/index.js'
  },
  devServer: {
    contentBase: './dist2',
    hot: true,
    historyApiFallback: true
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist2')
  },
  plugins: [
    new CleanWebpackPlugin(['dist2'], { verbose: true, dry: false}),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
      template: path.resolve(__dirname, 'template/index.html')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};

module.exports = config;
