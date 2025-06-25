import axios from 'axios'
import BASE_URL from './Axios'


const createUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/users/register`, userData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  return response.data;
}

const loginUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/users/login`, userData);
  return response.data;
}

const logout = () => {
  localStorage.removeItem('token');
}

const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  return token
}

const userProfile = async (id) => {
  const response = await axios.get(`${BASE_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

const getAllUsers = async ()=>{
  const response = await axios.get(`${BASE_URL}/users/getAll`);
  return response.data;
}

const userApi = {
  createUser,
  loginUser,
  userProfile,
  logout,
  isAuthenticated,
  getAllUsers
};

export default userApi;