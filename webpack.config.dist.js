var config = require('./webpack.config');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

config.plugins.push(new UglifyJSPlugin());

module.exports = config;
