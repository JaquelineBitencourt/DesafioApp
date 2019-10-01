import React from 'react'
import Button from '../../componentes/botoes'
import { Link } from 'react-router-dom'
import { REQUEST } from '../../requestModuleReact';

const PaginaHome = () => (
    <div>
        <Link to="/">
            <Button />
        </Link>
        {/* <React.Suspense fallback={<span>Carregando...</span>}>
            <Cachorro id="meu-cachorro"></Cachorro>
        </React.Suspense> */}

        <React.Suspense fallback={<span>Carregando...</span>}>
        <Teste />
        </React.Suspense>

    </div>

)
export default PaginaHome

// function Cachorro(props) {
//     //Imagem do Cachorro:
//     let dogImage;

//     //OK
//     let callback_OK = (response) => {
//         let url = response.message;
//         dogImage = <img src={url} />;
//     }

//     //Error:
//     let callback_Error = (response) => {
//         dogImage = <h1>deu ruim</h1>
//     }

//     //Chamar API:
//     REQUEST.Get('https://dog.ceo/api/breeds/image/random', callback_OK, callback_Error)

//     //Retorno:
//     return dogImage;
// }

let cache = {}

function Teste(props) {
    let requestStatus = cache[props.id];
    if (requestStatus && requestStatus.done) {
        return <div>{requestStatus.data.nome}, {requestStatus.data.idade}</div>;
    }

    else if (requestStatus && !requestStatus.done) {
        throw requestStatus.thenable;
    }
        cache[props.id] = REQUEST.Get('https://localhost:44327/api/autenticar/dsa')
        throw cache[props.id].thenable;
}