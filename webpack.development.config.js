'use strict';

const path = require('path');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

let plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.ContextReplacementPlugin(
    new RegExp('\\' + path.sep + 'node_modules\\' + path.sep + 'moment\\' + path.sep + 'locale'),
    /en|de/
  ),
  new webpack.NoErrorsPlugin()
];

if (NODE_ENV == 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // don't show unreachable variables etc
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  );
}

module.exports = {
  entry: './src/client/components/ReactRouter.js',
  output: {
    path: path.resolve(__dirname, 'build/client'),  // with 'webpack-dev-middleware' this value is ignored.
    filename: 'bundle.js',
    chunkFilename: '[id].chunk.js'
  },

  externals: {
    'supplier': 'supplier',
    "react": "React",
    "react-dom": "ReactDOM"
  },

  devtool: NODE_ENV == 'development' ? 'eval-source-map' : null,  // 'source-map' may be set for production.

  plugins: plugins,

  resolve: {
    modules: ['node_modules'],
    extensions: ['.json', '.jsx', '.js']
  },

  resolveLoader: {
    modules: ['node_modules'],
    extensions: ['.js']
  },

  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src')
        ],
        options: {
          compact: false,
          babelrc: false,
          presets: [
            ['es2015', {modules: false}],
            'react',
            'stage-0'
          ]
        }
      }
    ]
  }
};
