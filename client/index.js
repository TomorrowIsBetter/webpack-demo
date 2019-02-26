import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './components/AppContent/index.jsx';


// if (window.___INIT__ ) {
//     hydrate(
//         <div className="app">
//             <App />
//         </div>, document.getElementById('main')
//     );
// }

hydrate(
    <div className="app">
        <App />
    </div>, document.getElementById('main')
);

// export default App;