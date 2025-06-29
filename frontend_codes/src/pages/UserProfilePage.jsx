import { useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import userApi from "../api/userApi";
import postApi from "../api/postApi";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import CreatePost from "../components/CreatePost";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const navigate = useNavigate();
  const logout = userApi.logout;

  const handleToggleCreatePost = () => {
    setShowCreatePost((prev) => !prev);
  };

  const handlePostCreated = async () => {
    setShowCreatePost(false);
    if (user?._id) {
      await loadPosts(user._id); // Ensure post list is refreshed
    }
  };

  const fetchUser = async (id) => {
    try {
      const response = await userApi.userProfile(id);
      if (response) {
        setUser(response);
      } else {
        console.warn("No user data found");
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
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

  const handleLogout = () => {
    const isLogout = window.confirm("Are you sure you want to logout this user?");
    if (isLogout) {
      logout();
      navigate("/");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.id || decoded._id;
        if (userId) {
          fetchUser(userId);
          loadPosts(userId);
          fetchUsers();
        } else {
          console.error("User ID not found in token");
        }
      } catch (err) {
        console.error("Invalid token", err);
      }
    } else {
      console.warn("No token found in localStorage");
    }
  }, [loadPosts]);

  if (!user) return <p>Loading user profile...</p>;

  return (
    <div className="container-fluid">
      {/* Create Post Button */}
      <div className="d-flex justify-content-center">
        <button onClick={handleToggleCreatePost} className="btn btn-outline-primary btn-sm m-2">
          {showCreatePost ? "Close Create Post" : "Create Post"}
        </button>
      </div>

      {/* Show Create Post form if toggled */}
      {showCreatePost && (
        <div className="d-flex justify-content-center">
          <CreatePost onPostCreated={handlePostCreated} />
        </div>
      )}

      <div className="row">
        {/* Left Sidebar */}
        <div className="col-2 border-end vh-100 p-3 left-sidebar">
          <h4 className="mb-4 text-primary">MySocial</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link" href="/feed-page">Home</a>
            </li>
            <li className="nav-item"><a className="nav-link" href="#">Messages</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Profile</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Notifications</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Explore</a></li>
            <li className="btn btn-link nav-link">
              <button className="btn btn-outline-primary btn-sm me-2" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>

        {/* Center Profile Section */}
        <div className="col-6 py-4 px-5" style={{ maxHeight: "100vh", overflowY: "scroll" }}>
          <div className="row align-items-center mb-4">
            <div className="col-md-4 text-center">
              <img
                src={`http://localhost:8080${user.profilePic}`}
                alt="Profile"
                className="img-fluid rounded-circle border shadow"
                style={{ maxWidth: "200px", height: "auto" }}
              />
            </div>
            <div className="col-md-8">
              <h2 className="fw-bold">{user.name}</h2>
              <p><strong>Email:</strong> {user.email}</p>
              {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
              <p><strong>Followers:</strong> {user.followers.length}</p>
              <p><strong>Following:</strong> {user.following.length}</p>
            </div>
          </div>

          <h5 className="mb-3">My Posts</h5>
          {posts.length === 0 ? (
            <p className="text-center">No posts yet.</p>
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

        {/* Right Sidebar: Suggested Users */}
        <div className="col-4 border-start vh-100 p-4 right-sidebar">
          <h6 className="mb-3">Suggested for you</h6>
          <div className="d-flex flex-column gap-3">
            {users
              .filter((u) => u._id !== user._id)
              .map((suggestedUser) => (
                <div
                  key={suggestedUser._id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>@{suggestedUser.name}</strong>
                    <br />
                    <small>{suggestedUser.bio || "Suggested user"}</small>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => alert("Follow feature coming soon!")}
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
