const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

let merged_config = common;

let targetRule = merged_config.module.rules[1];
let targetRegex = /\.scss$/;
if (targetRule.test.toString() !== targetRegex.toString()) {
  targetRule = merged_config.module.rules.find(element => element.test.toString() === targetRegex.toString());
}

let targetLoader = targetRule.use[1];
if (targetLoader.loader !== "css-loader") {
  targetLoader = targetRule.use.find(element => element.loader === "css-loader");
}

targetLoader.options.modules.localIdentName = "[hash:base64]";
module.exports = merged_config;
