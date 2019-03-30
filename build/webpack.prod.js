const path = require('path');
const webpack = require('webpack');
const webpackBase = require('./webpack.base');
const webpackMerge = require('webpack-merge');

// webpack 插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 将node_modules中的文件不打入包中，保留为require()引入
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
        plugins: [
            new MiniCssExtractPlugin(),
            new webpack.DefinePlugin({
                'process.env.BABEL_ENV': JSON.stringify('web'),
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
            new webpack.DefinePlugin({
                'process.env.BABEL_ENV': JSON.stringify('node'),
            }),
        ],
        externals: [
            nodeExternals(),
        ],
        optimization,
    }),
];
