import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';


// 两种继承
function Parent (name) {
    this.name = name;
    console.log('parent');
}
Parent.prototype.sayName = function () {
    console.log('我的名字是' + this.name);
};

// 原型链继承
function Son1 () {}
Son1.prototype = new Parent('tony');

// 寄生组合式继承
function Son2 (name) {
    Parent.call(this, name);
}
const prototype = Object.create(Parent.prototype);
// 这里用来修正-> 由于是继承而来的所以constructor是没有的，如果直接去获取，会得到继承Parent的constructor的属性
prototype.constructor = Son2;
Son2.prototype = prototype;

const son1 = new Son1('son1');
const son2 = new Son2('son2');


// 另外一种组合继承
function Son3 (name) {
    Parent.call(this, name);
}
Son3.prototype = new Parent();
Son3.prototype.constructor = Son3;
// 这样做的好处是能够子类创建实例时，向父类传递参数，并且实例子类可以私有
// 缺点：父类实例执行了两次，相当于是父类在原型上面的实例被子类中的实例属性覆盖了


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