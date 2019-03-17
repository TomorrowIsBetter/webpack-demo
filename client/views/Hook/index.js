import React, { Component, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './index.less';

const DemoContext = React.createContext();

/**
 * useState -> 使无状态组件（函数组件）里面可以使用state
 * useEffect -> 使无状态组件具有钩子
 *  每次render之后都会触发useEffect
 * useContext -> 使无状态组件里面可以使用context
 */
function HookFunctionDemo (props) {
    const [age, changeAge] = useState();
    // 这里可以获取父组件context
    const context = useContext(DemoContext);
    console.log('context', context);
    useEffect(() => {
        changeAge(222);
        return () => {
            changeAge(444);
        };
    }, [props]);
    return (
        <div>
            {age}
            <div onClick={() => changeAge(age + 'helllllllooooooo')}>点击这里改变age</div>
        </div>
    );
}

class HookFunctionFather extends React.Component {
    render () {
        return (
            <div>
                hello world
                <HookFunctionDemo></HookFunctionDemo>
            </div>
        );
    }
}

HookFunctionFather.contextType = DemoContext;

class Hook extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <DemoContext.Provider value="hello world">
                <div>这里是Hook使用</div>
                <HookFunctionFather></HookFunctionFather>
            </DemoContext.Provider>
        );
    }
}

Hook.propTypes = {
    name: PropTypes.string,
};

export default Hook;