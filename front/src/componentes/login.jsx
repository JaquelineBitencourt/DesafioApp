
import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
//import Row from 'react-bootstrap/Row'

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
    constructor(props){
        super(props)
>>>>>>> 093ea430256c985430a4464de9107c651778053f

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