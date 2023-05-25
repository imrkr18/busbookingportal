import axios from 'axios';
// import { checkIfTokenExpired } from '../helpers';
// import { isAuthenticated } from './Auth';
import { API_URL } from '../config';
const token = localStorage.getItem('jwt');
axios.defaults.headers.common['authorization'] = `Bearer ${token}`;

export const getAvailableBusesOfOwner = () =>{
    // checkIfTokenExpired(isAuthenticated().token);
    return axios.get(`${API_URL}/bus/owner-bus-available`);
} 
export const getAllAvailableBuses = () => axios.get(`${API_URL}/bus/all-bus-available`);

export const getUnavailableBusesOfOwner = () => axios.get(`${API_URL}/bus/owner-bus-unavailable`);
export const getAllUnavailableBuses = () => axios.get(`${API_URL}/bus/all-bus-unavailable`);

export const addNewBus = body => axios.post(`${API_URL}/bus`, body);

export const getBusBySlug = slug => axios.get(`${API_URL}/bus/` + slug);

export const removeBus = slug => axios.delete(`${API_URL}/bus/` + slug);

export const updateBus = (slug, body) => axios.put(`${API_URL}/bus/` + slug, body);

// axios.post('/bus', body, { onUploadProgress: progressEvent => console.log(progressEvent.loaded) });
