import axios from 'axios';
import BASE_URL from './Axios';

const getNotifications = async (userId) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/notification/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

const markAsRead = async (notificationId) => {
    const token = localStorage.getItem('token');
    const response = await axios.patch(`${BASE_URL}/notification/${notificationId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

const createNotification = async (data) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${BASE_URL}/notification/`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

const notificationApi = {
    getNotifications,
    markAsRead,
    createNotification
};

export default notificationApi; 