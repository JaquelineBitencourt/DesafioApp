
import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
//import Row from 'react-bootstrap/Row'

const Login = () => (
    <div id='centralizar'>
        <Form>
            <Form.Group as={Col} md='5' id="componenteLogin" controlId='formHorizontal'>
                <Col >
                    <h1 id="tituloCentro">Login do Chimas</h1>
                    <Form.Control placeholder='Digite seu nome' />
                </Col>
            </Form.Group>
        </Form>
    </div>
)

export default Login