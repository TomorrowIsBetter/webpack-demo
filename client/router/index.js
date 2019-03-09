import React from 'react';
import { Route } from 'react-router-dom';
import loadable from '@loadable/component';

const Inherit = loadable(() => import('../views/inherit'));
const Promise = loadable(() => import('../views/promise'));
const Home = loadable(() => import('../views/home'));


export const router = [
    {
        path: '/home',
        component: Home,
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