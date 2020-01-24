const path = require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

module.exports = {
  entry: { 
    index: ['./src/index.js'],
    style: ['./src/styles/main.scss'],
    light_theme: ['./src/styles/light_theme.scss']
 },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
  output: {
    path: path.resolve(__dirname, "wp-content/themes/dl2020"),
    filename: "[name].js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          { loader: "css-loader" },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        mainStyles: {
          name: 'style',
          test: (m, c, entry = 'style') => m.type === 'css-loader',
          chunks: 'all',
          enforce: true,
        },
        lightStyles: {
          name: 'light_theme',
          test: (m, c, entry = 'light_theme') => m.type === 'css-loader',
          chunks: 'all',
          enforce: true,
        }
      }
    }
  }
}