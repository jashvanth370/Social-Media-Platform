import React, { useEffect, useState } from 'react';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import postApi from '../api/postApi';

function FeedPage() {
    const [posts, setPosts] = useState([]);

    const loadPosts = async () => {
        try {
            const response = await postApi.fetchPosts();

            if (Array.isArray(response.data)) {
                setPosts(response.data);
            } else {
                console.warn("Unexpected response structure:", response.data);
                setPosts([]);
            }
        } catch (error) {
            console.error("Failed to load posts:", error);
            setPosts([]);
        }
    };


    useEffect(() => {
        loadPosts();
    }, []);

    return (
        <div className="col-md-8 offset-md-2">
            <CreatePost onPostCreated={loadPosts} />

            {posts.length === 0 ? (
                <p className="text-center">No posts yet.</p>
            ) : (
                posts.map((post) => (
                    <PostCard key={post._id} post={post} onLike={loadPosts} />
                ))
            )}
        </div>
    );
}

export default FeedPage;
