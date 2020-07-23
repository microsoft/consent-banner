const webpack = require("webpack");
const path = require("path");

const config = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "consent-banner.js",
    libraryTarget: 'umd',
    library: 'ConsentControl'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          {
            loader: "postcss-loader", options: {
              ident: "postcss",
              plugins: () => [
                postcssPresetEnv({
                  autoprefixer: {
                    flexbox: "no-2009",
                  },
                  stage: 2,
                })
              ]
            }
          }
        ],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                exportGlobals: true,
                localIdentName: "[hash:base64]"
              }
            }
          },
          {
            loader: "postcss-loader", options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-preset-env")({
                  autoprefixer: {
                    flexbox: "no-2009",
                  },
                  stage: 2
                })
              ]
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.ts(x)?$/,
        exclude: /node_modules/,
        use: [
          "awesome-typescript-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      ".ts",
      ".js"
    ]
  },
  devServer: {
    contentBase: "./dist",
    watchContentBase: true
  }
};

module.exports = config;