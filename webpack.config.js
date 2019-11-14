const babelPlugin = require('@babel/core').transform('code', {
  plugins: ['@babel/plugin-proposal-class-properties'],
});

const path = require('path');

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname);

module.exports = {
  mode: 'production',
  entry: ['@babel/polyfill', `${SRC_DIR}/app.js`],
  output: {
    path: `${DIST_DIR}/app`,
    filename: 'bundle.js',
    publicPath: '/app/',
  },
  presets: [
    '@babel/preset-env',
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: SRC_DIR,
        loaders: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env', {
              targets: { node: 'current' },
              modules: 'false',
            },
          ],

        },
      },
    ],
  },
};
