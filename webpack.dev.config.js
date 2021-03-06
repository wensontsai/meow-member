'use strict';

var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.base.config.js');
var update = require('react/lib/update');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

var ExportFilesWebpackPlugin = require('export-files-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

if (process.env.NODE_ENV !== 'test') {
  config = update(config, {
    entry: {
      $set: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/dev-server',
        './client/entry'
      ]
    }
  });
}

config = update(config, {
  debug: { $set: true },
  profile: { $set: true },
  // devtool: { $set: 'eval-source-map' },
  devtool: { $set: 'cheap-source-map' },

  output: {
    $set: {
      path: path.join(process.cwd(), '/dev/static/scripts'),
      pathInfo: true,
      publicPath: 'http://localhost:3000/static/scripts/', // where you want Webpack to make requests //
      filename: 'main.js'
    }
  },

  plugins: {
    $push: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        filename: 'dev/index.html',
        template: 'client/views/index.tpl'
      }),
      new ExportFilesWebpackPlugin('dev/index.html')
    ]
  },

  module: {
    loaders: {
      $push: [
        {
          test: /\.jsx?$/,
          loaders: [ 'babel' ],
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          loaders: [
              'style',
              'css',
              'autoprefixer?browsers=last 3 versions',
              'sass?outputStyle=expanded'
          ]
        },
        {
          test: /\.m4a$/,
          loader: 'file?name=[name].[ext]',
        },
        {
          test: /\.(gif|jpg)$/,
          loader: 'url-loader?limit=20000&name=[name].[ext]'
        },
      ]
    }
  },

  devServer: {
    $set: {
      publicPath: '/static/scripts/',

      port: 3000,

      contentBase: './dev',

      inline: true,

      hot: true,

      stats: {
        colors: true
      },

      historyApiFallback: true,

      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3001',
        'Access-Control-Allow-Headers': 'X-Requested-With'
      },

      proxy: {
        '/api/*': 'http://localhost:3001'
      }
    }
  }
});

module.exports = config;
