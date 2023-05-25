import axios from "axios";
import { API_URL } from "../config";
const token = localStorage.getItem('jwt');
axios.defaults.headers.common['authorization'] = `Bearer ${token}`;

export const getAllTravels = () => axios.get(`${API_URL}/travels`);
export const getATravel = id => axios.get(`${API_URL}/travels/${id}`);
export const updateTravel = (id, body) => axios.put(`${API_URL}/travels/${id}`, body);
export const removeTravel = id => axios.delete(`${API_URL}/travels/${id}`);
export const addNewTravel = body => axios.post(`${API_URL}/travels`, body);
