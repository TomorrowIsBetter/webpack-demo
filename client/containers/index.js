import React from 'react';
import App from '../components/AppContent/index.jsx';
import { hydrate, render } from 'react-dom';

import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

function createApp (context, url, props) {
    return (
        <StaticRouter context={context} location={url}>
            <App {...props}/>
        </StaticRouter>
    );
}

class Launcher {
    constructor (App) {
        this.App = App;
    }

    render () {
        const isBrowser = process.env.TARGET !== 'node';
        if (isBrowser) {
            const bootstrap = window.isRendered ? hydrate : render;
            loadableReady().then(bootstrap(
                (<BrowserRouter>
                    <App {...window.data}/>
                </BrowserRouter>), document.getElementById('main')
            ));
        }
        return {
            createApp,
        };
    }
}

const launcher = new Launcher(App);

export default launcher.render();