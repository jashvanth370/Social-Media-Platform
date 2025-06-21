import axios from 'axios'
import BASE_URL from './Axios'


const createUser = async (userData)=>{
    const response = await axios.post(`${BASE_URL}/users/register`,userData);
    return response.data;
}

const loginUser = async (userData)=>{
    const response = await axios.post(`${BASE_URL}/users/login`,userData);
    return response.data;
}



const userApi = {
  createUser,
  loginUser
};

export default userApi;