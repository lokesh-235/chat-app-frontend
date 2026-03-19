import axios from "axios";

const API = axios.create({
    baseURL : "http://localhost:8080/apis/",
    withCredentials: true
});

export const signupAPI = (data) => API.post('users/signup',data);
export const authAPI = (data) => API.post('users/authenticate',data);

export const getRoomsAPI = () => API.get('rooms/all-rooms');