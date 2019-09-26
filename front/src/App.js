import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from './componentes/login'

class App extends Component {
  constructor () {
    super ()
    this.state = {

    }
  }
}


// Não terminei ainda...
handleLogin (e) {
  const value = e.target.value //Aqui pega o valor digitado no campo nome
  const keyCode = e.wich || e.keyCode //Verifica qual tecla foi pressionada
  const ENTER = 13 //Valor 13 significa que a tecla ENTER foi pressionada


if (keyCode === ENTER) {
  this.setState()
}
}



function App() {
  return (
    <div className="App">

    </div>
  );
}



export default App;
