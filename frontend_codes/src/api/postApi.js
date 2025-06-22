import axios from 'axios';
import BASE_URL from './Axios'

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
const deletePost = async (id)=>{
    const post=await axios.delete(`${BASE_URL}/posts/delete/${id}`)
    return post.data;
}

const LikePost = async (postId) => {
  const token = localStorage.getItem("token");
  return await axios.put(`${BASE_URL}/posts/${postId}/like`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
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
}

export default postApi;