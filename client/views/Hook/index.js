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
                <div>这里是Hook使用</div>
            </div>
        );
    }
}

Home.propTypes = {
    name: PropTypes.string,
};

export default Home;