import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Timer from '../../componentes/timer'
import { HubConnectionBuilder } from '@aspnet/signalr'
import './paginaHome.css'
import Carregando from '../../componentes/loader'
import logoChimas from '../../assets/img/logoChimas.png'
import setaChimarreando from '../../assets/img/setaChimarreando.png'
import pessoaAmarelo from '../../assets/img/peopleAmarelo.png'
import logoff from '../../assets/img/logoff.png'



class PaginaHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            connectionId: null,
            listaDeUsuarios: [],
            WebSocket: null,
            timer: null,
            Conexao_WS: "https://evolucaodesenv.safeweb.com.br/Ximas/XimasWS/WebSocket",
            //http://localhost:5001/WebSocket
            // https://evolucaodesenv.safeweb.com.br/Ximas/XimasWS/WebSocket
            Conexao_API: "https://evolucaodesenv.safeweb.com.br/Ximas/XimasApi/Api/Usuario/",
            //https://localhost:44327/api/Usuario/
            // https://evolucaodesenv.safeweb.com.br/Ximas/XimasApi/Api/Usuario/


        }
    }

    MostrarLoading = () => this.setState({ loading: true })


    EsconderLoading = (tempo) => {
        setTimeout(() => {
            this.setState({ loading: false })
        }, tempo);
    }



    componentWillMount() {
        let id = localStorage.getItem("idUsuario")

        const conexao_WebSocket = new HubConnectionBuilder()
            .withUrl(this.state.Conexao_WS)
            .build();

        this.setState({ WebSocket: conexao_WebSocket })

        conexao_WebSocket.start() // -> espera a conexão estabilizar
            .then(() => {
                conexao_WebSocket.invoke("GetConnectionId")
                conexao_WebSocket.invoke("BuscaUsuario");
            });

        conexao_WebSocket.on("RespostaConnectionId", data => {
            let objUser = {
                IdUsuario: id,
                ConnectionId: data
            }
            axios.post(this.state.Conexao_API + "SetaConnectionId", objUser)
                .then(() => {
                    this.state.WebSocket.invoke("BuscaUsuario")
                })

            this.setState({ connectionId: data })
        })


        //logica de redirecionamento quando nao esta logado
        let user = localStorage.getItem("login")
        if (user == null) {
            this.props.history.push("/");
        }
    }




    componentDidMount() {

        this.state.WebSocket.on("Disconectou", () => {
            this.state.WebSocket.invoke("BuscaUsuario")
        })

        this.state.WebSocket.on("Conectou", () => {
            console.log("oi")
            this.state.WebSocket.invoke("BuscaUsuario")
        })

        this.state.WebSocket.on("RespostaBuscaUsuario",
            data => {
                this.setState({ listaDeUsuarios: data });
            });
    }

    btnProximo = () => {
        this.MostrarLoading()

        setTimeout(function (_this) {
            _this.EsconderLoading(1000)
        }, 1000, this)
        // this.MostrarLoading();
        // axios.get('https://localhost:44327/api/Usuario/ProximoChimarreando')
        //     .then(res => {
        //         this.state.WebSocket.invoke("BuscaUsuario");
        //         this.state.WebSocket.invoke("ResetaCronometro")
        //         this.EsconderLoading(1000);
        this.state.WebSocket.invoke("ResetaCronometro")

    }

    btnSetaChimarreando = (idUsuario) => {
        let parametroChimarreando = {
            IdUsuario: idUsuario
        }

        axios.post(this.state.Conexao_API + "SetaChimarreando", parametroChimarreando)
            .then(result => {
                // let chimarreador = this.state.chimarreador
                // let a = result.data;
                this.state.WebSocket.invoke("BuscaUsuario")
            })
    }

    btnDeslogar = () => {
        let id = localStorage.getItem("idUsuario")
        let user = {
            IdUsuario: id
        }

        axios.post(this.state.Conexao_API + "DeslogaUsuario", user)
            .then(res => {
                if (res.data === true) {
                    this.state.WebSocket.invoke("BuscaUsuario")
                    localStorage.removeItem("login")
                    localStorage.removeItem("idUsuario")
                    this.props.history.push("/");
                }
            })
    }

    render() {
        return (
            <div>
                {/* <WebSocket onRef={ref => (this.webSocket = ref)} webSocket={ref => (this.wsWebSocket = ref)} /> */}

                {/* Cabeçalho da página */}
                <header className="cabecalho">
                    
                        <img id="logoChimas" src={logoChimas} alt=""/>
                        {/* <a href="#" className="logo" ><img src={logoChimas} alt=""/></a> */}
                 
                    <div className="menu">
                        <div className="botao"> 
                                    <div className="navbar-header float-right">
                                        {/* Sair<img src={ logoff } onClick={() => this.btnDeslogar()}></img> */}
                                         <button type="button" id="btnSair" className="btn btn-primary"><img src={ logoff } style={{textAlign:'center'}} onClick={() => this.btnDeslogar()}></img></button>
                                    </div>
                            </div>
                        </div>
                </header>


                <main className="conteudo">
                    <div className="titulo">
                        <div className="container" >
                            <h1>Roda de Chimarrão</h1>                
                        </div>
                    </div>
                    
                 {/* O Css do relógio está em componentes -> timer.css */}
                    <ul className="list-group" id="listaParticipantes">
                    <Timer />
                    <Carregando loading={this.state.loading} />

                        {/* Exibindo apenas os usuários logados na tela  */}
                        {this.state.listaDeUsuarios.map((usuario, index) => (
                            <a key={index}>
                            {(usuario.logado && usuario.chimarreando) &&
                            <li className="list-group-item active"><img src={setaChimarreando} alt="pessoaQueEstaChimarreando"/> {usuario.nomeDoUsuario} </li>
                            }


                                    {(usuario.logado && !usuario.chimarreando) &&
                                    <li className="list-group-item"><img src={pessoaAmarelo} alt="pessoaAmarelo" /> {usuario.nomeDoUsuario}
                                    <button type="button" className="btn btn-outline-success"style={{left:'47%'}} onClick={() => { this.btnSetaChimarreando(usuario.idUsuario) }}>
                                        Chimarrear</button></li>
                                    }
                                </a>
                            ))}
                    </ul>

                
                    <div className="container" id="btnProximo">
                        <button type="button" class="btn btn-outline-success" onClick={() => this.btnProximo()}>Próximo</button>
                    </div>
               
                </main>
            </div >

        )
    }
}
export default withRouter(PaginaHome)