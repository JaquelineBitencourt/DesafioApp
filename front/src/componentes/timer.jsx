import React, { Component } from 'react';
import {HubConnectionBuilder } from '@aspnet/signalr';
import axios from 'axios'
import moment from 'moment'
import './timer.css'
class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            CR_Tempo: 0,
            Conexao_WS: "https://evolucaodesenv.safeweb.com.br/Ximas/XimasWS/WebSocket",
            //http://localhost:5001/WebSocket
            //https://evolucaodesenv.safeweb.com.br/Ximas/XimasWS/WebSocket
            Conexao_API: "https://evolucaodesenv.safeweb.com.br/Ximas/XimasApi/Api/Usuario/"
            //https://localhost:44327/api/Usuario/
            //https://evolucaodesenv.safeweb.com.br/Ximas/XimasApi/Api/Usuario/
        };
    }

    MostrarLoading = () => {
        this.setState({ loading: true })
    }


    EsconderLoading = (tempo) => {
        setTimeout(() => {
            this.setState({ loading: false })
        }, tempo);
    }

    componentWillMount() {
        this.MostrarLoading()
        const conexao_WebSocket = new HubConnectionBuilder()
            .withUrl(this.state.Conexao_WS)
            .build();

        this.setState({ WebSocket: conexao_WebSocket });


    }

    componentDidMount() {

        // ########### CRONOMETRO ----------------
        this.state.WebSocket.start() // -> espera a conexão estabilizar
            .then(() => {
                this.state.WebSocket.invoke("AtualizaCronometro");

                // Lógica do cronometro no front
                setInterval(function (_this) {
                    let t = _this.state.CR_Tempo;
                    if (t > 0) {
                        t--;
                        _this.setState({ CR_Tempo: t });
                    }
                    else {
                        _this.state.WebSocket.invoke("AtualizaCronometro");
                    }

                    if(_this.state.CR_Tempo === 0){
                        // let id = localstorage.getItem("idUsuario")
                        // let user = {
                        //     idUsuario: id
                        // }
                        axios.get(_this.state.Conexao_API + "ProximoChimarreando")
                        .then(res => {
                            _this.state.WebSocket.invoke("BuscaUsuario")
                        })
                    }
                }, 1000, this);

                // Mantém cronometro idêntico ao servidor
                setInterval(function (_this) {
                    let _requisicoes = _this.state.CR_Requisicoes;
                    _requisicoes++;

                    _this.setState({ CR_Requisicoes: _requisicoes });
                    _this.state.WebSocket.invoke("AtualizaCronometro");
                }, 10000, this);
            });

        this.state.WebSocket.on("CR_RecebeTempoAtualizado", data => {
            let _tempo = this.state.CR_Tempo;
            let tempo = data;
            if (!(_tempo === tempo || _tempo === tempo + 1 || _tempo === tempo - 1) || tempo === 0) {
                this.setState({ CR_Tempo: tempo });
            }
        });

        this.ResetaCronometro = function () {
            this.state.WebSocket.invoke("ResetaCronometro");
        }
    }

    render() {
        var tempo = moment("2015-01-01").startOf('day')
            .seconds(this.state.CR_Tempo)
            .format('mm:ss');
        return (
            <div className='timer'>
                <div id="cronometro" >{tempo}</div>
                {/* <div id="requisicoes" >{this.state.CR_Requisicoes}</div> */}

                {/*  <button onClick={() => this.ResetaCronometro()}>RESETAR</button> */}

                {/* <div id="chat">{this.state.CH_Chat}</div> */}
                {/* 
                <input onChange={(e) => this.InputAlteracaoTexto(e)} />
                <button onClick={() => this.ChatEnviaMensagem()}>Enviar</button> */}
            </div>
        );
    }
}

export default Chat;
