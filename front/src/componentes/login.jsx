
import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
//import Row from 'react-bootstrap/Row'

export default class Login extends React.Component{
    constructor(props){
        super(props)

    }

    render(){
        return(
            <div id="centralizar">
                <Form>
                    <Form.Group as={Col} md='5' id="componenteLogin">
                        <Col>
                            <h1 id="tituloCentro">Login do Chimas</h1>
                            <Form.Control placeholder='Digite seu nome' id="nomeUsuario"/>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}