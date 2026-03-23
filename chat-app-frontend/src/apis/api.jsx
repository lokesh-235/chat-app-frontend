import axios from "axios";

const API = axios.create({
    baseURL : "http://10.48.46.99:8080/apis/",
    withCredentials: true
});

export const signupAPI = (data) => API.post('users/signup',data);
export const authAPI = (data) => API.post('users/authenticate',data);
export const getUserDetailsAPI = () => API.get('users/me');

export const getRoomsAPI = () => API.get('rooms/all-rooms');

export const getMessagesAPI = (roomId) => API.get(`rooms/${roomId}/messages`);
