import { api } from "../lib/api.js";

const baseUrl = 'http://localhost:3030/data/solutions'

export async function getAllSolutions() {
    
    try {
        const response = await api.get(`${baseUrl}?sortBy=_createdOn%20desc`)
        return response
    } catch (err) {
        window.alert(err.message)
    }
}

export async function getOneSolutions(id) {
    
    try {
        const response = await api.get(`${baseUrl}/${id}`)
        return response
    } catch (err) {
        window.alert(err.message)
    }
}

export async function createSolution(data) {
    
    try {
        const response = await api.post(`${baseUrl}`, data)
        return response
    } catch (err) {
        window.alert(err.message)
    }
}

export async function deleteSolution(id) {
    
    try {
        const response = await api.delete(`${baseUrl}/${id}`)
        return response
    } catch (err) {
        window.alert(err.message)
    }
}

export async function editSolution(id, data) {
    
    try {
        const response = await api.put(`${baseUrl}/${id}`, data)
        return response
    } catch (err){
        alert(err.message)
    }

}
