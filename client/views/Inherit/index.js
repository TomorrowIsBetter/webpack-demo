import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';

class Home extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div>
                这里是Inherit组件
            </div>
        );
    }
}

Home.propTypes = {
    name: PropTypes.string,
};

export default Home;