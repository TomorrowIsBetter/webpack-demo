const express = require('express');
const fs = require('fs');
const path = require('path');
// 使node支持JSX语法和es6语法
const babelConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../.babelrc')));
require('@babel/register')(Object.assign(babelConfig, {
}));

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

app.use(express.static(path.resolve(__dirname, '../ouput')));

if (process.env.NODE_ENV !== 'production') {
    app.use('/output', express.static(path.join(__dirname, '../output')));

    let template = fs.readFileSync(path.resolve(__dirname, '../output/index.html'), 'utf8');
    // 服务端渲染（往里面添加数据）: 相当于创建了一个批量生产app组件但是没有添加数据的工厂函数，然后再往里面塞数据


    app.get('*', function (req, res) {

        // 添加数据没有用，@TODO
        const promise = App.getInitialProps();
        promise.then(data => {
            const factory = React.createFactory(App);
            const html = renderToString(factory(data));
            template = template.replace('<div id="main"></div>', `<div id="main">${html}</div>`);
            res.set('Content-Type', 'text/html');
            res.send(template);
        });

    });


    // 服务端渲染(不添加数据)
    // const html = renderToString(<App />);


} else {
    // 这里跑单页面
    app.use(express.static(__dirname + '/output'));
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'ouput/index.html'));
    });
}

app.listen(3001, () => {
    console.log('PORT IN the', 3001);
});