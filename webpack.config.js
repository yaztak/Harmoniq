const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/audio-player.js',
  output: {
    filename: 'js/audio-player.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  // Add other webpack configuration options as needed.
  devtool: 'source-map',
};
