import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import userApi from "../api/userApi";

export default function UserProfile() {
    const [user, setUser] = useState(null);

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

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const userId = decoded.userId || decoded._id;
                if (userId) {
                    fetchUser(userId);
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
            <h2>{user.name}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            {user.profilePic && <img src={user.profilePic} alt="Profile" width="150" />}
            {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
        </div>
    );
}
