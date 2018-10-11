'use strict';

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {InjectManifest} = require('workbox-webpack-plugin');


module.exports = () => {

  return {
    devtool: "",
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/
          },
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              MiniCssExtractPlugin.loader,
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
        ]
    },
    plugins: [
        new InjectManifest({
          swSrc: 'app/mySW.js',
          swDest: 'service-worker.js'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        })
    ]
  }
};
