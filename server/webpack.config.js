'use strict';

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DotEnvPlugin = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const envConfig = mode => require(`./build-util/webpack.${mode}.js`)();

//
// common config setting are in this file.
// uses webpack-merge to also merge in either a dev or production config file based on
// the env.mode value passed in from the npm script task
//
//    dev config adds hot module replacement and the ForkTS plugin to do TypeScript linting on a worker thread
//    prod config adds css extraction, minification and service-worker generation
//

module.exports = () => {
  let config = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
      polyfills: './app/polyfills.ts',
      index: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './app/index.tsx']
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    optimization: {
      minimize: false,
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2
          },
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true
          }
        }
      }
    },
    performance: {
      hints: false
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].js',
      publicPath: ''
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            //
            // use transpileOnly mode to speed-up compilation; type checking is done in
            // a separate process using the ForkTsCheckerWebpackPlugin
            //
            transpileOnly: true
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader' //sass loader
            }
          ]
        },
        {
          test: /bootstrap\/dist\/js\/umd\//,
          use: 'imports-loader?jQuery=jquery'
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.(ttf|eot|otf|svg|jpe?g|png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
      ]
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
        title: 'React Starter App',
        template: 'app/index.html'
      }),
      new DotEnvPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
        Button: 'exports-loader?Button!bootstrap/js/dist/button',
        Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
        Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
        Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
        Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
        Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
        Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
        Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
        Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip',
        Util: 'exports-loader?Util!bootstrap/js/dist/util'
      })
    ]
  };

  return config;
};
