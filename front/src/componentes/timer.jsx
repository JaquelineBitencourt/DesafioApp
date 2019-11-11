import React, { Component } from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';
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
                        _this.resetaProgresso(_this.state.CR_Tempo);
                    }

                    if (_this.state.CR_Tempo === 0) {
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
                this.resetaProgresso(tempo);
                this.setState({ CR_Tempo: tempo });
            }
        });

        this.resetaProgresso = function (tempo) {
            let delay = 2;
            tempo = Math.trunc((tempo - 4 - delay) / 2);
//================ Remove o progresso =========================================
            window.$(".progress .progress-right .progress-bar").remove();
            window.$(".progress .progress-left .progress-bar").remove();

//================ Cria um id com o tempo atual ================================
            let idTemporario = 'idTemp_' + tempo;

//================ Cria o estilo da Animação e adiciona no " head" do html ======
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = '.progress .progress-right .progress-bar.' + idTemporario + 'Animation {animation: loading ' + tempo + 's linear forwards;} .progress .progress-left .progress-bar.' + idTemporario + 'Animation {animation: loading ' + tempo + 's linear forwards ' + tempo + 's;}';
            document.getElementsByTagName('head')[0].appendChild(style);

//================ Adiciona a Animação no span do html  ===========================
            window.$(".progress .progress-right").html('<span class="progress-bar" id="' + idTemporario + 'Right"></span>');
            window.$(".progress .progress-left").html('<span class="progress-bar" id="' + idTemporario + 'Left"></span>');

//================ Adiciona a Animação para o próximo chimarreando ==================
            setTimeout((_id) => {
                window.$("#" + _id + "Right").addClass(_id + 'Animation');
                window.$("#" + _id + "Left").addClass(_id + 'Animation');
            }, (delay * 1000), idTemporario);
        }

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
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-3 col-sm-6">
                            <div className="progress blue">
                                <span className="progress-left">
                                    <span className="progress-bar"></span>
                                </span>
                                <span className="progress-right">
                                    <span className="progress-bar"></span>
                                </span>
                                <div className="progress-value"><div id="cronometro" >{tempo}</div></div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* <div id="cronometro" >{tempo}</div> */}
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
