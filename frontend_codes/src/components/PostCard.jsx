import React from 'react';
import postApi from '../api/postApi';

function PostCard({ post, onLike }) {
  const handleLike = async (e) => {
    e.preventDefault();
    const res = await postApi.LikePost(post._id);
    console.log("post :",res);
    onLike();
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
            like {post.likes.length}
          </button>
          <small className="text-muted">{new Date(post.createdAt).toLocaleString()}</small>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
