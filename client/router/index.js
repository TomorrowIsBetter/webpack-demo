import Promise from '../views/Promise';
import Inherit from '../views/Inherit';
import Home from '../views/Home';

import React from 'react';
import { Route } from 'react-router-dom';


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