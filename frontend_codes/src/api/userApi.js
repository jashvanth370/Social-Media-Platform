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

const followUser = async (targetUser,currentUserId)=>{
  const token = localStorage.getItem('token');
  if (!token) {
      throw new Error("No token found. User might not be authenticated.");
    }
  const response = await axios.put(`${BASE_URL}/users/${targetUser}/follow`,{
    currentUserId}
  ,{
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
  getAllUsers,
  followUser
};

export default userApi;