const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

// 分离css文件需要注意：MiniCssExtractPlugin这个不能和style-loader同用，因为后者是把css通过内联放到html里面

module.exports = {
    entry: path.resolve(__dirname, './client/containers/index.js'),
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, './output/'),
        publicPath: './output/',
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
            template: path.resolve(__dirname, './client/static/index.html'),
            filename: 'index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin(),
        new LoadablePlugin(),
    ],
    target: 'web',
    devServer: {
        contentBase: path.join(__dirname, './output'),
        port: 3000,
        compress: false,
        inline: true,
        open: true,
        hot: true,
        // 加上这个参数，可以使在客户端定位到路由的时候刷新，也不会返回404
        // https://www.thinktxt.com/react/2017/02/26/react-router-browserHistory-refresh-404-solution.html
        historyApiFallback: true,
    },
    // 下列文件不需要加后缀
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
};