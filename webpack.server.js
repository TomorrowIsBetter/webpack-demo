const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

// 分离css文件需要注意：MiniCssExtractPlugin这个不能和style-loader同用，因为后者是把css通过内联放到html里面

module.exports = {
    entry: path.resolve(__dirname, './client/containers/index.js'),
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, './output'),
        filename: 'server.js',
        // 之前一直有问题，是这里，node要对应成require
        libraryTarget: 'commonjs2', // 打包成commonjs2规范
    },
    module: {
        rules: [
            { test: /\.jsx$|\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
            { test: /\.css$|.less$/, exclude: /node_modules/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin({
            'process.env.TARGET': JSON.stringify('node'), // 指定React环境为服务端
        }),
    ],
    mode: 'development',
    target: 'node',
    externals: [nodeExternals()], // 不绑定node模块，保留为 require()
};