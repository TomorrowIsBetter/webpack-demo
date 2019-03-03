import React from 'react';
import App from '../components/AppContent/index.jsx';
import { hydrate, render } from 'react-dom';
class Launcher {
    constructor (App) {
        this.App = App;
    }

    render () {
        const isBrowser = process.env.TARGET !== 'node';
        if (isBrowser) {
            const bootstrap = window.isRendered ? hydrate : render;
            bootstrap(
                <App {...window.data}/>, document.getElementById('main')
            );
        }
        return this.App;
    }
}

const launcher = new Launcher(App);

export default launcher.render();