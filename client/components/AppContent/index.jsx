import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {
    render () {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    Is my application rendered by server or client?
                </p>
            </div>
        );
    }
}

export default App;