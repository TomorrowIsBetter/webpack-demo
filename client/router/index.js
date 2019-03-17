import React from 'react';
import { Route } from 'react-router-dom';
import loadable from '@loadable/component';

// 这里真的是够乌龙的，mac对大小写不敏感。这里之前写的是小写，mac里面可以将这个加载出来，但是在webpack监听的时候还是监听
// 的小写的组件，小写组件对应的是找不到的，所以触发不了重新编译，也触发不了热更新

const Inherit = loadable(() => import('../views/Inherit'));
const Promise = loadable(() => import('../views/Promise'));
const Home = loadable(() => import('../views/Home'));
const Hook = loadable(() => import('../views/Hook'));


export const router = [
    {
        path: '/',
        component: Home,
        exact: true,
    }, {
        path: '/inherit',
        component: Inherit,
    }, {
        path: '/promise',
        component: Promise,
        routes: [
            {
                path: 'promise/test',
                component: Home,
            },
        ],
    }, {
        path: '/hook',
        component: Hook,
    },
];

export const WrappedRoutes = (router) => (
    <Route
        path={router.path}
        exact={router.exact}
        component={(props) => <router.component {...props} router={router.routes}
        />}>
    </Route>
);