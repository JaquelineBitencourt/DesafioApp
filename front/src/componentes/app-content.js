'use strict'

import React, { PropTypes } from 'react'
import Login from './login'


const AppContent = ({ handleLogin }) => (
    <div className = 'app'>
        <Login handleLogin = { handleLogin } />
    </div>
)

// AppContent.propTypes = {

// }

export default AppContent