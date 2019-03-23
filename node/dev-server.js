const path = require('path');
// webpack配置文件
const webpack = require('webpack');
const webpackDevMiddleWare = require('webpack-dev-middleware');
const webpackClientConfig = require('../webpack.config');
const webpackServerConfig = require('../webpack.server');

module.exports = function (app, callback) {
    let clientEntryFileMap, serverEntryFile;
    let resolve;
    const resolvePromise = new Promise(r => {
        resolve = r;
    });
    // 客户端和服务端一起打包
    const multiComplier = webpack([webpackClientConfig, webpackServerConfig]);
    const clientCompiler = multiComplier.compilers[0];

    const clientDevMiddleWare = webpackDevMiddleWare(clientCompiler, {
        publicPath: webpackClientConfig.output.publicPath,
    });

    app.use(clientDevMiddleWare);
    app.use(require('webpack-hot-middleware')(clientCompiler));

    function update () {
        const { clientJSON, template } = clientEntryFileMap || {};
        if (clientJSON && serverEntryFile && template) {
            const res = {
                clientEntryFileMap, serverEntryFile,
            };
            // 实例化要渲染的参数
            callback(res);
            resolve(res);
        }
    }

    // 客户端打包
    clientCompiler.hooks.done.tap('done', stats => {
        const info = stats.toJson();
        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        }
        if (stats.hasErrors()) {
            console.error(info.errors);
            return;
        }
        // 这里是客户端需要的文件
        const clientJSON = JSON.parse(clientDevMiddleWare.fileSystem.readFileSync(path.join(webpackClientConfig.output.path, 'loadable-stats.json')));
        const template = clientDevMiddleWare.fileSystem.readFileSync(path.join(webpackClientConfig.output.path, 'index.html'), 'utf-8');
        clientEntryFileMap = Object.assign({}, { clientJSON, template });
        update();
    });

    // 服务端打包
    const serverComplier = multiComplier.compilers[1];
    serverComplier.watch({}, (err, stats) => {
        const info = stats.toJson();
        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        }
        if (stats.hasErrors()) {
            console.error(info.errors);
            return;
        }
        serverEntryFile = require(path.join(__dirname, '../output/server.js')).default;
        update();
    });

    return resolvePromise;

};