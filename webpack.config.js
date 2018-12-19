const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, './client/index.js'),
    devtool: 'cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, './output'),
        filename: 'output.[hash:8].js',
    },
    module: {
        rules: [
            { test: /\.jsx$|\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
            { test: /\.css$|.less$/, exclude: /node_modules/, use: { loader: 'css-loader' } },
            { test: /\.png$|\.jpeg$|\.jpg$/, exclude: /node_modules/, use: { loader: 'file-loader' } },
            { test: /\.html$/, exclude: /node_modules/, use: [{ loader: 'html-loader' }] },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack-demo-init',
            template: path.resolve(__dirname, './client/index.html'),
            filename: 'index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
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