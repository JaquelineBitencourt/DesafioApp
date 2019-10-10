import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import Timer from '../../componentes/timer'
import BotaoTerminei from '../../componentes/botaoTerminei'



class PaginaHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pessoa: {
                listaDeUsuarios: [],
                error: null,
                botaoTerminar: false,
                filaDoChimas: true
            },
            pessoapost: {
                nome: null,
            },
            segundos: '00',
            minutos: ''
        }
    }


    componentWillMount() {
        let user = localStorage.getItem("login")
        if (user == null) {
            console.log("teste", user)
            this.props.history.push("/");
        }
        this.buscaUsuarios();


    }

    buscaUsuarios = () => {
        axios.get('https://localhost:44327/api/autenticar/buscaUsuarios')
            .then(result => {

                let state = this.state;
                state.pessoa.listaDeUsuarios = result.data;
                this.setState(state);

            },

                (error) => {
                    // this.setState({ error });
                })
    }

    // terminarChimas = () => {
    // }


    // exemplo de como consumir api
    // componentDidMount() {

    //     let NomeDoUsuario = "Henrique Oliveira Ferreira"

    //     axios.post('https://localhost:44327/api/autenticar/validaNomeUsuario', { NomeDoUsuario })
    //         .then(result => {
    //             let pessoapost = this.state.pessoapost
    //             pessoapost.nome = result.data;
    //             this.setState({ pessoapost: pessoapost })
    //         })

    // }


    componentDidMount() {

        let NomeDoUsuario = ""

        axios.post('https://localhost:44327/api/autenticar/LogaUsuario', { NomeDoUsuario })
            .then(result => {
                let pessoapost = this.state.pessoapost
                pessoapost.nome = result.data;
                this.setState({ pessoapost: pessoapost })
            })

        axios.post('https://localhost:44327/api/autenticar/LogaUsuario', { NomeDoUsuario })
            .then(result => {
                let pessoapost = this.state.pessoapost

                console.log(result);

                // pessoapost.nome = result.data;
                // this.setState({ pessoapost: pessoapost })
            })

    }


    render() {
        return (
            <div>
                <Timer />
                {/* Aqui estou exibindo apenas os usuários logados na tela */}
                {this.state.pessoa.listaDeUsuarios.map((usuario) => (
                    <p>{!!usuario.logado && usuario.nomeDoUsuario} </p>))}







            </div>
        )
    }

}
export default withRouter(PaginaHome)