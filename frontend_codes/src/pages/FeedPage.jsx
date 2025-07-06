import React, { useEffect, useState } from 'react';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import postApi from '../api/postApi';
import userApi from '../api/userApi';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadPosts = async () => {
    try {
      const response = await postApi.fetchPosts();
      setPosts(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Failed to load posts:", error);
      setPosts([]);
    }
  };

  const handleFollow = async (targetUser) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentUserId = decoded.id || decoded._id;

        if (currentUserId) {
          await userApi.followUser(targetUser, currentUserId);
          fetchUsers();
        } else {
          console.error("User ID not found in token");
        }
      } catch (error) {
        console.error("Follow error:", error);
      }
    } else {
      console.warn("No token found in localStorage");
    }
  }

  const fetchUsers = async () => {
    try {
      const res = await userApi.getAllUsers();
      if (Array.isArray(res)) {
        setUsers(res);
      } else {
        setUsers([]);
        console.warn("Invalid users response", res);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const initializeFeed = async () => {
      setLoading(true);
      try {
        const decoded = jwtDecode(token);
        setCurrentUser(decoded);

        // Fetch current user profile
        const userId = decoded.id || decoded._id;
        const userProfile = await userApi.userProfile(userId);
        setCurrentUserProfile(userProfile);

        await Promise.all([loadPosts(), fetchUsers()]);
      } catch (error) {
        console.error("Failed to initialize feed:", error);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    initializeFeed();
  }, [navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-light">
      <div className="row">
        {/* Left Sidebar */}
        <div className="col-lg-3 col-md-4 border-end bg-white vh-100 p-4">
          <div className="mb-4">
            <Link to='/' className="text-decoration-none">
              <h4 className="text-primary fw-bold">
                <i className="bi bi-globe me-2"></i>
                SocialSphere
              </h4>
            </Link>
          </div>

          <div className="mb-4">
            <div className="d-flex align-items-center mb-3">
              {currentUserProfile?.profilePic ? (
                <img
                  src={`http://localhost:8081${currentUserProfile.profilePic}`}
                  alt="Profile"
                  className="rounded-circle me-3"
                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
              ) : (
                <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                  <span className="text-white fw-bold">{currentUserProfile?.name?.charAt(0) || currentUser?.name?.charAt(0) || 'U'}</span>
                </div>
              )}
              <div>
                <h6 className="mb-0 fw-bold">{currentUserProfile?.name || currentUser?.name || 'User'}</h6>
                <small className="text-muted">@{currentUserProfile?.name?.toLowerCase() || currentUser?.name?.toLowerCase() || 'user'}</small>
              </div>
            </div>
          </div>

          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link className="nav-link active bg-light rounded" to="/feed-page">
                <i className="bi bi-house me-2"></i>Home
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link text-muted" to={`/profile/${currentUser?.id || currentUser?._id}`}>
                <i className="bi bi-person me-2"></i>Profile
              </Link>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-muted" href="#">
                <i className="bi bi-chat me-2"></i>Messages
              </a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-muted" href="#">
                <i className="bi bi-bell me-2"></i>Notifications
              </a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-muted" href="#">
                <i className="bi bi-search me-2"></i>Explore
              </a>
            </li>
          </ul>
        </div>

        {/* Center Feed */}
        <div className="col-lg-6 col-md-8 py-4">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <CreatePost onPostCreated={loadPosts} />
              {posts.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-emoji-smile display-1 text-muted mb-3"></i>
                  <h5 className="text-muted">No posts yet</h5>
                  <p className="text-muted">Be the first to share something amazing!</p>
                </div>
              ) : (
                posts.map((post) => (
                  <PostCard key={post._id} post={post} onLike={loadPosts} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-lg-3 d-none d-lg-block border-start bg-white vh-100 p-4">
          <h6 className="fw-bold mb-4">Suggested for you</h6>
          <div className="d-flex flex-column gap-3">
            {users
              .filter((u) => u._id !== currentUser?.id && u._id !== currentUser?._id)
              .slice(0, 5)
              .map((suggestedUser) => (
                <div key={suggestedUser._id} className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                  <div className="d-flex align-items-center">
                    <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '35px', height: '35px' }}>
                      <span className="text-white fw-bold small">{suggestedUser.name?.charAt(0) || 'U'}</span>
                    </div>
                    <div>
                      <strong className="d-block">@{suggestedUser.name}</strong>
                      <small className="text-muted">{suggestedUser.bio || "New user"}</small>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleFollow(suggestedUser._id)}
                  >
                    Follow
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedPage;
