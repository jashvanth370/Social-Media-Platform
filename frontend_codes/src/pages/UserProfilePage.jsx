import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import userApi from "../api/userApi";
import postApi from "../api/postApi";
import PostCard from "../components/PostCard";

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

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

    const loadPosts = async (userId) => {
        try {
            const response = await postApi.fetchPostsByUser(userId);
            console.log("response : ", response);
            if (Array.isArray(response)) {
                setPosts(response);
                console.log("posts : ", posts);
            } else {
                console.warn("Unexpected response structure:", response);
                setPosts([]);
            }
        } catch (error) {
            console.error("Failed to load posts:", error);
            setPosts([]);
        }
    };

    useEffect(() => {
        if (user && user._id) {
            loadPosts(user._id);
        }
    }, [user]);



    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const userId = decoded.userId || decoded._id;
                if (userId) {
                    fetchUser(userId);
                    loadPosts(userId);
                } else {
                    console.error("User ID not found in token");
                }
            } catch (err) {
                console.error("Invalid token", err);
            }
        } else {
            console.warn("No token found in localStorage");
        }
    }, []);

    if (!user) return <p>Loading user profile...</p>;

    return (
        <div className="container mt-4">
            <div className="row align-items-center">
                <div className="col-md-4 text-center mb-3">
                    <img
                        src={user.profilePic || '/default-profile.png'}
                        alt="Profile"
                        className="img-fluid rounded-circle border shadow"
                        style={{ maxWidth: '250px', height: 'auto' }}
                    />
                </div>
                <div className="col-md-8">
                    <h2 className="fw-bold mb-3">{user.name}</h2>
                    <p><strong>Email:</strong> {user.email}</p>
                    {user.bio && (
                        <p><strong>Bio:</strong> {user.bio}</p>
                    )}
                </div>
            </div>
            {posts.length === 0 ? (
                <p className="text-center">No posts yet.</p>
            ) : (
                posts.map((post) => (
                    <PostCard key={post._id} post={post} onLike={() => loadPosts(user._id)} />
                ))
            )}
        </div>
    );

}
