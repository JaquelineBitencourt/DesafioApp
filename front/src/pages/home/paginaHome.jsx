import React from 'react'
import { Link , withRouter} from 'react-router-dom'
import axios from 'axios'
import Timer from '../../componentes/timer'


class PaginaHome extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            pessoa: {
                nome: null,
                idade: null
            },
            pessoapost: {
                nome: null,
            },
            segundos: '00',
            minutos:''
        }
    }

    render() {
        return (
            <div>
                <Timer/>
                <h1>
                </h1>
            </div>
        )
    }

    componentWillMount(){
        // let user = localStorage.getItem("login")
        // if(user == null){
        //     console.log("teste",user)
        //     this.props.history.push("/");
        // }
    }
    // exemplo de como consumir api
    componentDidMount() {
        let user = localStorage.getItem("login")
        if(user == null){
            console.log("teste",user)
            this.props.history.push("/");
        }
        // axios.get('https://localhost:44327/api/autenticar/dsa')
        //     .then(res => {
        //         let pessoas = this.state.pessoa
        //         pessoas.nome = res.data.nomeDoUsuario;
        //         this.setState({ pessoa: pessoas })
        //     })


        // let NomeDoUsuario = "Henrique Oliveira Ferreira"
        // axios.post('https://localhost:44327/api/autenticar/validaNomeUsuario', {NomeDoUsuario})
        // .then(res => {
        //     let pessoapost = this.state.pessoapost
        //     pessoapost.nome = res.data;
        //     this.setState({ pessoapost : pessoapost})
        // })
    }



}export default withRouter(PaginaHome)