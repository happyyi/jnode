const path = require("path");
const htmlPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const isDev = process.env.NODE_ENV === 'development';

const config = webpackMerge( baseConfig,{
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        filename: '[name].[hash].js'
    },

    plugins: [
        new htmlPlugin({
            template: path.join(__dirname, '../client/template.html')
        })
    ]
})
if (isDev) {
    config.entry = {
        app: ['react-hot-loader/patch', path.join(__dirname, '../client/app.js')]
    }
    config.devServer = {
        host: '0.0.0.0',
        port: 8888,
        hot: true,
        contentBase: path.join(__dirname, '../dist'),
        overlay: {
            errors: true
        },
        publicPath: '/public',
        historyApiFallback: {
            index: '/public/index.html'
        }
    }
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}
console.log(JSON.stringify(config))
module.exports = config;
