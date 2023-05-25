import axios from 'axios';
import { API_URL } from '../config';

const token = localStorage.getItem('jwt');
axios.defaults.headers.common['authorization'] = `Bearer ${token}`;

export const getOwnerBookings = () => axios.get(`${API_URL}/bookings/my`);
export const getAllBookings = () => axios.get(`${API_URL}/bookings/all`);

export const removeBooking = id => axios.delete(`${API_URL}/bookings/${id}`);

export const changeVerificationStatus = (bookingId, status) =>
	axios.patch(`${API_URL}/bookings/${bookingId}`, { verification: status });

export const postSoldSeat = (slug, seat) => axios.post(`${API_URL}/bookings/sold/${slug}`, { seatNumber: seat });
