import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Timer from '../../componentes/timer'
import { HubConnectionBuilder } from '@aspnet/signalr'
import './paginaHome.css'
import Carregando from '../../componentes/loader'


class PaginaHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pessoa: {
                listaDeUsuarios: [],
                error: null,
                botaoTerminar: false,
                nome: ''              
            },

            pessoapost: {
                nome: null
            },

            segundos: '00',
            minutos: '',
            wsTerminar: null,
            loading: true   
              
            
        }
    }

    MostrarLoading = () => this.setState({ loading: true })

  
    EsconderLoading = (tempo) => { setTimeout(() => {
        this.setState({loading: false})
      }, tempo);
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
        this.EsconderLoading(2000);
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
        })
        

        this.logaUsuario();

        this.state.wsTerminar.on("RespostaBuscaUsuario",
            data => {
                
                let _p = this.state.pessoa;
                _p.listaDeUsuarios = data;
                
                this.setState({pessoa:_p});
                
            });

            
    }



    logaUsuario = () => {
        let NomeDoUsuario = ""
        
        axios.post('https://localhost:44327/api/autenticar/LogaUsuario', { NomeDoUsuario })
            .then(result => {
                let pessoapost = this.state.pessoapost
                pessoapost.nome = result.data;
                this.setState({ pessoapost: pessoapost })
                this.EsconderLoading(1000);
                this.buscaUsuarios();
            })
    }

    
    
    btnProximo = () => {         
        this.MostrarLoading();               
        axios.get('https://localhost:44327/api/autenticar/ProximoChimarreando')
        .then(res => {
        this.EsconderLoading(1000);
            
            
        })
        
        this.state.wsTerminar.invoke("BuscaUsuario");
        
    }


    btnSetaChimarreando = (idUsuario) => {
        let parametroChimarreando = {
            IdUsuario: idUsuario
        }

        axios.post('https://localhost:44327/api/autenticar/SetaChimarreando', parametroChimarreando)
            .then(result => {                
                this.buscaUsuarios();
            })
    }



    render() {        
        return (         
            
            <div>
                <Timer /> 
                <Carregando loading={this.state.loading}/>
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
                                <p style={{ color: 'red' }}> {usuario.nomeDoUsuario} <input type="button" value="Chimarrear" onClick={() => { this.btnSetaChimarreando(usuario.idUsuario) }} /> </p>
                            }
                        </a>
                    ))}
                </ul>
                <p> <input type="button" value="Próximo" onClick={() => this.btnProximo()}/></p>
                
            </div >
            
        )
    }

}
export default withRouter(PaginaHome)