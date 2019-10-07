import React from 'react'
import Botao from '../../componentes/botoes'
import { Link } from 'react-router-dom'
import axios from 'axios'



export default class PaginaHome extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            pessoa: {
                nome: null,
                idade: null
            },
            pessoapost: {
                nome: null,
            }
        }
    }

    render() {
        return (
            <div>
                <h1>
                    Deu Bom
                    <Link to="/">
                        <Botao />
                    </Link>
                        nome : {this.state.pessoa.nome} <br />
                        nome post : {this.state.pessoapost.nome} <br />
                </h1>
            </div>
        )
    }

    //exemplo de como consumir api
    componentDidMount() {
        axios.get('https://localhost:44327/api/autenticar/dsa')
            .then(res => {

                let pessoas = this.state.pessoa
                pessoas.nome = res.data.nomeDoUsuario;

                this.setState({ pessoa: pessoas })
            })


        let NomeDoUsuario = "Henrique Oliveira Ferreira"
        
        axios.post('https://localhost:44327/api/autenticar/validaNomeUsuario', {NomeDoUsuario})
        .then(res => {
            let pessoapost = this.state.pessoapost
            pessoapost.nome = res.data;
            this.setState({ pessoapost : pessoapost})
        })
    }

}