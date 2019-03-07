const express = require('express');
const fs = require('fs');
const path = require('path');

const bodyParser = require('body-parser');
const app = express();
const { renderToString } = require('react-dom/server');


// body-parser是对发出请求做出处理，处理编码等
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
app.set('view', path.resolve(__dirname, '../output'));


const data = { name: '这里是node想传给服务端的数据' };

if (process.env.NODE_ENV !== 'production') {
    app.use('/output', express.static(path.join(__dirname, '../output')));

    let template = fs.readFileSync(path.resolve(__dirname, '../output/index.html'), 'utf8');
    const createApp = require(path.join(__dirname, '../output/server.js')).default.createApp;

    app.get('*', function (req, res) {
        console.log('req.path', req.path);

        const context = {};
        const component = createApp(context, req.path, data);
        const html = renderToString(component);
        template = template.replace(/<div id="main"><\/div>/g,
            `
                <div id="main">${html}</div>
                <script type="text/javascript">window.data = ${JSON.stringify(data)};window.isRendered=true;</script>
            `
        );
        // @TODO：处理404状态
        console.log('context', context);
        // 服务端路由是静态的，context里面存储了初始路由发生重定向等内容改变之后的信息，通过判断这个信息，从而处理
        if (context.url) {
            res.redirect(context.url);
            return;
        }
        res.set('Content-Type', 'text/html');
        res.send(template);

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