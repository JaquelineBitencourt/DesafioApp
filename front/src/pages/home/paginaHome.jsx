import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Timer from '../../componentes/timer'
import { HubConnectionBuilder } from '@aspnet/signalr'
import './paginaHome.css'
import WebSocket from '../../componentes/websocket'
import moment from 'moment'
import Carregando from '../../componentes/loader'


class PaginaHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listaDeUsuarios: [],
            WebSocket: null,
            timer: null
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

        let usuario = {
            IdUsuario: id
        }

        // axios.post('https://localhost:44327/api/Usuario/BuscaUsuarioUnico', usuario)
        // .then(res =>{
        //     console.log(res.data)

        // })


        const conexao_WebSocket = new HubConnectionBuilder()
            .withUrl("http://localhost:5001/WebSocket")
            .build();

        this.setState({ WebSocket: conexao_WebSocket })

        conexao_WebSocket.start() // -> espera a conexão estabilizar
            .then(() => {
                conexao_WebSocket.invoke("AtualizaDeslogados");
            });


        //logica de redirecionamento quando nao esta logado
        let user = localStorage.getItem("login")
        if (user == null) {
            this.props.history.push("/");
        }
    }




    componentDidMount() {
        setInterval(function (_this) {
            _this.state.WebSocket.invoke("AtualizaDeslogados");
        }, 10000, this);

        this.state.WebSocket.on("ReafirmouLogados", data => {
            this.state.WebSocket.invoke("BuscaUsuario");

        })

        this.state.WebSocket.on("RetornoDeslogados",
            data => {
                let id = window.localStorage.getItem("idUsuario")
                this.state.WebSocket.invoke("ReafirmaLogados", id);
            });

        this.state.WebSocket.on("RespostaBuscaUsuario",
            data => {
                this.setState({ listaDeUsuarios: data });
            });
    }

    btnProximo = () => {
        this.MostrarLoading();
        axios.get('https://localhost:44327/api/Usuario/ProximoChimarreando')
            .then(res => {
                this.EsconderLoading(3000);
            })
        this.state.WebSocket.invoke("BuscaUsuario");
        this.state.WebSocket.invoke("ResetaCronometro")
    }

    btnSetaChimarreando = (idUsuario) => {
        let parametroChimarreando = {
            IdUsuario: idUsuario
        }

        axios.post('https://localhost:44327/api/Usuario/SetaChimarreando', parametroChimarreando)
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

        axios.post('https://localhost:44327/api/Usuario/DeslogaUsuario', user)
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
            <div className="section">
                {/* <WebSocket onRef={ref => (this.webSocket = ref)} webSocket={ref => (this.wsWebSocket = ref)} /> */}
                <div className="header">
                    <a href="#" className="logo" ><img src="img\logoChimas.png" alt=""/></a>
                    <div className="header-right">
                        <a className="#active" href="#"></a>
                        <a href="#sair"></a>
                    </div>
                </div>
                <div className="col-md-12">
                <h1>Roda de Chimarrão</h1>                
                </div>
                <div className="listaParticipantes">
                <Timer />
                <Carregando loading={this.state.loading} />
                {/* <Chimarreador />     */}
               <ul>
                    {/* Exibindo apenas os usuários logados na tela  */}
                    {this.state.listaDeUsuarios.map((usuario, index) => (
                        <a key={index}>
                            {(usuario.logado && usuario.chimarreando) &&
                            <li style={{ color: '#F2E205', backgroundColor:'#1fb562'}}><img src="img\peopleAmarelo.png" alt="pessoaAmarelo"/> {usuario.nomeDoUsuario} </li>
                               // <li style={{ color: '#F2E205', backgroundColor:'green' }}> {usuario.nomeDoUsuario} </li>
                            }

                            {(usuario.logado && !usuario.chimarreando) &&
                             <li style={{ color: '#02732A' }}><img src="img\peopleVerde.png" alt="pessoaVerde" style={{left:'50%'}}/> {usuario.nomeDoUsuario}
                                {/* <li style={{ color: '#02732A' }}> {usuario.nomeDoUsuario}</li> */}
                                <input type="button" value="Setar chimarreando" 
                                onClick={() => { this.btnSetaChimarreando(usuario.idUsuario) }} /></li>
                            }
                        </a>
                    ))}
                </ul>

                <div className="botao">
                    <p> <input type="button" value="Próximo" onClick={() => this.btnProximo()} /></p>
                     <button onClick={() => this.btnDeslogar()}>Deslogar</button>
                {/* <button onClick={() => this.btnTeste()}>Teste</button> */}

                </div>
               
                <div className="footer">&copy;Footer</div> 
               
            </div >



            </div >

        )
    }
}
export default withRouter(PaginaHome)