/**
 * Created by admin on 2018/3/6.
 */
const path = require("path");
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = webpackMerge(baseConfig,{
    target: 'node',
    entry: {
        'server-entry': path.join(__dirname, '../client/server-entry.js')
    },
    output: {
        filename: 'server-entry.js',
        libraryTarget: "commonjs2"
    }
})
