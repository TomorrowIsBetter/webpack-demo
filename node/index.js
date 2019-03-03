const express = require('express');
const fs = require('fs');
const path = require('path');
const React = require('react');

const bodyParser = require('body-parser');
const app = express();
const { renderToString } = require('react-dom/server');


// body-parser是对发出请求做出处理，处理编码等
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
app.set('view', path.resolve(__dirname, '../output'));


if (process.env.NODE_ENV !== 'production') {
    app.use('/output', express.static(path.join(__dirname, '../output')));

    let template = fs.readFileSync(path.resolve(__dirname, '../output/index.html'), 'utf8');
    const js = require(path.join(__dirname, '../output/server.js')).default;


    app.get('*', function (req, res) {

        const data = { name: '这里是node想传给服务端的数据' };
        const factory = React.createFactory(js);
        console.log('factory', factory);
        const html = renderToString(factory(data));
        template = template.replace(/<div id="main"><\/div>/g,
            `
                <div id="main">${html}</div>
                <script type="text/javascript">window.data = ${JSON.stringify(data)};window.isRendered=true;</script>
            `
        );
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