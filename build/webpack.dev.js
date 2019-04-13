const webpack = require('webpack');
const path = require('path');
const webpackBase = require('./webpack.base');
const merge = require('webpack-merge');

// 分离css文件需要注意：MiniCssExtractPlugin这个不能和style-loader同用，因为后者是把css通过内联放到html里面

// webpack 插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
// 将node_modules中的文件不打入包中，保留为require()引入
const nodeExternals = require('webpack-node-externals');

module.exports = [
    merge(webpackBase, {
        entry: [
            'webpack-hot-middleware/client',
            path.resolve(__dirname, '../client/containers/index.js'),
        ],
        output: {
            filename: 'index.js',
            publicPath: './output', // 相当于是各种资源的前缀
            path: path.resolve(__dirname, '../output/client'),
        },
        target: 'web',
        plugins: [
            new CleanWebpackPlugin([path.resolve(__dirname, '../output')]),
            new HtmlWebpackPlugin({
                title: 'webpack-demo-init',
                template: path.resolve(__dirname, '../client/static/index.html'),
                filename: 'index.html',
            }),
            // new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process.env.TARGET': JSON.stringify('browser'),
            }),
            new MiniCssExtractPlugin(),
            new LoadablePlugin(),
        ],
    }),
    merge(webpackBase, {
        entry: path.resolve(__dirname, '../client/containers/index.js'),
        output: {
            filename: 'server.js',
            publicPath: './output',
            path: path.resolve(__dirname, '../output/server'),
            // 如果不加这个，不是输出commonJs规范，会出问题
            libraryTarget: 'commonjs2', // 打包成commonjs2规范
        },
        target: 'node',
        externals: [nodeExternals()], // 不绑定node模块，保留为 require()
        plugins: [
            new MiniCssExtractPlugin(),
        ],
    }),
];