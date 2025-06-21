import React from 'react';
import postApi from '../api/postApi';

function PostCard({ post, onLike }) {
  const handleLike = async () => {
    await postApi.LikePost(post.post_id);
    onLike(); // refresh feed
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex align-items-center mb-2">
          <img src={post.author?.profilePic} alt="avatar" className="rounded-circle me-2" width="40" height="40" />
          <strong>{post.author?.name}</strong>
        </div>
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt="post" className="img-fluid rounded mb-2" />}
        <div>
          <button className="btn btn-outline-primary btn-sm me-2" onClick={handleLike}>
            ❤️ {post.likes.length}
          </button>
          <small className="text-muted">{new Date(post.createdAt).toLocaleString()}</small>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
