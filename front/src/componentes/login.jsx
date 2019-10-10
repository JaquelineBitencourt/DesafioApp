
import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
//import Row from 'react-bootstrap/Row'
import {Redirect, Link, withRouter } from 'react-router-dom'

<<<<<<< HEAD
<<<<<<< HEAD
const Login = () => (
    <div id='centralizar'>
        <Form>
            <Form.Group as={Col} md='3' id="componenteLogin" controlId='formHorizontal'>
                <Col >
                    <h1 id="tituloCentro">Login do Chimas</h1>
                    <Form.Control placeholder='Digite seu nome' />
                </Col>
            </Form.Group>
        </Form>
    </div>
)
=======
export default class Login extends React.Component{
=======
class Login extends Component{
>>>>>>> 261a6311435c90aa5c8cfcf7ed11a8e8af272215
    constructor(props){
        super(props)
>>>>>>> 093ea430256c985430a4464de9107c651778053f

        this.state = {
            nome: ""
        }

    }

    handleChange(e){
        this.setState({nome: e.target.value})
    }
    handleSubmit(e){
        e.preventDefault()
        console.log(this.state.nome)
        let NomeDoUsuario = this.state.nome
        axios.post('https://localhost:44327/api/autenticar/UsuarioLogado', {NomeDoUsuario})
        .then(res => {
            if(res.data == true){
                localStorage.setItem("login", NomeDoUsuario);
                this.props.history.push("/home");
            }
        })
    }
    

    render(){
        const {nome} = this.state
        return(
            <div id="centralizar">
                <Form  onSubmit={e => this.handleSubmit(e)}>
                    <Form.Group as={Col} md='5' id="componenteLogin" >
                        <Col>
                            <h1 id="tituloCentro">Login do Chimas</h1>
                            <Form.Control placeholder='Digite seu nome' id="nomeUsuario" value={nome} onChange={e => this.handleChange(e)}/>
                        </Col>
                        <Button variant="primary" type="submit" id="botaoCentro" size="lg">Entrar</Button>
                    </Form.Group>
                </Form>
                
            </div>
        )
    }
}

export default withRouter(Login);