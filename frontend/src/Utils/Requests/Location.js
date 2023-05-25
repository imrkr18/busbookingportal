import axios from "axios";
import { API_URL } from "../config";

const token = localStorage.getItem('jwt');
axios.defaults.headers.common['authorization'] = `Bearer ${token}`;

export const getAllLocations = () => axios.get(`${API_URL}/locations`);
export const getALocation = id => axios.get(`${API_URL}/locations/${id}`);
export const updateLocation = (id, body) => axios.put(`${API_URL}/locations/${id}`, body);
export const removeLocation = id => axios.delete(`${API_URL}/locations/${id}`);
export const addNewLocation = body => axios.post(`${API_URL}/locations`, body);
