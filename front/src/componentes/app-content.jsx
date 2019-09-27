
import React from 'react'
import Login from './login'
import Botao from './botoes'
import './app-content.css'

const AppContent = () => (
    <div className='app'>
        <div className='telaCompleta'>            
            <Login />
            <Botao />
        </div>
    </div>
)

export default AppContent