import { api } from "../lib/api.js"
import { displayErrorMessage } from "../lib/lit-html.js"

const baseUrl = 'http://localhost:3030/users'

export async function login(data) {
    
   try {
    const response = await api.post(`${baseUrl}/login`, data)
    return response

   } catch (err) {
      displayErrorMessage(err.message)
   }

}

export async function register(data) {
    
    try {
     const response = await api.post(`${baseUrl}/register`, data)
     return response
 
    } catch (err) {
      displayErrorMessage(err.message)
    }
 
 }

 export async function logout(accessToken) {

   try {
      const response = await api.get(`${baseUrl}/logout`, accessToken)
   } catch (err) {
      displayErrorMessage(err.message)
   }
   
 }
