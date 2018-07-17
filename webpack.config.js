const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const MODE = 'development';

module.exports = [
  {
    mode: 'development',
    entry: path.join(__dirname, 'src/ts/app.tsx'),
    output: {
      path: path.join(__dirname, 'www'),
      filename: 'js/app.js'
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {loader: 'ts-loader'}
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html'
      }),
      new CopyWebpackPlugin([
        { context: './static/', from: '**/*'}
      ])
    ]
  },
  {
    mode: 'development',
    entry: path.join(__dirname, 'src/scss/main.scss'),
    output: {
      path: path.join(__dirname, 'www/css'),
      filename: 'main.css'
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.sass', '.css']
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use:[
              {
                loader: 'css-loader',
                options: {
                  url: false,
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].css')
    ]
  },
];
module.exports.serve = {
  content: [path.resolve(__dirname, 'www')],
  config: {
  },
  open: true
};
