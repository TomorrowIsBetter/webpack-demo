const path = require('path');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const App = require('../client/components/AppContent/index.jsx').default;

const React = require('react');
const { renderToString } = require('react-dom/server');


// 加入webpack中间件


// body-parser是对发出请求做出处理，处理编码等
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
app.set('view', path.resolve(__dirname, '../output'));

if (process.env.Dev !== 'production') {
    // 配置webpack
    const webpack = require('webpack');
    const webpackConfigDev = require('../webpack.config');
    const webpackConfigProd = require('../webpack.prod.config');
    const webpackConfig = process.env.Dev !== 'production' ? webpackConfigDev : webpackConfigProd;
    const webpackComplier = webpack(webpackConfig);

    // 服务端渲染
    const html = renderToString(<App />);
    const template = fs.readFileSync(path.resolve(__dirname, './view/index.html'), (err, htmldata) => {
        const tmp =  htmldata.replace(
            '<div id="main"></div>',
            `<div id="main">${html}</div>`
        );
        console.log('tmp', tmp);
        return tmp;
    }, 'utf8');


    app.get('*', function (req, res) {
        res.set('Content-Type', 'text/html');
        res.send(template);
    });

    // 客户端渲染

    // const middleware = require('webpack-dev-middleware')(webpackComplier);
    // app.use(middleware);
    // app.use(require('webpack-hot-middleware')(webpackComplier));
    // app.use(express.static(__dirname + '/output'));
    // app.get('*', function (req, res) {
    //     res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../output/index.html')));
    //     res.end();
    // });
} else {
    app.use(express.static(__dirname + '/output'));
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'ouput/index.html'));
    });
}

app.listen(3001, () => {
    console.log('PORT IN the', 3001);
});