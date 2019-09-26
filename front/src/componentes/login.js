'use strict'

import React from 'react'

const Login = ({ handleLogin }) => (
    <div className='usuario'>
        <input type='text'
        placeholder='Digite seu nome'
        onKeyUp={ handleLogin }
        />  
    </div>    
)

Login.propTypes = {
    handleLogin: React.PropTypes.func.isRequired
}

export default Login