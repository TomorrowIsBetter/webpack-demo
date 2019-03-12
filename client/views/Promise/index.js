import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';

import { WrappedRoutes } from '../../router';
import { Switch, Link } from 'react-router-dom';

// @TODO: 未实现异步获取数据
class Promise {
    constructor (func) {
        this.func = func;
        this.status = 'pending';
        this.data = undefined;
        this.onResolvedCallback = [];
        this.onRejectedCallback = [];

        const resolve = (value) => {
            if (this.status === 'pending') {
                this.status = 'resolved';
                this.data = value;
                this.onResolvedCallback.map(singleCb => {
                    singleCb(value);
                });
            }
        };
        const reject = (error) => {
            if (this.status === 'pending') {
                this.status = 'rejected';
                this.data = error;
                this.onResolvedCallback.map(singleCb => {
                    singleCb(error);
                });
            }
        };
        try {
            func(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    then (resolvedFunc, rejectedFunc) {
        // 返回值的目的：满足promise值穿透
        resolvedFunc = typeof resolvedFunc === 'function' ? resolvedFunc : function (val) { return val; };
        rejectedFunc = typeof rejectedFunc === 'function' ? rejectedFunc : function (err) { return err; };

        if (this.status === 'resolved') {
            return new Promise((resolve, reject) => {
                const res = resolvedFunc(this.data);
                try {
                    if (res instanceof Promise) {
                        return res.then();
                    }
                    resolve(res);
                } catch (err) {
                    reject(err);
                }
            });
        }

        if (this.status === 'rejected') {
            return new Promise((resolve, reject) => {
                const res = rejectedFunc(this.data);
                try {
                    if (res instanceof Promise) {
                        return res.then();
                    }
                    resolve(res);
                } catch (err) {
                    reject(err);
                }
            });
        }

        if (this.status === 'pending') {
            return new Promise((resolve, reject) => {
                this.onResolvedCallback.push(val => {
                    return new Promise((resolve, reject) => {
                        const res = resolvedFunc(this.data);
                        try {
                            if (res instanceof Promise) {
                                return res.then();
                            }
                            resolve(res);
                        } catch (err) {
                            reject(err);
                        }
                    });
                });
                this.onRejectedCallback.push(val => {
                    const res = rejectedFunc(this.data);
                    try {
                        if (res instanceof Promise) {
                            return res.then();
                        }
                        resolve(res);
                    } catch (err) {
                        reject(err);
                    }
                });
            });
        }
    }

    catch (rejectedFunc) {
        return this.then(null, rejectedFunc);
    }
}
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