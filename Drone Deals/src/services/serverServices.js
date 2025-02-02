import { api } from "../lib/api.js"
import { displayErrorMessage } from "../lib/lit-html.js"


const baseUrl = 'http://localhost:3030/data/drones'

export async function getAllItems() {
    try {
        const items = await api.get(`${baseUrl}?sortBy=_createdOn%20desc`)
        return items
    } catch (err){
        displayErrorMessage(err.message)
    }
}
export async function getOneItem(itemId) {
    try {
        const item = await api.get(`${baseUrl}/${itemId}`)
        return item
    } catch (err){
        displayErrorMessage(err.message)
    }
}

export async function createItem(data) {
    try {
        const response = await api.post(`${baseUrl}`, data)
        return response
    } catch (err){
        displayErrorMessage(err.message)
    }
}

export async function deleteItem(id) {
    try {
        const response = await api.delete(`${baseUrl}/${id}`)
        return response
    } catch (err){
        displayErrorMessage(err.message)
    }
}

export async function editItem(id, data) {
    
    try {
        const response = await api.put(`${baseUrl}/${id}`, data)
        return response
    } catch (err){
        displayErrorMessage(err.message)
    }

}