import { api } from "../lib/api.js";
const baseUrl = 'http://localhost:3030/data/likes'


export async function likeSolution(solutionId) {
    
    try {
        const response = await api.post(baseUrl, solutionId)
        return response
    } catch (err) {
        window.alert(err.message)
    }
}

export async function totalLikesForSolution(solutionId) {
    
    try {
        const response = await api.get(`${baseUrl}?where=solutionId%3D%22${solutionId}%22&distinct=_ownerId&count`)
        return response
    } catch (err) {
        window.alert(err.message)
    }
}


export async function getLikesForUserSolution(solutionId, userId) {
    
    try {
        const response = await api.get(`${baseUrl}?where=solutionId%3D%22${solutionId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
        return response
    } catch (err) {
        window.alert(err.message)
    }
}