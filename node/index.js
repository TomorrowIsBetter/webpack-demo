const express = require('express');
const fs = require('fs');
const path = require('path');

const bodyParser = require('body-parser');
const app = express();
const { renderToString } = require('react-dom/server');
const { ChunkExtractor } = require('@loadable/server');
const isProd = process.env.NODE_ENV === 'production';

// body-parser是对发出请求做出处理，处理编码等
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
app.set('view', path.resolve(__dirname, '../output'));
app.use('/output', express.static(path.join(__dirname, '../output/client')));


const data = { name: '这里是node想传给服务端的数据' };
const context = {};
let rendererParams;

function Renderer (template, clientJSON, serverEntryFile) {
    this.template = template;
    console.log('te---', template);
    this.clientJSON = clientJSON;
    this.serverEntryFile = serverEntryFile;
}

function getRendererParams () {
    if (!isProd) {
        const devServer = require('./dev-server');
        devServer(app).then(props => {
            const { clientJSON, template, serverEntryFile } = props;
            rendererParams = new Renderer(template, clientJSON, serverEntryFile);
        });
    } else {
        const clientJSON = JSON.parse(fs.readFileSync(path.join(__dirname, '../output/client/loadable-stats.json')));
        const template = fs.readFileSync(path.join(__dirname, '../output/client/index.html'), 'utf-8');
        const serverEntryFile = require(path.join(__dirname, '../output/server/server.js')).default;
        rendererParams = new Renderer(template, clientJSON, serverEntryFile);
    }
}

getRendererParams();

app.get('*', function (req, res) {
    const template  = rendererParams.template || {};
    const clientJSON  = rendererParams.clientJSON || {};
    const { createApp } = rendererParams.serverEntryFile || {};
    const component = createApp(context, req.path, data);
    const extractor = new ChunkExtractor({ stats: clientJSON, entrypoints: ['main'] });
    const jsx = extractor.collectChunks(component);
    const html = renderToString(jsx);

    const resultTemplate = template.replace(/<div id="main"><\/div>/g,
        `
            <div id="main">${html}</div>
            <script type="text/javascript">window.data = ${JSON.stringify(data)};window.isRendered=true;</script>${extractor.getScriptTags()}
        `
    );
    res.set('Content-Type', 'text/html');
    res.send(resultTemplate);
});

app.listen(3001, () => {
    console.log('PORT IN the', 3001);
});