import React from 'react';
import { render } from 'react-dom';
import App from './components/AppContent/index.jsx';

render(
    <div className="app">
        <App />
    </div>, document.getElementById('main')
);

