const path = require('path');
const webpack = require('webpack');
const webpackBase = require('./webpack.base');
const webpackMerge = require('webpack-merge');

// webpack 插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 将node_modules中的文件不打入包中，保留为require()引入
const LoadablePlugin = require('@loadable/webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');


const optimization = {
    splitChunks: {
        chunks: 'all',
    },
    minimizer: [
        new UglifyJsPlugin({
            cache: true,
        }),
    ],
};

module.exports = [
    webpackMerge(webpackBase, {
        entry: path.resolve(__dirname, '../client/containers/index.js'),
        output: {
            filename: 'index.js',
            publicPath: './output',
            path: path.resolve(__dirname, '../output/client'),
        },
        mode: 'production',
        plugins: [
            new MiniCssExtractPlugin(),
            new LoadablePlugin(),
            new webpack.DefinePlugin({
                'process.env.TARGET': JSON.stringify('browser'),
            }),
            new HtmlWebpackPlugin({
                title: 'webpack-demo-init',
                template: path.resolve(__dirname, '../client/static/index.html'),
                filename: 'index.html',
            }),
        ],
        optimization,
    }),
    webpackMerge(webpackBase, {
        entry: path.resolve(__dirname, '../client/containers/index.js'),
        output: {
            filename: 'server.js',
            publicPath: './output',
            path: path.resolve(__dirname, '../output/server'),
        },
        plugins: [
            new MiniCssExtractPlugin(),
        ],
        mode: 'production',
        externals: [nodeExternals()],
        optimization,
    }),
];
