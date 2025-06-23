import React, { useEffect, useState } from 'react';
import postApi from '../api/postApi';
import { jwtDecode } from "jwt-decode";

function CreatePost({ onPostCreated }) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("userId : ", userId);

    const formData = new FormData();
    formData.append('content', content);
    if (image) formData.append('PostImage', image);

    try {
      const post = await postApi.createPost(formData, userId);
      console.log("post:", post);
      setContent('');
      setImage(null);
      onPostCreated();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to post');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.userId || decoded._id;
        if (userId) {
          setUserId(userId);
        } else {
          console.error("User ID not found in token");
        }
      } catch (err) {
        console.error("Invalid token", err);
      }
    } else {
      console.warn("No token found in localStorage");
    }
  }, []);

  return (
    <div className="card mb-4">
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control mb-2"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="3"
            required
          />
          <input
            type="file"
            className="form-control mb-2"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button className="btn btn-primary w-100" type="submit">Post</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
