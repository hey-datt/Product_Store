import { deleteService, getService, patchService, postService, putService } from "./axiosConnection";

export const callAPI = async(url, method, data) => {
    let response = {};
    const err = "Error!! Service doesnot exist!";
    if (method === 'GET') {
        response = await getService(url);
    } else if (method === 'POST') {
        response = await postService(url, data);
    } else if (method === 'PATCH') {
        response = await patchService(url, data);
    } else if (method === 'DELETE') {
        response = await deleteService(url, data);
    } else if (method === 'PUT') {
        response = await putService(url, data);
    } else {
        return err;
    }
    return response.data;
}