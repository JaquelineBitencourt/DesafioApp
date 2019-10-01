let REQUEST = {

    Get: (urlApi, callbackOK, callbackError) => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === xhr.DONE) {
                let response = JSON.parse(xhr.responseText);
                switch (xhr.status) {
                    case 200:
                        if (typeof (callbackOK) === 'function') { callbackOK(response) }
                        return response;

                    default:
                        if (typeof (callbackError) === 'function') { callbackError(response) }
                        return response;
                }
            }
        }
        xhr.open('GET', urlApi, false);
        xhr.setRequestHeader('content-type', 'application/json');
        //xhr.send();
    },

    Post: (urlApi, parameters, callbackOK, callbackError) => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === xhr.DONE) {
                let response = JSON.parse(xhr.responseText);
                switch (xhr.status) {
                    case 200:
                        if (typeof (callbackOK) === 'function') { callbackOK(response) }
                        break;

                    default:
                        if (typeof (callbackError) === 'function') { callbackError(response) }
                        break;
                }
            }
        }
        xhr.open('POST', urlApi, false);
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(parameters));
    }

}


export { REQUEST };