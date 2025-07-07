import { useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import userApi from "../api/userApi";
import postApi from "../api/postApi";
import PostCard from "../components/PostCard";
import { useNavigate, useParams } from "react-router-dom";
import CreatePost from "../components/CreatePost";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleToggleCreatePost = () => {
    setShowCreatePost((prev) => !prev);
  };

  const handlePostCreated = async () => {
    setShowCreatePost(false);
    if (user?._id) {
      await loadPosts(user._id);
    }
  };

  const fetchUser = async (userId) => {
    try {
      const response = await userApi.userProfile(userId);
      if (response) {
        setUser(response);
        // Check if current user is following this user
        if (currentUser && response.followers) {
          const isUserFollowing = response.followers.includes(currentUser._id);
          setIsFollowing(isUserFollowing);
        }
      } else {
        console.warn("No user data found");
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  const handleFollowToggle = async () => {
    if (!currentUser) {
      alert("Please login to follow users");
      return;
    }

    try {
      if (isFollowing) {
        await userApi.unfollowUser(user._id, currentUser._id);
        setIsFollowing(false);
      } else {
        await userApi.followUser(user._id, currentUser._id);
        setIsFollowing(true);
      }
      // Refresh user data to update follower count
      await fetchUser(user._id);
    } catch (error) {
      console.error("Failed to follow/unfollow user:", error);
    }
  };

  const handleSuggestedUserFollow = async (suggestedUserId) => {
    if (!currentUser) {
      alert("Please login to follow users");
      return;
    }

    try {
      await userApi.followUser(suggestedUserId, currentUser._id);
      // Refresh users list to update follow status
      await fetchUsers();
      alert("Successfully followed user!");
    } catch (error) {
      console.error("Failed to follow suggested user:", error);
      alert("Failed to follow user. Please try again.");
    }
  };

  const loadPosts = useCallback(async (userId) => {
    try {
      const response = await postApi.fetchPostsByUser(userId);
      if (Array.isArray(response)) {
        setPosts(response);
      } else {
        setPosts([]);
        console.warn("Unexpected posts response:", response);
      }
    } catch (error) {
      console.error("Failed to load posts:", error);
      setPosts([]);
    }
  }, []);

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
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentUserId = decoded.id || decoded._id;
        if (currentUserId) {
          setCurrentUser({ _id: currentUserId, name: decoded.name });

          // Use the ID from URL params or current user ID
          const targetUserId = id || currentUserId;
          fetchUser(targetUserId);
          loadPosts(targetUserId);
          fetchUsers();
        } else {
          console.error("User ID not found in token");
        }
      } catch (err) {
        console.error("Invalid token", err);
      }
    } else {
      console.warn("No token found in localStorage");
      navigate("/login");
    }
  }, [loadPosts, id, navigate]);

  // Update follow state when user data changes
  useEffect(() => {
    if (currentUser && user && user.followers) {
      const isUserFollowing = user.followers.includes(currentUser._id);
      setIsFollowing(isUserFollowing);
    }
  }, [currentUser, user]);

  if (!user) return <p>Loading user profile...</p>;

  return (
    <div className="container-fluid bg-light">
      <div className="row">
        {/* Left Sidebar */}
        <div className="col-lg-3 col-md-4 border-end bg-white vh-100 p-4">
          <div className="mb-4">
            <h4 className="text-primary fw-bold">
              <i className="bi bi-globe me-2"></i>
              SocialSphere
            </h4>
          </div>

          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a className="nav-link text-muted" href="/feed-page">
                <i className="bi bi-house me-2"></i>Home
              </a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link active bg-light rounded" href={`/profile/${currentUser?._id}`}>
                <i className="bi bi-person me-2"></i>Profile
              </a>
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

        {/* Center Profile Section */}
        <div className="col-lg-6 col-md-8 py-4">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* User Profile Card */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    <div className="col-md-4 text-center">
                      {user.profilePic ? (
                        <img
                          src={`http://localhost:8081${user.profilePic}`}
                          alt="Profile"
                          className="img-fluid rounded-circle border shadow"
                          style={{ maxWidth: "150px", height: "auto" }}
                        />
                      ) : (
                        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{ width: '150px', height: '150px' }}>
                          <span className="text-white display-4 fw-bold">{user.name?.charAt(0) || 'U'}</span>
                        </div>
                      )}
                    </div>
                    <div className="col-md-8">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h2 className="fw-bold mb-1">{user.name}</h2>
                          <p className="text-muted mb-2">@{user.name?.toLowerCase()}</p>
                          {user.bio && <p className="mb-3">{user.bio}</p>}
                        </div>
                        {currentUser && currentUser._id !== user._id && (
                          <button
                            className={`btn ${isFollowing ? 'btn-secondary' : 'btn-primary'}`}
                            onClick={handleFollowToggle}
                          >
                            {isFollowing ? 'Followed' : 'Follow'}
                          </button>
                        )}
                      </div>

                      <div className="row text-center">
                        <div className="col-4">
                          <h5 className="fw-bold mb-0">{posts.length}</h5>
                          <small className="text-muted">Posts</small>
                        </div>
                        <div className="col-4">
                          <h5 className="fw-bold mb-0">{user.followers?.length || 0}</h5>
                          <small className="text-muted">Followers</small>
                        </div>
                        <div className="col-4">
                          <h5 className="fw-bold mb-0">{user.following?.length || 0}</h5>
                          <small className="text-muted">Following</small>
                        </div>
                      </div>

                      {/* Create Post Section - Only show for current user's profile */}
                      {currentUser && currentUser._id === user._id && (
                        <div className="mt-4">
                          <button
                            onClick={handleToggleCreatePost}
                            className="btn btn-outline-primary w-100"
                          >
                            <i className="bi bi-plus-circle me-2"></i>
                            {showCreatePost ? "Close Create Post" : "Create New Post"}
                          </button>

                          {showCreatePost && (
                            <div className="mt-3">
                              <CreatePost onPostCreated={handlePostCreated} />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Posts Section */}
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-transparent">
                  <h5 className="mb-0">Posts</h5>
                </div>
                <div className="card-body">
                  {posts.length === 0 ? (
                    <div className="text-center py-5">
                      <i className="bi bi-emoji-smile display-1 text-muted mb-3"></i>
                      <h5 className="text-muted">No posts yet</h5>
                      <p className="text-muted">Start sharing your thoughts!</p>
                    </div>
                  ) : (
                    posts.map((post) => (
                      <PostCard
                        key={post._id}
                        post={post}
                        onLike={() => loadPosts(user._id)}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Suggested Users */}
        <div className="col-lg-3 d-none d-lg-block border-start bg-white vh-100 p-4">
          <h6 className="fw-bold mb-4">Suggested for you</h6>
          <div className="d-flex flex-column gap-3">
            {users
              .filter((u) => u._id !== user._id)
              .slice(0, 5)
              .map((suggestedUser) => (
                <div
                  key={suggestedUser._id}
                  className="d-flex justify-content-between align-items-center p-3 bg-light rounded"
                >
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
                    onClick={() => handleSuggestedUserFollow(suggestedUser._id)}
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
