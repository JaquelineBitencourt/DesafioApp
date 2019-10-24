import React, { Component } from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';

class WebSocket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            webSocket: null,
            carregado: false
        };
    }

    componentWillMount() {
        this.props.onRef(undefined);
        this.conectaWebSocket();
    }

    componentDidMount() {
        this.props.onRef(this);
        this.props.webSocket(this.state.webSocket);
    }

    conectaWebSocket() {
        let wsConexao = this.state.webSocket;

        if (wsConexao === null) {
            const conexao_WebSocket = new HubConnectionBuilder()
                .withUrl("http://localhost:5001/WebSocket")
                .build();

            conexao_WebSocket.start().then(() => {
                this.setState({ carregado: true })
            });

            this.setState({ webSocket: conexao_WebSocket });
        }

        return this.state.webSocket;
    }

    render() {

        return (
            <div>
                WebSocket Carregado: {(this.state.carregado).toString()}
            </div>
        );
    }
}

export default WebSocket;
