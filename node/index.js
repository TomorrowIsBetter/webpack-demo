const express = require('express');
const fs = require('fs');
const path = require('path');

const bodyParser = require('body-parser');
const app = express();
const { renderToString } = require('react-dom/server');
const { ChunkExtractor } = require('@loadable/server');
const isProd = process.env.NODE_ENV === 'production';
console.log('process.env.NODE_ENV', process.env.NODE_ENV);


// body-parser是对发出请求做出处理，处理编码等
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
app.set('view', path.resolve(__dirname, '../output'));
app.use('/', express.static(path.join(__dirname, '../output')));


const data = { name: '这里是node想传给服务端的数据' };
const context = {};
let goujianParams, readyPromise;

function Renderer (template, clientJSON, serverEntryFile) {
    this.template = template;
    this.clientJSON = clientJSON;
    this.serverEntryFile = serverEntryFile;
}

if (!isProd) {
    const devServer = require('./dev-server');
    readyPromise = devServer(app, ({ clientEntryFileMap, serverEntryFile }) => {
        const { template, clientJSON } = clientEntryFileMap || {};
        console.log('template', template);
        goujianParams = new Renderer(template, clientJSON, serverEntryFile);
    });
} else {
    const clientJSON = JSON.parse(fs.readFileSync(path.join(__dirname, '../output/loadable-stats.json')));
    const template = fs.readFileSync(path.join(__dirname, '../output/index.html'), 'utf-8');
    const serverEntryFile = require(path.join(__dirname, '../output/server.js')).default;
    goujianParams = new Renderer(template, clientJSON, serverEntryFile);
}

if (!isProd) {
    app.get('*', function (req, res) {
        readyPromise.then(() => {
            const template  = goujianParams.template || {};
            const clientJSON  = goujianParams.clientJSON || {};
            const { createApp } = goujianParams.serverEntryFile || {};
            const component = createApp(context, req.path, data);
            const extractor = new ChunkExtractor({ stats: clientJSON, entrypoints: ['main'] });
            const jsx = extractor.collectChunks(component);
            const html = renderToString(jsx);
            console.log('template', template);

            const resultTemplate = template.replace(/<div id="main"><\/div>/g,
                `
                <div id="main">${html}</div>
                <script type="text/javascript">window.data = ${JSON.stringify(data)};window.isRendered=true;</script>${extractor.getScriptTags()}
            `
            );
            res.set('Content-Type', 'text/html');
            res.send(resultTemplate);
        });
    });
} else {
    app.get('*', function (req, res) {
        const template  = goujianParams.template || {};
        const clientJSON  = goujianParams.clientJSON || {};
        const { createApp } = goujianParams.serverEntryFile || {};
        const component = createApp(context, req.path, data);
        const extractor = new ChunkExtractor({ stats: clientJSON, entrypoints: ['main'] });
        const jsx = extractor.collectChunks(component);
        const html = renderToString(jsx);
        console.log('html', html);

        const resultTemplate = template.replace(/<div id="main"><\/div>/g,
            `
                <div id="main">${html}</div>
                <script type="text/javascript">window.data = ${JSON.stringify(data)};window.isRendered=true;</script>${extractor.getScriptTags()}
            `
        );
        res.set('Content-Type', 'text/html');
        res.send(resultTemplate);
    });
}

app.listen(3001, () => {
    console.log('PORT IN the', 3001);
});