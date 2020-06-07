import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreatePersonal from './pages/CreatePersonal';

const Routes = () => {
    return (
        <BrowserRouter>
        <Route component={Home} path="/" exact />
        <Route component={CreatePersonal} path="/create-personal" />
        </BrowserRouter>
    );
}

export default Routes;