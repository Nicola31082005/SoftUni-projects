async function requester(method, url, data) {

    const accessToken = localStorage.getItem('accessToken')

    const options = {
        method,
        headers: {
            "Content-Type" : "application/json",
        }
    }


    if (accessToken) {
        options.headers['X-Authorization'] = accessToken
    }

    if (data) {
        options['body'] = JSON.stringify(data) 
     }


    try {
        const response = await fetch(url, options)

        if (!response.ok) {
            const errorBody = await response.json(); // Parse the error response body
            const errorMessage = errorBody.message || `Error ${response.status}: ${response.statusText}`;
            throw new Error(`${errorMessage}`);
        }

        if (response.status === 204) {
            return
        }
        
        return await response.json()


    }catch(err) {
        alert (err.message)
    }



}


export const api  = {

    get: (url) => requester('GET', url),
    post: (url, data) => requester('POST', url, data),
    delete: (url) => requester('DELETE', url),
    put: (url, data) => requester('PUT', url, data),

}