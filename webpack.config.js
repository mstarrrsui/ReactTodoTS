var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;



var config = {
    mode: process.env.NODE_ENV === 'production' ? "production" : "development",
    entry: './app/index.js',
    optimization: {
        minimize: false,
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
          { test: /\.(js)$/, exclude: /node_modules/, use: 'babel-loader' },
          //for css not in components dir use the normal css loader (non modules)
          { test: /\.css$/, include: path.resolve(__dirname, 'app/components'),  use: [ 'style-loader', 'css-loader' ]},
          //use css loader in module mode for component scoped CSS
          {
            test: /\.css$/,
            include: path.resolve(__dirname, 'app/components'),
            use: [
                {
                   loader: 'style-loader',
                },
                {
                   loader: 'css-loader',
                   options: {
                      sourceMap: true,
                      modules: true,
                      localIdentName: '[local]___[hash:base64:5]'
                     }
                }
            ]
          },
          { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
          { test: /\.(ttf|eot|otf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: 'app/index.html'
        })
    ],
    devServer: {
        quiet: false,
        noInfo: false,
        historyApiFallback: true,
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

// if (process.env.NODE_ENV === 'production') {
//     config.plugins.push(
//         new webpack.DefinePlugin({
//             'process.env': {
//                 'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
//             }
//         }),
//         new webpack.optimize.UglifyJsPlugin()
//     );
// }

if (process.env.NODE_ENV === 'visualize') {
    config.plugins.push(
        new BundleAnalyzerPlugin()
    );
}

module.exports = config;