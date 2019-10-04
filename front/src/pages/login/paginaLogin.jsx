import React from 'react'
import Login from '../../componentes/login'
import './paginaLogin.css'
import { Link } from 'react-router-dom'


export default class PaginaLogin extends React.Component {
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
                    <Login nome="teste" />
                    {/* <Link to="/home">
                        <Botao/>
                    </Link> */}



                </h1>
            </div>

        )
    }

}