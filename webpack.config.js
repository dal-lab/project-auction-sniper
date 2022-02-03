/* eslint-disable @typescript-eslint/no-var-requires */

const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/app.tsx',
  output: {
    path: __dirname + '/public',
    filename: 'build/app.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
  plugins: [
    new Dotenv(),
  ],
};
