import React from 'react'
import '../loader.css'   
import FiguraCuia from './cuia006.gif' 



const Carregando = ({loading}) => {    
    return loading ? (
                <div id="root">               
                    <img src={FiguraCuia} />
                </div>

) : null

}



export default Carregando