const webpack = require('webpack');
const isProd = process.env.NODE_ENV !== 'production';
const webpackConfigDev = require('../webpack.config');
const webpackConfigProd = require('../webpack.prod.config');
const webpackConfig = isProd ? webpackConfigDev : webpackConfigProd;


module.exports = function (app) {
    if (!isProd) {
        webpackConfig.entry = ['webpack-hot-middleware/client', webpackConfig.entry];
        webpackConfig.output.filename = 'static/js/[name].[hash].js';
        webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    const webpackComplier = webpack(webpackConfig);
    const middleware = require('webpack-dev-middleware')(webpackComplier);

    app.use(middleware);
    app.use(require('webpack-hot-middleware')(webpackComplier));
};

