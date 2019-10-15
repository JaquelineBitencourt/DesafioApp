import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import Timer from '../../componentes/timer'
import './paginaHome.css'





class PaginaHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pessoa: {
                listaDeUsuarios: [],
                error: null,
                botaoTerminar: false,               
                nome:'',
                                       
     
            },
            pessoapost: {
                nome: null                
            },
            segundos: '00',
            minutos: ''
            
        }
    }


    componentWillMount() {
        // let user = localStorage.getItem("login")
        // if (user == null) {
        //     console.log("teste", user)
        //     this.props.history.push("/");
        // }

        this.buscaUsuarios();

    }

    buscaUsuarios = () => {
        axios.get('https://localhost:44327/api/autenticar/BuscaUsuarios')
            .then(result => {

                let state = this.state;
                state.pessoa.listaDeUsuarios = result.data

                this.setState(state);

            },

                (error) => {
                    // this.setState({ error });
                })

                
    }


    componentDidMount() {      

        // let NomeDoUsuario = ""

        
        axios.post('https://localhost:44327/api/autenticar/LogaUsuario', { NomeDoUsuario })
            .then(result => {
                let pessoapost = this.state.pessoapost
                pessoapost.nome = result.data;
                this.setState({ pessoapost: pessoapost })

              
            })

    }


    render() {  
        
        return (
            
            <div className="pgnListaUsuarios">
                <Timer />                        
                {/* <Chimarreador />     */}
                <h3>Lista de participantes da roda do chimarrão</h3>
                
               <ul>                   
                 {/* Exibindo apenas os usuários logados na tela  */}
                {this.state.pessoa.listaDeUsuarios.map((usuario, index) => (                    
                    <a key = {index}>                        
                    <p>{!!usuario.logado && usuario.chimarreando==false && usuario.nomeDoUsuario}</p>
                    
                    {/* O usuário que está com a cuia na mão fica com a cor verde  */}
                    <p style={{color: 'green'}}>{usuario.chimarreando && usuario.nomeDoUsuario}</p></a> 
                    ))}      
                </ul> 
                <p> <input type="button" value="Próximo" onClick={this.btnProximo}/></p>
               
            </div>

        )
    }

}
export default withRouter(PaginaHome)