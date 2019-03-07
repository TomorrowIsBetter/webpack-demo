import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';

import { Switch, Route, Link } from 'react-router-dom';

// 组件
import PromiseModule from '../PromiseModule/index.js';
import Home from '../Home/index.js';

class App extends Component {
    constructor (props) {
        super(props);
        console.log('props', props);
    }

    render () {
        return (
            <div className="app-container">
                <div><Link to="/">Home</Link></div>
                <div><Link to="/promise">Promise</Link></div>

                <Switch>
                    <Route exact path='/roster' component={Home}/>
                    <Route path='/roster/:number' component={PromiseModule}/>
                </Switch>

                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/promise" component={PromiseModule}/>
                </Switch>

            </div>
        );
    }
}

App.propTypes = {
    name: PropTypes.string,
};

export default App;