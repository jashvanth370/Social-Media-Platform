import React, { useEffect, useState } from 'react';
import postApi from '../api/postApi';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../api/Axios';

function PostCard({ post, onLike }) {
  const [userId, setUserId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const navigate = useNavigate();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      try {
        await postApi.CommentPost(post._id, commentText);
        setCommentText("");
        setShowCommentBox(false);
        onLike();
      } catch (error) {
        console.error("Failed to add comment:", error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.id || decoded._id;
        if (userId) {
          setUserId(userId);
          // Check if user has liked this post
          setIsLiked(post.likes?.includes(userId) || false);
          setLikeCount(post.likes?.length || 0);
        }
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, [post.likes]);

  const handleLike = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Please login to like posts");
      return;
    }

    try {
      await postApi.LikePost(post._id);
      // Toggle the like state
      const newLikedState = !isLiked;
      setIsLiked(newLikedState);

      // Update like count
      if (newLikedState) {
        setLikeCount(prev => prev + 1);
      } else {
        setLikeCount(prev => Math.max(0, prev - 1));
      }

      onLike();
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const handleDelete = async (postId) => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (confirmed) {
      try {
        await postApi.deletePost(postId, userId);
        onLike();
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  }

  const getProfileImage = (profilePic) => {
    if (!profilePic) {
      return null;
    }
    return `${BASE_URL.replace('/api', '')}${profilePic}`;
  };

  return (
    <div className="card mb-4 border-0 shadow-sm">
      <div className="card-body">
        {/* Post Header */}
        <div className="d-flex align-items-center mb-3">
          <div className="me-3">
            {getProfileImage(post.authorSnapshot?.profilePic) ? (
              <img
                src={getProfileImage(post.authorSnapshot?.profilePic)}
                alt="avatar"
                className="rounded-circle"
                width="40"
                height="40"
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <span className="text-white fw-bold">{post.authorSnapshot?.name?.charAt(0) || 'U'}</span>
              </div>
            )}
          </div>
          <div>
            <h6 className="mb-0 fw-bold">{post.authorSnapshot?.name || post.author?.name}</h6>
            <small className="text-muted">{new Date(post.createdAt).toLocaleDateString()}</small>
          </div>
        </div>

        {/* Post Content */}
        <p className="mb-3">{post.content}</p>

        {/* Post Image */}
        {post.image && (
          <img
            src={`${BASE_URL.replace('/api', '')}${post.image}`}
            alt="post"
            className="img-fluid rounded mb-3"
            style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
          />
        )}

        {/* Post Actions */}
        <div className="d-flex align-items-center gap-2 mb-3">
          <button
            className={`btn btn-sm ${isLiked ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={handleLike}
          >
            <i className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'} me-1`}></i>
            {likeCount}
          </button>

          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setShowCommentBox(!showCommentBox)}
          >
            <i className="bi bi-chat me-1"></i>
            {post.comments?.length || 0}
          </button>

          {post.author?._id === userId && (
            <button
              className="btn btn-outline-danger btn-sm ms-auto"
              onClick={() => handleDelete(post._id)}
            >
              <i className="bi bi-trash me-1"></i>
              Delete
            </button>
          )}
        </div>

        {/* Comment Input */}
        {showCommentBox && (
          <form onSubmit={handleCommentSubmit} className="mb-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                <i className="bi bi-send"></i>
              </button>
            </div>
          </form>
        )}

        {/* Comments Section */}
        {post.comments?.length > 0 && (
          <div className="border-top pt-3">
            <h6 className="mb-3">Comments</h6>
            {post.comments.map((comment, index) => (
              <div key={index} className="d-flex align-items-start mb-3">
                <div className="me-3">
                  {getProfileImage(comment.authorSnapshot?.profilePic) ? (
                    <img
                      src={getProfileImage(comment.authorSnapshot?.profilePic)}
                      alt="comment-user"
                      width="30"
                      height="30"
                      className="rounded-circle"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px' }}>
                      <span className="text-white fw-bold small">{comment.authorSnapshot?.name?.charAt(0) || 'U'}</span>
                    </div>
                  )}
                </div>
                <div className="flex-grow-1">
                  <div className="bg-light rounded p-2">
                    <strong className="d-block">{comment.authorSnapshot?.name}</strong>
                    <p className="mb-1">{comment.text}</p>
                    <small className="text-muted">{new Date(comment.createdAt).toLocaleString()}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostCard;
