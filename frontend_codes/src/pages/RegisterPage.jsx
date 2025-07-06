import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authApi from '../api/authApi';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    bio: ''
  });
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (profilePic) data.append('profilePic', profilePic);

      await authApi.createUser(data);
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-primary mb-2">
                    <i className="bi bi-globe me-2"></i>
                    SocialSphere
                  </h2>
                  <p className="text-muted">Join our community and start sharing your stories!</p>
                </div>

                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError('')}></button>
                  </div>
                )}

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-person"></i>
                        </span>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          autoComplete="name"
                        />
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label fw-semibold">Email address</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-envelope"></i>
                        </span>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          autoComplete="email"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-semibold">Password</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-lock"></i>
                      </span>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="bio" className="form-label fw-semibold">Bio (Optional)</label>
                    <textarea
                      id="bio"
                      name="bio"
                      className="form-control"
                      placeholder="Tell us a bit about yourself..."
                      value={formData.bio}
                      onChange={handleChange}
                      rows={3}
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="profilePic" className="form-label fw-semibold">Profile Picture (Optional)</label>
                    <input
                      type="file"
                      id="profilePic"
                      name="profilePic"
                      className="form-control"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <div className="form-text">Upload a profile picture to personalize your account</div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-semibold"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Creating account...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-person-plus me-2"></i>
                        Create Account
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <p className="mb-0 text-muted">
                    Already have an account?
                    <Link to="/login" className="text-primary text-decoration-none ms-1 fw-semibold">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
