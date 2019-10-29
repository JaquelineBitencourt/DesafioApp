import React from 'react'
import '../loader.css'

const Carregando = ({ loading }) => {
    return loading ? (
        <div id="loader">
        </div>
    ) : null
}

export default Carregando