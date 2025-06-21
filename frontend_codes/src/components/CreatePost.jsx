import React, { useState } from 'react';
import postApi from '../api/postApi';

function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      await postApi.createPost(formData);
      setContent('');
      setImage(null);
      onPostCreated(); // refresh post feed
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post');
    }
  };

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
