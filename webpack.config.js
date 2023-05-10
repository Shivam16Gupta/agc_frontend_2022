const path = require('path')
const webpack = require('webpack'),
  CopyPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = getConfiguration

function getConfiguration(env, webpackObject) {
  var config = require('./config/' + env)
  var outFilePath = __dirname + '/public'
  var pluginsUsed = [
    new CopyPlugin({
      patterns: [
        { from: __dirname + '/public', to: __dirname + '/build/' + env },
      ],
    }),
  ]
  var optimize = {}

  if (webpackObject.mode === 'production') {
    outFilePath = __dirname + '/build/' + env
    pluginsUsed.push(
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: env.toUpperCase(),
        template: __dirname + '/public/index.html',
        filename: 'index.html',
        inject: true,
        minify: false,
      }),
      new webpack.optimize.OccurrenceOrderPlugin(true),
      new webpack.DefinePlugin({
        __ENV__: JSON.stringify(webpackObject.mode || 'development'),
      }),
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      })
    )

    optimize = {
      minimize: true,
      moduleIds: 'total-size',
      runtimeChunk: 'single',
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    }
  }

  function getConfigOutput() {
    var outObject = {
      devtool: false,
      entry: {
        abundle: './src/index.js',
      },
      output: {
        filename:
          webpackObject.mode === 'production'
            ? `${config.APP_VERSION}_[name].[contenthash].js`
            : '[name].js',
        path: outFilePath,
      },
      performance: {
        hints: false,
      },
      plugins: pluginsUsed,
      optimization: optimize,
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              'style-loader',
              // Translates CSS into CommonJS
              'css-loader',
              // Compiles Sass to CSS
              'sass-loader',
            ],
          },
          {
            test: /.\.css$/i,
            use: [
              'style-loader',
              // Translates CSS into CommonJS
              'css-loader',
              // Compiles Sass to CSS
              'sass-loader',
            ],
          },

          {
            test: /\.(png|jpg|jpeg|woff|woff2|otf|gif|eot|ttf|svg)$/,
            use: ['url-loader?limit=100000'],
          },
        ],
      },
      resolve: {
        modules: [
          path.resolve(__dirname + '/src'),
          path.join(__dirname, 'src', 'js'),
          'node_modules',
        ],
        alias: {
          myconfig: path.join(__dirname, 'config', env),
        },
      },
      node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
      },
      devServer: {
        contentBase: [
          path.join(__dirname, 'public'),
          path.join(__dirname, 'logos'),
          path.join(__dirname, `src/website/${env}/`),
        ],
        port: 3000,
        host: '127.0.0.1',
        hot: true,
      },
    }
    return outObject
  }

  var finalOut = []
  if (webpackObject.mode === 'production') {
    finalOut.push(getConfigOutput())
    //outFilePath = path.resolve(__dirname, appPath)
    //var data = getConfigOutput()
    //finalOut.push(data)
  } else {
    finalOut.push(getConfigOutput())
    // var data = getConfigOutput()
    // data.output.path = path.resolve(__dirname, appPath)
    // finalOut.push(data)
  }

  return finalOut
}
