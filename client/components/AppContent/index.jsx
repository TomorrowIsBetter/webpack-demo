import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';

import { Switch, Link, Redirect } from 'react-router-dom';

import { router, WrappedRoutes } from '../../router';

class App extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="app-container">
                <div><Link to="/">Home</Link></div>
                <div><Link to="/inherit">inherit</Link></div>
                <div><Link to="/promise">Promise</Link></div>

                <Switch>
                    {router.map((v, key) => (
                        <WrappedRoutes {...v} key={key}></WrappedRoutes>
                    ))}
                    <Redirect from="/" to="/promise" exact={true} />
                </Switch>

            </div>
        );
    }
}

App.propTypes = {
    name: PropTypes.string,
};

export default App;