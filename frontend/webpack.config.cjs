const webpack = require("webpack");
const path = require("path");
//const { fileURLToPath } = require('url');
//const { dirname, default: path } = require('path');
//const filename = fileURLToPath(path.resolve());
//const __dirName = dirname(filename);
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require("dotenv");

dotenv.config({path: "./.env"})
module.exports = {
  entry: [
    './src/index.js'
  ],
  mode: "development",
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    noParse: /^\/node_modules\/process\//,
     rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react', '@babel/preset-env'],
              },
            },
          },
        ],
      },
    /*use: [{
      
        loader: 'babel-loader',

        query: {
           presets: ['es2015', 'react']
        }
       loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
        },
        loader: 'eslint-loader',
          options: {
            fix: true, // Automatically fix linting errors if possible
            },
        },
    ],
  }*/
 plugins: [
    new ESLintPlugin({
    files: ['src/**/*.js', 'src/**/*.jsx'],
    }),
    new HtmlWebpackPlugin({
    template: './public/index.html', // Your HTML template
   }),
   new webpack.ProvidePlugin({
    process: "process/browser",
   }),
   new webpack.DefinePlugin({
    "process.env": JSON.stringify(dotenv.parse), 
   }),

],
devtool: "eval-source-map",
  resolve: {
    fallback: { 'process/browser': require.resolve('process/browser'), 
      path: false,
      os: false,
      crypto: false  
    },
    extensions: ['', '.js', '.jsx'],
  },
  devServer: {
    proxy: [{
        context: ['/api'],
        target: 'http://localhost:5000',
        router: 'localhost:5000/api',  // This path will be proxied
        changeOrigin: true,
        secure: false, // Set to true if your backend uses valid SSL
    }],
    historyApiFallback: true,
    static: './'
  },
  node: {
    global: false
  }
}
