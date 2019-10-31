import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginaLogin from './pages/login/paginaLogin';
import PaginaHome from './pages/home/paginaHome';
import { Switch, Route } from 'react-router-dom';

export default class Routes extends React.Component {

    render() {
        return (
         <React.Fragment>
            <Switch>                
                <Route path="/home" component = {PaginaHome}/>
                <Route path="/" component = {PaginaLogin}/>
            </Switch>
         </React.Fragment>
     )
    }
}

