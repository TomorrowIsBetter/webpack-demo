import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';

class ErrorBoundry extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div>
                出现错误
            </div>
        );
    }
}

ErrorBoundry.propTypes = {
    name: PropTypes.string,
};

export default ErrorBoundry;