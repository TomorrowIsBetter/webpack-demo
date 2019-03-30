const webpackBaseFile = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');


const webpackBase = Object.assign({}, webpackBaseFile);
delete webpackBase.devServer;
delete webpackBase.mode;
delete webpackBase.HtmlWebpackPlugin;
delete webpackBase.plugins;
delete webpackBase.entry;


module.exports = Object.assign({}, webpackBase, {
    entry: path.resolve(__dirname, './client/containers/index.js'),
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack-demo-init',
            template: path.resolve(__dirname, './client/static/index.html'),
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
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify('production'), // 指定React环境为服务端
        }),
        new LoadablePlugin(),
    ],
    devtool: 'cheap-module-source-map',
    mode: 'production',
});