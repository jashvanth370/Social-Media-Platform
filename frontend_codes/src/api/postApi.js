import axios from 'axios';
import BASE_URL from './Axios'

//create post
const createPost = async (postData,id)=>{
    const post = await axios.post(`${BASE_URL}/posts/create/${id}`,postData);
    return post.data;
}

const deletePost = async (id)=>{
    const post=await axios.delete(`${BASE_URL}/posts/delete/${id}`)
    return post.data;
}

const LikePost = async (id) =>{
    const post = await axios.put(`${BASE_URL}/posts/${id}/like`);
    return post.data;
}

const fetchPosts = async()=>{
    const posts = await axios.get(`${BASE_URL}/posts/getAllPosts`);
    return posts.data;
}


const postApi = {
    createPost,
    deletePost,
    LikePost,
    fetchPosts,
}

export default postApi;