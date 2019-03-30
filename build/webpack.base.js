const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 分离css文件需要注意：MiniCssExtractPlugin这个不能和style-loader同用，因为后者是把css通过内联放到html里面

const isProduction = process.NODE_ENV === 'production';

module.exports = {
    module: {
        rules: [
            { test: /\.jsx$|\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
            { test: /\.less$/, exclude: /node_modules/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] },
            { test: /\.png$|\.jpeg$|\.jpg$/, exclude: /node_modules/, use: { loader: 'file-loader' } },
            { test: /\.html$/, exclude: /node_modules/, use: [{ loader: 'html-loader' }] },
        ],
    },
    devtool: isProduction ? null : 'source-map',
    mode: isProduction ? 'development' : 'production',
    // 下列文件不需要加后缀
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
};