const webpackBase = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const miniExtraPlugin = require('mini-css-extract-plugin');


module.exports = Object.assign({}, webpackBase, {
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack-demo-init',
            template: path.resolve(__dirname, './client/index.html'),
            filename: 'index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new UglifyJsPlugin(), // 用来进行压缩
        new miniExtraPlugin({ // 用来抽离css文件
            filename: '[name].css',
        }),
    ],
    devServer: {
    },
});