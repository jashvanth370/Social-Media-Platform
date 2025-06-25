import React, { useEffect, useState } from 'react';
import postApi from '../api/postApi';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

function PostCard({ post, onLike }) {

  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const [commentText, setCommentText] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      const res = await postApi.CommentPost(post._id, commentText);
      console.log("Updated Post with Comment:", res.post);
      setCommentText(""); // Clear after post
      setShowCommentBox(false); // Optional: hide input after submitting
      onLike(); // Refresh
    }
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.userId || decoded._id;
        if (userId) {
          setUserId(userId);
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

  const handleLike = async (e) => {
    e.preventDefault();
    const res = await postApi.LikePost(post._id);
    console.log("post :", res);
    onLike();
  };

  // const handleComment = async (e) => {
  //   e.preventDefault();
  //   const text = prompt("Enter your comment:");
  //   if (text?.trim()) {
  //     const res = await postApi.CommentPost(post._id, text);
  //     console.log("Updated Post with Comment:", res.post);
  //     onLike();
  //   }
  // }

  const handleDelete = async (postId) => {
    try {
      const res = await postApi.deletePost(postId, userId);
      window.confirm("Do you want delete this post ... ? ");
      navigate('/profile/:id');
      return res;
    } catch (error) {
      console.error("error :", error)
    }
  }

  return (
    <div className="card mb-4 mx-auto shadow-sm" style={{ maxWidth: '500px' }}>
      <div className="card-body">
        <div className="d-flex align-items-center mb-2">
          <img src={`http://localhost:8080${post.authorSnapshot?.profilePic}`} alt="avatar" className="rounded-circle me-2" width="40" height="40" />
          <strong>{post.author?.name}</strong>
        </div>
        <p>{post.content}</p>
        {post.image && (
          <img
            src={`http://localhost:8080${post.image}`}
            alt="post"
            className="img-fluid rounded mb-2"
            style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
          />
        )}
        <div>

          <button className="btn btn-outline-primary btn-sm me-2" onClick={handleLike}>
            like {post.likes?.length}
          </button>
          {/* {<button className="btn btn-outline-primary btn-sm me-2" onClick={handleComment}>
            comment  {post.comments?.length || 0}
          </button>} */}

          {showCommentBox && (
            <form onSubmit={handleCommentSubmit}>
              <input
                className=" btn-outline-dark btn-lg m-2"
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button className="btn btn-outline-primary btn-sm m-2" type="submit">Post</button>
            </form>
          )}
          <button className="btn btn-outline-primary btn-sm me-2" onClick={() => setShowCommentBox(!showCommentBox)}>Comment</button>


          {post.author?._id == userId && <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleDelete(post._id)}>
            delete
          </button>}


          {post.comments?.length > 0 && (
            <div className="mt-3">
              <h6>Comments:</h6>
              {post.comments.map((comment, index) => (
                <div key={index} className="mb-2 d-flex align-items-start">
                  <img
                    src={`http://localhost:8080${comment.userId?.profilePic}`}
                    alt="comment-user"
                    width="30"
                    height="30"
                    className="rounded-circle me-2"
                  />
                  <div>
                    <strong>{comment.userId?.name}</strong>
                    <p className="mb-0">{comment.text}</p>
                    <small className="text-muted">{new Date(comment.createdAt).toLocaleString()}</small>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="d-flex justify-content-end mt-2">
            <small className="text-muted">{new Date(post.createdAt).toLocaleString()}</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
