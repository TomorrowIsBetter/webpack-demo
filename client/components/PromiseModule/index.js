import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';

class PromiseModule extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        console.log('ininin');
        return (
            <div>
                这里是Promise组件
            </div>
        );
    }
}

PromiseModule.propTypes = {
    name: PropTypes.string,
};

export default PromiseModule;