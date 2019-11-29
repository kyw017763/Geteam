const path = require('path');
const nodeExternals = require('webpack-node-externals');

// warning
// eslint-disable-next-line import/no-extraneous-dependencies
const babelCore = require('@babel/core').transform('code', {
  plugins: ['@babel/plugin-proposal-class-properties'],
});

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
  },
  mode: 'development',
  entry: ['@babel/polyfill', path.join(__dirname, 'app.js')],
  output: {
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
        include: __dirname,
        loaders: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
          ],
        },
      },
    ],
  },
};
