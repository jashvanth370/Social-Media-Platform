import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userApi from '../api/userApi';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: ''
  });
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (profilePic) data.append('profilePic', profilePic);

      await userApi.createUser(data);
      navigate('/login');
    } catch (error) {
      console.log("Error response:", error);
      setError(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <div className="card p-4" style={{ width: '350px', border: '1px solid #dbdbdb', borderRadius: '8px' }}>
        <h2 className="text-center mb-4" style={{ fontFamily: "'Grand Hotel', cursive", fontSize: '40px', color: '#262626' }}>
          MySocial
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Username"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>

          <div className="mb-3">
            <textarea
              name="bio"
              className="form-control"
              placeholder="Short bio..."
              value={formData.bio}
              onChange={handleChange}
              rows={3}
            ></textarea>
          </div>

          <div className="mb-3">
            <input
              type="file"
              name="profilePic"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Sign up
          </button>
        </form>

        <div className="text-center mt-3" style={{ fontSize: '14px' }}>
          Already have an account? <a href="/login" className="text-decoration-none" style={{ color: '#3897f0' }}>Log in</a>
        </div>
      </div>
    </div>
  );
}
