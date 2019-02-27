const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')

// 分离css文件需要注意：MiniCssExtractPlugin这个不能和style-loader同用，因为后者是把css通过内联放到html里面

module.exports = {
    entry: path.resolve(__dirname, './client/index.js'),
    devtool: 'cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, './output'),
        publicPath: '/output',
        filename: 'index.js',
    },
    module: {
        rules: [
            { test: /\.jsx$|\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
            { test: /\.css$|.less$/, exclude: /node_modules/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
            { test: /\.png$|\.jpeg$|\.jpg$/, exclude: /node_modules/, use: { loader: 'file-loader' } },
            { test: /\.html$/, exclude: /node_modules/, use: [{ loader: 'html-loader' }] },
        ],
    },
    plugins: [
        new CleanWebpackPlugin([path.resolve(__dirname, '../output')]),
        new HtmlWebpackPlugin({
            title: 'webpack-demo-init',
            template: path.resolve(__dirname, './client/index.html'),
            filename: 'index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin(),
    ],
    // devServer: {
    //     contentBase: path.join(__dirname, './output'),
    //     port: 3000,
    //     compress: false,
    //     inline: true,
    //     open: true,
    //     hot: true,
    // },
};