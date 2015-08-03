var path = require('path')
var webpack = require('webpack')

module.exports = function (options) {
  // Initialize conf.
  var conf = {
    cache: true,
    context: path.resolve(__dirname, '..', 'src'),
    entry: {
      app: [
        './app'
      ],
      vendors: [
        'babel/polyfill',
        'alt',
        'giant-quadtree',
        'lodash',
        'immutable',
        'pure-render-decorator',
        'react',
        'react-hot-loader',
        'react-immutable-proptypes',
        'react-router'
      ]
    },
    output: {
      path: path.resolve(__dirname, '..', 'build'),
      filename: 'app.js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [
        { test: /\.js?$/, loaders: ['react-hot', 'babel?stage=0&optional[]=runtime'], exclude: [/node_modules/] }
      ]
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ]
  }

  // Set root.
  conf.root = conf.output.path

  // Production.
  if (options.production) {
    conf.plugins = conf.plugins.concat(
      new webpack.DefinePlugin({
        'process.env': {
          'BROWSER': JSON.stringify(true),
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(true),
      new webpack.optimize.UglifyJsPlugin()
    )
  }

  // Development.
  if (options.dev) {
    conf.devtool = 'sourcemap'
    conf.debug = true
    conf.plugins = conf.plugins.concat([
      new webpack.DefinePlugin({
        'process.env': {
          'BROWSER': JSON.stringify(true),
          'NODE_ENV': JSON.stringify('development')
        }
      })
    ])
  }

  // Development Sever.
  if (options.devserver) {
    conf.devServer = {
      hot: true
    }
    conf.devtool = 'sourcemap'
    conf.debug = true
    conf.entry.app = conf.entry.app.concat([
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080/'
    ])
    conf.plugins = conf.plugins.concat([
      new webpack.DefinePlugin({
        'process.env': {
          'BROWSER': JSON.stringify(true),
          'NODE_ENV': JSON.stringify('development')
        }
      }),
      new webpack.HotModuleReplacementPlugin()
    ])
  }

  return conf
}
