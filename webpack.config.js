const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const darkThemeVars = require('antd/dist/dark-theme')
const packages = require('./package.json')

const devMode = process.env.NODE_ENV !== 'production'

/* eslint-disable max-len */
module.exports = [
  {
    name: 'vendor',
    // mode: "development || "production",
    mode: 'production',
    entry: {
      lib: ['react', 'react-dom'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'vendor.js',
      library: 'vendor_[hash]',
    },
    plugins: [
      new webpack.DllPlugin({
        name: 'vendor_[hash]',
        path: path.resolve(__dirname, 'dist/manifest.json'),
      }),
    ],
  },
  {
    name: 'app',
    mode: devMode ? 'development' : 'production',
    dependencies: ['vendor'],
    devtool: devMode ? 'cheap-module-eval-source-map' : 'hidden-source-map',
    devServer: {
      contentBase: './dist',
      hot: true,
    },
    entry: {
      app: './src/index.tsx',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].[hash].js',
      publicPath: '/',
      chunkFilename: '[name].bundle.js',
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: false,
        chunks: ['app'],
        jsassets: [`/vendor.js`],
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[hash].css',
      }),
      new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, 'dist/manifest.json'),
      }),
    ],

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: {
                        chrome: '58',
                        ie: '11',
                      },
                    },
                  ],
                ],
                plugins: [
                  [
                    'import',
                    {
                      libraryName: 'antd',
                      libraryDirectory: 'es',
                      style: true,
                    },
                  ],
                ],
              },
            },
            {
              loader: 'ts-loader',
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/img/[name].[ext]',
            },
          },
        },
        {
          test: /\.css/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 1,
                modules: {
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                },
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader', // translates CSS into CommonJS
            },
            {
              loader: 'less-loader', // compiles Less to CSS
              options: {
                modifyVars: {
                  // 'primary-color': '#1DA57A',
                  // 'link-color': '#1DA57A',
                  // 'border-radius-base': '2px',
                  // hack: `true; @import "your-less-file-path.less";`, // Override with less file
                  hack: `true;@import "${require.resolve(
                    'antd/lib/style/color/colorPalette.less'
                  )}";`,
                  ...darkThemeVars,
                },
                javascriptEnabled: true,
              },
            },
          ],
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/fonts/[name].[ext]',
            },
          },
        },
      ],
    },
  },
]
