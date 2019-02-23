const express = require('express');
const fs = require('fs');
const path = require('path');
// 使node支持JSX语法和es6语法
const babelConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../.babelrc')));
require('@babel/register')(babelConfig);
const bodyParser = require('body-parser');
const app = express();
const App = require('../client/components/AppContent/index.jsx').default;

const React = require('react');
const { renderToString } = require('react-dom/server');


// body-parser是对发出请求做出处理，处理编码等
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
app.set('view', path.resolve(__dirname, '../output'));


// 配置webpack
const webpack = require('webpack');
const webpackConfigDev = require('../webpack.config');
const webpackConfigProd = require('../webpack.prod.config');
const webpackConfig = process.env.NODE_ENV !== 'production' ? webpackConfigDev : webpackConfigProd;
const webpackComplier = webpack(webpackConfig);

// express中提供静态文件
// app.use('/output', express.static(middleware.fileSystem));
app.use(express.static(path.resolve(__dirname, '../ouput')));

if (process.env.NODE_ENV !== 'production') {
    app.use('/output', express.static(path.join(__dirname, '../output')));

    let template = fs.readFileSync(path.resolve(__dirname, '../output/index.html'), 'utf8');
    // 服务端渲染（往里面添加数据）: 相当于创建了一个批量生产app组件但是没有添加数据的工厂函数，然后再往里面塞数据
    const factory = React.createFactory(App);
    const html = renderToString(factory({ name: 'hello' }));
    // 服务端渲染(不添加数据)
    // const html = renderToString(<App />);
    template = template.replace('<div id="main"></div>', `<div id="main">${html}</div>`);

    app.get('*', function (req, res) {
        res.set('Content-Type', 'text/html');
        res.send(template);
    });

    // 客户端渲染

    // 配置webpack
    // const webpack = require('webpack');
    // const webpackConfigDev = require('../webpack.config');
    // const webpackConfigProd = require('../webpack.prod.config');
    // const webpackConfig = process.env.Dev !== 'production' ? webpackConfigDev : webpackConfigProd;
    // const webpackComplier = webpack(webpackConfig);
    // const middleware = require('webpack-dev-middleware')(webpackComplier);

    // app.use(middleware);
    // app.use(require('webpack-hot-middleware')(webpackComplier));
    // app.use(express.static(path.resolve(__dirname, '../ouput')));
    // app.set('views', path.resolve(__dirname, '../ouput'));
    // app.set('view engine', 'html');
    // app.get('*', function (req, res) {
    //     res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../output/index.html')));
    //     res.end();
    // });
    // app.get('/name', function (req, res) {
    //     res.render('index');
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