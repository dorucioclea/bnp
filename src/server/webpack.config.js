const path = require('path');

module.exports = {
  entry: './src/client/components/ReactRouter.js',
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    modules: [process.env.NODE_PATH, 'node_modules']
  },
  resolveLoader: {
    modules: [process.env.NODE_PATH, 'node_modules']
  },
  externals: {
    'supplier': 'supplier'
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        include: [path.resolve(__dirname + '/../client')],
        exclude: process.env.NODE_PATH,
        loader: "eslint-loader",
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname + '/../client')],
        exclude: process.env.NODE_PATH,
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: ['transform-object-assign', 'transform-decorators-legacy']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      },
      {
        include: /\.json$/,
        loaders: ['json-loader']
      }
    ]
  },
}
