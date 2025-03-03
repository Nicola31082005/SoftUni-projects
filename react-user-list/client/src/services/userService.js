const URL = 'http://localhost:3030/jsonstore/users'

export default {
    async getAll() {
        const response = await fetch(URL);
        const result = await response.json();
        const users = Object.values(result);

        return users
    },
    async getOne(userId) {
        const response = await fetch(`${URL}/${userId}`);
        const user = await response.json();

        return user;
    },
    async addUser(data) {
        const postData = transformUserData(data)

        const respone = await fetch(URL, {
            method: "POST",
            headers: {
             "Content-Type": "application/json",
            },
            body: JSON.stringify(postData)
        })

        const result = respone.json()

        return result;
    }
}


function transformUserData(data) {

    const { country, city, street, streetNumber, ...transformedData } = data;

    transformedData.address = { country, city, street, streetNumber };
    transformedData.createdAt = new Date().toISOString();
    transformedData.updatedAt = new Date().toISOString();

    return transformedData;
}