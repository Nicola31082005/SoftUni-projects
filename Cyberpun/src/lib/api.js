import { displayErrorMessage } from "./lit-html.js"

async function requester (method, url, data)  {

    const accessToken = localStorage.getItem('accessToken')
    const options = { 
         method : method,
         headers : {
            'Content-Type' : 'application/json'
         },
     }

     if (data) {
        options['body'] = JSON.stringify(data) 
     }

     if (accessToken) {
        options.headers['X-Authorization'] = accessToken
     }



    try {
        const response = await fetch (url, options)

        if (!response.ok) {
            const errorBody = await response.json(); // Parse the error response body
            const errorMessage = errorBody.message || `Error ${response.status}: ${response.statusText}`;
            throw new Error(`${errorMessage}`);
        }

        if(response.status === 204) {
            return
        }
        
        const responseData = await response.json()
        return responseData
    } 
    catch(err){
        displayErrorMessage(err.message)
    }


}

export const api = {
    get: (url) => requester ('GET', url),
    post: (url, data) => requester ('POST', url, data),
    put: (url, data) => requester ('PUT', url, data),
    delete: (url) => requester ('DELETE', url)
}