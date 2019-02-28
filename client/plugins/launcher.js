import React from 'react';
import { hydrate, render } from 'react-dom';

class launcher {
    constructor (App) {
        this.App = App;
    }
    render () {
        const isBrowser = process.env.TARGET !== 'node';
        if (isBrowser) {
            const bootstrap = window.isRendered ? hydrate : render;
            bootstrap(
                <div className="app">
                    <App />
                </div>, document.getElementById('main')
            );
        }
        return this.App;
    }
}

export default launcher;
