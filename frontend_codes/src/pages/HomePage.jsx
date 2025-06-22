import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <div className="container text-center py-5">
        <h1 className="display-4 fw-bold mb-3">Connect with the world.</h1>
        <p className="lead mb-4">Join SocialSphere — a vibrant community to share your thoughts, photos, and life moments.</p>
        <Link to="/register" className="btn btn-primary btn-lg me-2">Get Started</Link>
        <Link to="/login" className="btn btn-outline-primary btn-lg">Login</Link>
      </div>


      <div className="container py-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <i className="bi bi-people fs-1 text-primary mb-3"></i>
            <h5>Connect</h5>
            <p>Find and follow people who inspire you.</p>
          </div>
          <div className="col-md-4 mb-4">
            <i className="bi bi-image fs-1 text-primary mb-3"></i>
            <h5>Share</h5>
            <p>Post updates, images, and memories with ease.</p>
          </div>
          <div className="col-md-4 mb-4">
            <i className="bi bi-globe fs-1 text-primary mb-3"></i>
            <h5>Explore</h5>
            <p>Discover what others are sharing around the globe.</p>
          </div>
        </div>
      </div>
      
      <footer className="bg-light text-center py-3">
        <small>© {new Date().getFullYear()} SocialSphere. All rights reserved.</small>
      </footer>
    </div>
  );
}

export default HomePage;
