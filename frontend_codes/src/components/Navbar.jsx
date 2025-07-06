import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import userApi from '../api/userApi';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAuthenticated(true);
        setCurrentUser(decoded);

        // Fetch user profile data
        const fetchUserProfile = async () => {
          try {
            const userId = decoded.id || decoded._id;
            const profile = await userApi.userProfile(userId);
            setUserProfile(profile);
          } catch (error) {
            console.error('Failed to fetch user profile:', error);
          }
        };

        fetchUserProfile();
      } catch (error) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setCurrentUser(null);
        setUserProfile(null);
      }
    } else {
      setIsAuthenticated(false);
      setCurrentUser(null);
      setUserProfile(null);
    }
  }, [location]);

  const handleLogout = () => {
    const isLogout = window.confirm('Are you sure you want to logout?');
    if (isLogout) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setCurrentUser(null);
      setUserProfile(null);
      navigate('/');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-globe me-2"></i>
          SocialSphere
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">
                Home
              </Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/feed-page' ? 'active' : ''}`} to="/feed-page">
                  Feed
                </Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav">
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-outline-light btn-sm ms-2" to="/register">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {userProfile?.profilePic ? (
                    <img
                      src={`http://localhost:8081${userProfile.profilePic}`}
                      alt="Profile"
                      className="rounded-circle me-2"
                      style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                      <span className="text-dark fw-bold small">{userProfile?.name?.charAt(0) || currentUser?.name?.charAt(0) || 'U'}</span>
                    </div>
                  )}
                  <span>{userProfile?.name || currentUser?.name || 'Profile'}</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to={`/profile/${currentUser?.id || currentUser?._id}`}>
                      <i className="bi bi-person me-2"></i>My Profile
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
