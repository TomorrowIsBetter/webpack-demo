import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less'
class App extends Component {
    constructor(props) {
        super(props);
        console.log('props', props);
    }
    static async getInitialProps() {

        let data = await new Promise((resolve,reject)=>{
            setTimeout(() => {
                resolve({
                    name:'00233222'
                })
            }, 3000);
            
        })
        return data
       
    }

    componentDidMount() {
        console.log('this.props', this.props);
    }

    handleClick() {
        console.log('done done', this.props);
    }
    handleBtnClick() {
        console.log('点击的是一个按钮');
    }
    render() {
        return (
            <div className="App" >
                <header className="App-header" onClick={() => this.handleClick()}>
                    <h1 className="App-title">Welcome to React</h1>
                    <button onClick={() => this.handleBtnClick()}>这里是一个按钮</button>
                </header>
                <p className="App-intro">
                    Is my application rendered by server or client?
                </p>
                <div>这里是后端传过来的数据：{this.props.name}</div>
            </div>
        );
    }
}

App.propTypes = {
    name: PropTypes.string,
};

export default App;