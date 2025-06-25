import React, { useEffect, useState } from 'react';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import postApi from '../api/postApi';
import userApi from '../api/userApi';

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();



  const loadPosts = async () => {
    try {
      const response = await postApi.fetchPosts();
      setPosts(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Failed to load posts:", error);
      setPosts([]);
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

      const handleFollow = async () =>{

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
    loadPosts();
    fetchUsers();
  }, []);

  return (
    <div className="container-fluid feed-wrapper">
      <div className="row">
        {/* Left Sidebar */}
        <div className="col-2 border-end vh-100 p-3 left-sidebar">
          <h4 className="mb-4 text-primary">MySocial</h4>
          <ul className="nav flex-column">
            <li className="nav-item"><a className="nav-link" href="/feed-page">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Messages</a></li>
            <li className="nav-item"><a className="nav-link" href="/profile/:id">Profile</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Notifications</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Explore</a></li>
          </ul>
        </div>

        {/* Center Feed */}
        <div className="col-6 feed-center py-3 px-4" style={{ maxHeight: '100vh', overflowY: 'scroll' }}>
          <CreatePost onPostCreated={loadPosts} />
          {posts.length === 0 ? (
            <p className="text-center mt-3">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <PostCard key={post._id} post={post} onLike={loadPosts} />
            ))
          )}
        </div>

        <div className="col-4 border-start vh-100 p-4 right-sidebar">
                    <h6 className="mb-3">Suggested for you</h6>
                    <div className="d-flex flex-column gap-3">
                        {users
                            // .filter((u) => u._id !== user._id)
                            .map((suggestedUser) => (
                                <div key={suggestedUser._id} className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>@{suggestedUser.name}</strong><br />
                                        <small>{suggestedUser.bio || "Suggested user"}</small>
                                    </div>
                                    <button className="btn btn-sm btn-outline-primary" onClick={() => handleFollow()}>Follow</button>
                                </div>
                            ))}
                    </div>
                </div>
      </div>
    </div>
  );
}

export default FeedPage;
