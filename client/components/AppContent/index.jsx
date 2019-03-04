import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';

const ThemeContext = React.createContext({
    name: 'guo_tonight',
    value: '实现context',
});

class Title extends React.Component {
    render () {
        console.log('this----', this.context);
        return (
            <div>hello world</div>
        );
    }
}
Title.contextType = ThemeContext;
class Header extends React.Component {
    render () {
        console.log('this', this.context);
        return (
            <div>
                <Title></Title>
            </div>
        );
    }
}

// Header.contextType = ThemeContext;

class App extends Component {
    constructor (props) {
        super(props);
        console.log('props', props);
    }


    render () {
        return (
            <ThemeContext.Provider value={{ name: 'guodan' }}>
                <Header></Header>
            </ThemeContext.Provider>
        );
    }
}

App.propTypes = {
    name: PropTypes.string,
};

export default App;