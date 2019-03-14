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
                <div>这里要实现网格布局</div>
                <p>是一个二维布局系统，flex一帮用于一维布局</p>
                <div>第一种实现方式</div>
                <div className="grid-container v1">
                    <div className="grid-item a"></div>
                    <div className="grid-item b"></div>
                    <div className="grid-item c"></div>
                    <div className="grid-item d"></div>
                </div>
                <div>第二种实现方式</div>
                <div className="grid-container v2">
                    <div className="grid-item aa"></div>
                    <div className="grid-item bb"></div>
                    <div className="grid-item cc"></div>
                    <div className="grid-item dd"></div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    name: PropTypes.string,
};

export default Home;