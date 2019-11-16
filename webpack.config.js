const path = require('path');

// warning
require('@babel/core').transform('code', {
  plugins: ['@babel/plugin-proposal-class-properties'],
});

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname);
module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000
  },
  mode: 'development',
  entry: ['@babel/polyfill', `${SRC_DIR}/app.js`],
  output: {
    publicPath: '/assets/',
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  node: {
    child_process: 'empty',
    dns: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: SRC_DIR,
        loaders: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
          ],
          // eslint-disable-next-line global-require
          plugins: [require('@babel/plugin-proposal-class-properties')],
        },
      },
    ],
  },
};
