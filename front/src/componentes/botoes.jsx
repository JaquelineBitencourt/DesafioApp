
import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'

export default class Botao extends Component{
    constructor(props){
        super(props)

    }

    render(){
        return(
            <div id="linhaBotaoCentro">
                <Button variant="primary" type="submit" id="botaoCentro" size="lg">Entrar</Button>
            </div>
        )
    }
}
