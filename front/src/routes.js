import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import PaginaLogin from './pages/login/paginaLogin';
import PaginaHome from './pages/home/paginaHome';

import { Switch, Route } from 'react-router-dom';

export const Routes = () => {
    return(
        <Switch>
            <Route exact path="/"component={PaginaLogin} />
            <Route path="/home"component={PaginaHome}/>
            <Route component={() => <h1>Page 404!</h1>}/>
        </Switch>
    )
}
