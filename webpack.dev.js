const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  devServer: {
    contentBase: "./dist",
    watchContentBase: true,
    headers: {
      "Content-Security-Policy": "style-src 'nonce-test1'"
    }
  }
});
