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
  devServer: {
    contentBase: "./dist",
    watchContentBase: true,
    headers: {
      "Content-Security-Policy": "style-src 'nonce-test1'"
    }
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
          {
            loader: "style-loader",
            options: { 
              attributes: {
                id: "ms-consent-banner-main-styles",
                nonce: "q1dKEaB2445gM4C39XQmM" 
              } 
            }
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                exportGlobals: true,
                localIdentName: "[path][name]__[local]--[hash:base64:5]"  // use '[hash:base64]' for production
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