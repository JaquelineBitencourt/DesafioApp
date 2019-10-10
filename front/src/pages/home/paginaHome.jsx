import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import Timer from '../../componentes/timer'



class PaginaHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pessoa: {
                // nome: null,
                // idade: null,
                listaDeUsuarios: [],
                error: null
            },
            pessoapost: {
                nome: null,
            },
            segundos: '00',
            minutos: ''
        }
    }


    componentWillMount() {
        // let user = localStorage.getItem("login")
        // if(user == null){
        //     console.log("teste",user)
        //     this.props.history.push("/");
        // } 
        this.buscaUsuarios();
  

    }

    buscaUsuarios = () => {
        axios.get('https://localhost:44327/api/autenticar/dsa')
        .then(result => {                            

            let state = this.state;
            state.pessoa.listaDeUsuarios = result.data;
            this.setState(state);
         
        },

            (error) => {
                // this.setState({ error });
            })
    }

    // exemplo de como consumir api
    componentDidMount() {

        let NomeDoUsuario = "Henrique Oliveira Ferreira"

        axios.post('https://localhost:44327/api/autenticar/validaNomeUsuario', { NomeDoUsuario })
            .then(result => {
                let pessoapost = this.state.pessoapost
                pessoapost.nome = result.data;
                this.setState({ pessoapost: pessoapost })
            })
        

    }

    render() {
return(



        <div>
            <Timer/>
            
                    {this.state.pessoa.listaDeUsuarios.map((usuario) => (
                     <p>{usuario.nomeDoUsuario}</p>))}


               

        </div>
)
        

    }


}
export default withRouter(PaginaHome)