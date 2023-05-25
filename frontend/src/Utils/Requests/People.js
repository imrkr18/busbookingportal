import axios from "axios";
import { API_URL } from "../config";

const token = localStorage.getItem('jwt');
axios.defaults.headers.common['authorization'] = `Bearer ${token}`;

export const getOwners = () => axios.get(`${API_URL}/owners`);
export const getUsers = () => axios.get(`${API_URL}/users`);
export const getGuests = () => axios.get(`${API_URL}/guests`);

export const updateOwner = (id, body) => axios.put(`${API_URL}/owners/${id}`, body);

export const addOwner = body =>{
    console.log(body)
   return axios.post(`${API_URL}/auth-owner/signup`, body);
}