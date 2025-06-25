import axios from 'axios'
import BASE_URL from './Axios'


const createUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, userData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  return response.data;
}

const loginUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, userData);
  return response.data;
}

const authApi = {
  createUser,
  loginUser,
};

export default authApi;