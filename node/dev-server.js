const path = require('path');
// webpack配置文件
const webpack = require('webpack');
const webpackDevMiddleWare = require('webpack-dev-middleware');
const webpackConfig = require('../build/webpack.dev');

module.exports = function (app) {
    let clientEntryFileMap, serverEntryFile;
    let resolve;
    const resolvePromise = new Promise(r => {
        resolve = r;
    });
    // 客户端和服务端一起打包
    const multiComplier = webpack(webpackConfig);
    const clientCompiler = multiComplier.compilers[0];

    const clientDevMiddleWare = webpackDevMiddleWare(clientCompiler, {
        publicPath: webpackConfig[0].output.publicPath,
    });

    app.use(clientDevMiddleWare);
    app.use(require('webpack-hot-middleware')(clientCompiler));

    function update () {
        const { clientJSON, template } = clientEntryFileMap || {};
        if (clientJSON && serverEntryFile && template) {
            const res = {
                clientJSON, template, serverEntryFile,
            };
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
        const clientJSON = JSON.parse(clientDevMiddleWare.fileSystem.readFileSync(path.join(webpackConfig[0].output.path, 'loadable-stats.json')));
        const template = clientDevMiddleWare.fileSystem.readFileSync(path.join(webpackConfig[0].output.path, 'index.html'), 'utf-8');
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
        serverEntryFile = require(path.join(__dirname, '../output/server/server.js')).default;
        update();
    });

    return resolvePromise;

};