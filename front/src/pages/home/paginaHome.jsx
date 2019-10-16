import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import Timer from '../../componentes/timer'
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import './paginaHome.css'



class PaginaHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pessoa: {
                listaDeUsuarios: [],
                error: null,
                botaoTerminar: false,
                nome: '',
                chimarreador: ''


            },
            pessoapost: {
                nome: null
            },
            segundos: '00',
            minutos: '',
            wsTerminar: null
        }
    }


    componentWillMount() {
        const conexao_wsTerminar = new HubConnectionBuilder()
            .withUrl("http://localhost:5001/Usuario")
            .build();

        this.setState({ wsTerminar: conexao_wsTerminar });

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

        this.state.wsTerminar.start() // -> espera a conexão estabilizar
        .then(() => {
            this.state.wsTerminar.invoke("BuscaUsuario");
        });

        this.logaUsuario();

        this.state.wsTerminar.on("RespostaBuscaUsuario",
            data => {
                console.log("chegouaqui", data)
                let _p = this.state.pessoa;
                _p.listaDeUsuarios = data;
                
                this.setState({pessoa:_p});
                console.log(this.state.pessoa)
            });
    }



    logaUsuario = () => {
        let NomeDoUsuario = ""


        axios.post('https://localhost:44327/api/autenticar/LogaUsuario', { NomeDoUsuario })
            .then(result => {
                let pessoapost = this.state.pessoapost
                pessoapost.nome = result.data;
                this.setState({ pessoapost: pessoapost })

                this.buscaUsuarios();
            })

    }

    btnProximo = () => {
        
        axios.get('https://localhost:44327/api/autenticar/ProximoChimarreando')
        .then(res => {

        })
        this.state.wsTerminar.invoke("BuscaUsuario");
    }




    btnSetaChimarreando = (idUsuario) => {

        let parametroChimarreando = {
            IdUsuario: idUsuario
        }

        axios.post('https://localhost:44327/api/autenticar/SetaChimarreando', parametroChimarreando)
            .then(result => {
                // let chimarreador = this.state.chimarreador
                // let a = result.data;

                this.buscaUsuarios();
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
                        <a key={index}>
                            {(usuario.logado && usuario.chimarreando) &&
                                < p style={{ color: 'green' }}> {usuario.nomeDoUsuario} </p>
                            }

                            {(usuario.logado && !usuario.chimarreando) &&
                                <p style={{ color: 'red' }}> {usuario.nomeDoUsuario} <input type="button" value="Setar chimarreando" onClick={() => { this.btnSetaChimarreando(usuario.idUsuario) }} /> </p>
                            }
                        </a>
                    ))}
                </ul>
                <p> <input type="button" value="Próximo" onClick={() => this.btnProximo()} /></p>

            </div >

        )
    }

}
export default withRouter(PaginaHome)