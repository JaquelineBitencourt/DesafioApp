let REQUEST = {

    Get: (UrlAPI) => {
        
    let status = {
        done: false,
        data: null,
        thenable: null
    }

    status.thenable = fetch(UrlAPI)
    .then(res => res.json())
    .then(data => {
        status.done = true;
        status.data = data;
    })
    .catch(err => {
        throw err;
    });


    return status;
    }


    // Post: (UrlAPI, parametro) => {
        
    // let status = {
    //     done: false,
    //     data: null,
    //     thenable: null
    // }

    // status.thenable = fetch(UrlAPI, {
    //     method: 'post',
    //     body: JSON.stringify(parametro)
    // })
    // .then(res => res.json())
    // .then(data => {
    //     status.done = true;
    //     status.data = data;
    // })
    // .catch(err => {
    //     throw err;
    // });


    // return status;
    // }
}

export {REQUEST};