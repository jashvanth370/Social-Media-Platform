import axios from 'axios'
import BASE_URL from './Axios'


const logout = () => {
  localStorage.removeItem('token');
}

const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  return token
}

const userProfile = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) {
      throw new Error("No token found. User might not be authenticated.");
    }
  const response = await axios.get(`${BASE_URL}/users/get/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

const getAllUsers = async ()=>{
  const token = localStorage.getItem('token');
  if (!token) {
      throw new Error("No token found. User might not be authenticated.");
    }
  const response = await axios.get(`${BASE_URL}/users/getAllUsers`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

const userApi = {
  userProfile,
  logout,
  isAuthenticated,
  getAllUsers
};

export default userApi;