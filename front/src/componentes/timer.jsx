import React, { Component } from 'react';
import WebSocket from '../componentes/websocket'
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { getOuterBindingIdentifiers } from '@babel/types';
import axios from 'axios'

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nick: '',
            message: '',
            messages: [],

            WebSocket: null,
            CR_Tempo: 0,
            CR_Requisicoes: 0,

            wsChat: null,
            CH_Chat: [],
            CH_Mensagem: '',

            Identificador: null
        };
    }

    GeraIdentificador = function () {
        let Guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

        this.setState({ Identificador: Guid });
    }

    componentWillMount() {
        const conexao_WebSocket = new HubConnectionBuilder()
            .withUrl("http://localhost:5001/WebSocket")
            .build();

        this.setState({ WebSocket: conexao_WebSocket });
    }

    componentDidMount() {
        this.GeraIdentificador();

        // ########### CRONOMETRO ----------------
        this.state.WebSocket.start() // -> espera a conexão estabilizar
            .then(() => {
                this.state.WebSocket.invoke("EstouLogado", this.state.Identificador);
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

                    // if(_this.state.CR_Tempo == 0){
                    //     axios.get('https://localhost:44327/api/Usuario/ProximoChimarreando')
                    //     .then(res => {
            
                    //     })
                    // }
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
            if (!(_tempo == tempo || _tempo == tempo + 1 || _tempo == tempo - 1) || tempo == 0) {
                this.setState({ CR_Tempo: tempo });
            }
        });

        this.state.WebSocket.on("CR_SolicitaLogados", () => {
            this.state.WebSocket.invoke("ReafirmaLogado", this.state.Identificador);
        });

        this.ResetaCronometro = function () {
            this.state.WebSocket.invoke("ResetaCronometro");
        }
    }

    render() {
        return (
            <div>
                <div id="cronometro" >{this.state.CR_Tempo}</div>
                {/* <div id="requisicoes" >{this.state.CR_Requisicoes}</div> */}

                {/* <button onClick={() => this.ResetaCronometro()}>RESETAR</button> */}

                {/* <div id="chat">{this.state.CH_Chat}</div> */}
{/* 
                <input onChange={(e) => this.InputAlteracaoTexto(e)} />
                <button onClick={() => this.ChatEnviaMensagem()}>Enviar</button> */}
            </div>
        );
    }
}

export default Chat;
