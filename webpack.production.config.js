const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
  entry: './src/client/components/ReactRouter.js',
  output: {
    path: path.resolve(__dirname, 'build/client'),
    filename: "bundle.[chunkhash].js",
    chunkFilename: '[id].chunk.[chunkhash].js'
  },

  externals: {
    'supplier': 'supplier',
    "react": "React",
    "react-dom": "ReactDOM"
  },

  // exclude empty dependencies, require for Joi
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),

    new webpack.ContextReplacementPlugin(
      new RegExp('\\' + path.sep + 'node_modules\\' + path.sep + 'moment\\' + path.sep + 'locale'),
      /en|de/
    ),

    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        drop_console: true,
        unsafe: true,
        pure_getters: true,
        dead_code: true,
        unsafe_comps: true,
        screw_ie8: true
      }
    }),

    // new webpack.optimize.DedupePlugin(),  // TODO: uncomment when webpack 2 goes stable.
    new webpack.PrefetchPlugin('react-dom/server.js'),

    new ExtractTextPlugin({
      filename: 'main.css'
    }),

    new AssetsPlugin({ filename: 'assets.json', path: path.resolve(__dirname, 'build/client') }),

    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest"
    }),

    new WebpackMd5Hash()
  ],

  resolve: {
    modules: [process.env.NODE_PATH, 'node_modules'],
    extensions: ['.json', '.jsx', '.js']
  },

  resolveLoader: {
    modules: [process.env.NODE_PATH, 'node_modules'],
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
