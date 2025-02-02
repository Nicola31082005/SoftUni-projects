import { api } from "../lib/api.js"

const baseUrl = 'http://localhost:3030/users'

export async function login(data) {  
    try{
        const response = await api.post(`${baseUrl}/login`, data)
        return response
    }catch (err){
        alert(err.message)
    }
}

export async function register(data) {  
    try{
        const response = await api.post(`${baseUrl}/register`, data)
        return response
    }catch (err){
        alert(err.message)
    }
}

export async function logout(accessToken) {  
    try{
        const response = await api.get(`${baseUrl}/logout`)
    }catch (err){
        alert(err.message)
    }
}