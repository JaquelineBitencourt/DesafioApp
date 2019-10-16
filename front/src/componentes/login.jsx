
import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
//import Row from 'react-bootstrap/Row'
import {Redirect, Link, withRouter } from 'react-router-dom'

class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            nome:'',
            digitarNome: '',
           
           
        }

    }

    handleChange(e){
        this.setState({nome: e.target.value})
        
    }
    
    handleSubmit(e){
        e.preventDefault()
        let NomeDoUsuario = this.state.nome
        axios.post('https://localhost:44327/api/autenticar/LogaUsuario', {NomeDoUsuario})
        .then(res => {
            console.log("res", res)
            if(res.data.logado === true){
                console.log("ta no if")
                localStorage.setItem("login", NomeDoUsuario);
                this.props.history.push("/home");
            }
            console.log("oi")
        })
    }


    

    render() {
     
        const {nome} = this.state
        return(
            
            <div id="centralizar">
                <Form  onSubmit={e => this.handleSubmit(e)}>
                    <Form.Group as={Col} md='5' id="componenteLogin" >
                        <Col>
                            <h1 id="tituloCentro">Login do Chimas</h1>
                            <Form.Control placeholder='Digite seu nome' id="nomeUsuario" value={nome} onChange={e => this.handleChange(e)}/>
                        </Col>
                        <Button variant="primary" type="submit" id="botaoEntrar" size="lg">Entrar</Button>
                    </Form.Group>
                </Form>
                
            </div>
        )
    }

}

export default withRouter(Login);