import React from 'react'
import Botao from '../../componentes/botoes'
import { Link } from 'react-router-dom'
import { REQUEST } from '../../requestModuleReact';
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
                        idade : {this.state.pessoa.idade} <br></br>
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
                pessoas.nome = res.data.nome;
                pessoas.idade = res.data.idade;
                this.setState({ pessoa: pessoas })
            })


        let sobrenome = "Henrique Oliveira Ferreira"
        axios.post('https://localhost:44327/api/autenticar/asd', {sobrenome})
        .then(res => {
            let pessoapost = this.state.pessoapost
            pessoapost.nome = res.data;
            this.setState({ pessoapost : pessoapost})
        })
    }

}