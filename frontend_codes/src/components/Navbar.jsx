import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import userApi from '../api/userApi';
import notificationApi from '../api/notificationApi';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch notifications for the logged-in user
  const fetchNotifications = async (userId) => {
    try {
      const data = await notificationApi.getNotifications(userId);
      setNotifications(data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

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
            // Fetch notifications
            fetchNotifications(userId);
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
        setNotifications([]);
      }
    } else {
      setIsAuthenticated(false);
      setCurrentUser(null);
      setUserProfile(null);
      setNotifications([]);
    }
  }, [location]);

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Mark notification as read and navigate
  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await notificationApi.markAsRead(notification._id);
      setNotifications((prev) => prev.map(n => n._id === notification._id ? { ...n, isRead: true } : n));
    }
    setShowDropdown(false);
    if (notification.url) {
      navigate(notification.url);
    }
  };

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

          <ul className="navbar-nav align-items-center">
            {isAuthenticated && (
              <li className="nav-item dropdown position-relative">
                <button
                  className="btn btn-link nav-link position-relative p-0"
                  style={{ color: 'white' }}
                  onClick={() => setShowDropdown((prev) => !prev)}
                  aria-label="Notifications"
                >
                  <i className="bi bi-bell fs-4"></i>
                  {unreadCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {showDropdown && (
                  <div className="dropdown-menu dropdown-menu-end show mt-2 p-0 shadow" style={{ minWidth: '320px', maxHeight: '400px', overflowY: 'auto' }}>
                    <div className="p-3 border-bottom fw-bold">Notifications</div>
                    {notifications.length === 0 ? (
                      <div className="p-3 text-muted">No notifications</div>
                    ) : (
                      notifications.slice(0, 10).map((notification) => (
                        <button
                          key={notification._id}
                          className={`dropdown-item d-flex align-items-start gap-2${notification.isRead ? '' : ' bg-light fw-bold'}`}
                          onClick={() => handleNotificationClick(notification)}
                          style={{ whiteSpace: 'normal' }}
                        >
                          <i className={`bi me-2 ${notification.type === 'like' ? 'bi-hand-thumbs-up' : notification.type === 'comment' ? 'bi-chat-left-text' : 'bi-person-plus'}`}></i>
                          <span>{notification.message || `${notification.type} notification`}</span>
                          <span className="ms-auto small text-muted">{new Date(notification.createdAt).toLocaleString()}</span>
                        </button>
                      ))
                    )}
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item text-center text-primary" onClick={() => navigate('/notifications')}>View All</button>
                  </div>
                )}
              </li>
            )}
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
