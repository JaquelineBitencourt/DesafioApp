import React from 'react'
import Login from '../../componentes/login'
import Botao from '../../componentes/botoes'
import './paginaLogin.css'
import { Link } from 'react-router-dom'

const PaginaLogin = () => (
    <div className='app'>
        <div className='telaCompleta'>
            <Login />
            <Link to="/home">
                <Botao />
            </Link>

        </div>
    </div>
)

export default PaginaLogin