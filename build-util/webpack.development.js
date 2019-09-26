const webpack = require('webpack');
const path = require('path');

module.exports = () => {
  const appDir = path.normalize(path.join(__dirname, '../app'));
  console.log(`appDir: ${appDir}`);

  return {
    devtool: 'eval-source-map',
    optimization: {
      minimize: false
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
              loader: 'sass-loader' // sass loader
            }
          ]
        }
      ]
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
      open: 'Chrome',
      contentBase: appDir,
      compress: true,
      port: 8080,
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
};
