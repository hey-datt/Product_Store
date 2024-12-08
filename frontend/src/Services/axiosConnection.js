import axios from 'axios';
const baseURL = "http://localhost:4000"

const client = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/posts",
    headers: {
        "Access-Control-Allow-Origin": '*',
        "Content-Type": "application/json",
        //"Authorization": `Bearer ${token}`
    }
});

export const getService = async(endpoint) => {
    const response = await client.get(baseURL + endpoint)
    return response;
}

export const postService = async(endpoint, data) => {
    const response = await client.post(baseURL + endpoint, data)
    console.log("Hello", response)
    return response;
}

export const patchService = async(endpoint, data) => {
    const response = await client.patch(baseURL + endpoint, data)
    return response;
}

export const putService = async(endpoint, data) => {
    const response = await client.put(baseURL + endpoint, data)
    return response;
}

export const deleteService = async(endpoint, data) => {
    const response = await client.delete(baseURL + endpoint, data)
    return response;
}