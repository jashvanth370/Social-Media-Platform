import axios from 'axios';
import BASE_URL from './Axios'
import { jwtDecode } from 'jwt-decode';

//create post
const createPost = async (postData, id) => {
    const post = await axios.post(`${BASE_URL}/posts/create/${id}`, postData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return post.data;
}

//deleye post
const deletePost = async (id,userId)=>{
    const post=await axios.delete(`${BASE_URL}/posts/${id}/delete`,{
        data: {userId},
    });
    return post.data;
}

//like post
const LikePost = async (postId) => {
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const userId = decode.userId || decode._id;
  return await axios.put(`${BASE_URL}/posts/${postId}/like`, {userId}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

//comment post 
const CommentPost = async (postId,text) =>{
    const token = localStorage.getItem('token');
    const response = await axios.post(`${BASE_URL}/posts/${postId}/comment`,{text},{
        headers: {
            Authorization:`Bearer ${token}`
        }
    });
    return response.data;
}
//all posts
const fetchPosts = async()=>{
    const posts = await axios.get(`${BASE_URL}/posts/getAllPosts`);
    return posts.data;
}

//fetch post by user
const fetchPostsByUser = async (id)=>{
    const posts = await axios.get(`${BASE_URL}/posts/profile/${id}`);
    return posts.data;
}


const postApi = {
    createPost,
    deletePost,
    LikePost,
    fetchPosts,
    fetchPostsByUser,
    CommentPost,
}

export default postApi;