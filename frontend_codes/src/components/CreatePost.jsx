import React, { useEffect, useState } from 'react';
import postApi from '../api/postApi';
import { jwtDecode } from "jwt-decode";

function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('content', content);
    if (image) formData.append('PostImage', image);

    try {
      await postApi.createPost(formData, userId);
      setContent('');
      setImage(null);
      setImagePreview(null);
      onPostCreated();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.id || decoded._id;
        if (userId) {
          setUserId(userId);
        }
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
            <button type="button" className="btn-close" onClick={() => setError('')}></button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control border-0"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="3"
              required
              style={{ resize: 'none' }}
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-3 position-relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="img-fluid rounded"
                style={{ maxHeight: '200px', objectFit: 'cover' }}
              />
              <button
                type="button"
                className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                onClick={removeImage}
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-2">
              <label className="btn btn-outline-primary btn-sm mb-0">
                <i className="bi bi-image me-1"></i>
                Add Photo
                <input
                  type="file"
                  className="d-none"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <button
              className="btn btn-primary px-4"
              type="submit"
              disabled={loading || !content.trim()}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Posting...
                </>
              ) : (
                <>
                  <i className="bi bi-send me-2"></i>
                  Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
