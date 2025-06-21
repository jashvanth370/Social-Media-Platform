import axios from 'axios';
import BASE_URL from './Axios'

//create post
const createPost = async (postData,id)=>{
    const post = await axios.post(`${BASE_URL}/posts/create/${id}`,postData);
    return post.data;
}


const postApi = {
    createPost,
}

export default postApi;