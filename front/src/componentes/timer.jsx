import React, {Component} from 'react'



export default class timer extends Component{
    constructor(props){
        super(props)

        this.state = {
            minutos: '05',
            segundos: '00'
        }

        this.segundosRestantes = 0;

        
        this.intervalo = 0;
        this.passarSegundo = this.passarSegundo.bind(this);
        this.IniciarContador = this.IniciarContador.bind(this);
    }

    //Passa cada segundo do timer
    passarSegundo(){
        let min = Math.floor(this.segundosRestantes / 60)
        let sec = this.segundosRestantes - (min * 60);
        this.setState({
            minutos: min,
            segundos: sec
        })
        if(sec < 10){
            this.setState({segundos: "0" + this.state.segundos})
        }
        if (min < 10) {
            this.setState({minutos: "0" + this.state.minutos})
        }
        if(this.segundosRestantes < 0){
            clearInterval(this.intervalo);
            this.setState({
                tempo:"300",
                minutos: '05',
                segundos: '00'
            })
            this.IniciarContador()
        }

        this.segundosRestantes--;

    }



    handleChange(e){
        this.setState({tempo: e.target.value})
    }

    IniciarContador(){
        this.intervalo = setInterval(this.passarSegundo, 1000)
        let time = this.state.minutos;
        this.segundosRestantes = time * 60 + parseInt(this.state.segundos)  ;
    }

    componentDidMount(){
        this.IniciarContador()
    }

    render(){
        const {minutos} = this.state
        const {segundos} = this.state
        return(
            <div>
                <h1  onChange={e => this.handleChange(e)}>
                    {minutos} : {segundos}
                </h1>
                
            </div>

        )
    }
}

