import React from 'react'
import Login from '../../componentes/login'
import Botao from '../../componentes/botoes'
import './paginaLogin.css'
import { Link } from 'react-router-dom'
import {REQUEST} from '../../requestModuleReact'


// const PaginaLogin = () => (
//     <div className='app'>
//         <div className='telaCompleta'>
//             <Login />

//             <Link to="/home">
//                 <Botao click= {pegarUsuario()} />
//             </Link>

//         </div>
//     </div>
// )


//  let cache = {}

// function pegarUsuario(){
    
//     console.log("props", )
//     let requestStatus = cache[undefined]

//     if(requestStatus && requestStatus.done){
//         console.log('sjdbasfvuiasvfyuasvdyuasvd')
//     }
//     else if(requestStatus && !requestStatus.done){
//         throw requestStatus.thenable
//     }

//     // let teste = document.getElementById("nomeUsuarioo").value
//     let teste = "Bruno";
//     cache[undefined] = REQUEST.Get('https://localhost:44327/api/autenticar/dsa');
//     throw requestStatus.thenable;
// }

// export default PaginaLogin


export default class PaginaLogin extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            algumaCoisa: {}
        }
    }
        render () {
            return(

                <div>
                    <h1>
                       <Login/>
                       <Link to="/home">
                           <Botao />
                       </Link>
                       

                       
                    </h1>
                </div>

            )
        }
    
}