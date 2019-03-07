import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';

import { WrappedRoutes } from '../../router';
import { Switch, Link } from 'react-router-dom';

class PromiseModule extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div>
                <h2>这里是Promise组件</h2>
                <Link to='/promise/test'>TTest</Link>
                <div className="name">
                    <Switch>
                        {this.props.router.map((route, i) => (
                            <WrappedRoutes key={i} {...route} />
                        ))}
                    </Switch>
                </div>
            </div>
        );
    }
}

PromiseModule.propTypes = {
    name: PropTypes.string,
};

export default PromiseModule;