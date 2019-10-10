import React, { Component } from 'react'
import Login from '../../componentes/login'
import './paginaLogin.css'
import { Link } from 'react-router-dom'


export default class PaginaLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nomeUsuario: ""
        }

    }

    render() {
        return (

            <div>
                <h1>
                    <Login nome="" />
                    <Link to="/home">
                       
                    </Link>



                </h1>
            </div>

        )
    }

}