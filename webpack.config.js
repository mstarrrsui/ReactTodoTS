'use strict';

var path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');



var config = {
    mode: process.env.NODE_ENV === 'production' ? "production" : "development",
    devtool: process.env.NODE_ENV === 'production' ? "" : "eval-source-map",
    entry: './app/index.tsx',
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
    optimization: {
        minimize: process.env.NODE_ENV === 'production' ? true : false,
        splitChunks: {
          cacheGroups: {
            commons: {
              chunks: "initial",
              minChunks: 2
            },
            vendor: {
              test: /node_modules/,
              chunks: "initial",
              name: "vendor",
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
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        publicPath: '/'
    },
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
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
              devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
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
            test: /bootstrap\/dist\/js\/umd\//, use: 'imports-loader?jQuery=jquery'
          },
        //   {
        //       test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        //       loader: "url-loader?limit=10000&mimetype=application/font-woff"
        //   },
          {
              test: /\.(woff(2)?|ttf|eot|otf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: "file-loader",
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
            }
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
              'file-loader?name=images/[name].[ext]',
              //'image-webpack-loader?bypassOnDebug'
            ]
          }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: 'app/index.html'
        }),
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
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Util: 'exports-loader?Util!bootstrap/js/dist/util'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin()
    ],
    devServer: {
        quiet: false,
        noInfo: false,
        historyApiFallback: true,
        hot: true,
        stats: {
            // Config for minimal console.log mess.
            assets: true,
            colors: true,
            version: true,
            hash: true,
            timings: true,
            chunks: false,
            chunkModules: false
          }
    }
};


if (process.env.NODE_ENV === 'visualize') {
    config.plugins.push(
        new BundleAnalyzerPlugin()
    );
}

module.exports = config;