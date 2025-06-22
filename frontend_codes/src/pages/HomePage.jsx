import React from 'react';
import { Link } from 'react-router-dom';
import userApi from '../api/userApi';

function HomePage() {
  const isAuthenticated = userApi.isAuthenticated();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-danger text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">Connect. Share. Explore.</h1>
          <p className="lead mb-4">Join SocialSphere — your digital space to express, connect, and engage.</p>
          {!isAuthenticated && 
            <Link to="/register" className="btn btn-light btn-lg me-2">Get Started</Link>
          }
          {!isAuthenticated && (
            <Link to="/login" className="btn btn-outline-light btn-lg">Login</Link>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="container py-5">
        <div className="row text-center">
          <div className="col-md-4">
            <i className="bi bi-people fs-1 text-danger mb-3"></i>
            <h5>Connect</h5>
            <p>Build friendships and communities that matter.</p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-image fs-1 text-danger mb-3"></i>
            <h5>Share</h5>
            <p>Post updates, stories, and experiences with your circle.</p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-globe2 fs-1 text-danger mb-3"></i>
            <h5>Discover</h5>
            <p>Stay inspired by exploring content from around the world.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h3 className="mb-4">What our users say</h3>
          <div className="row">
            <div className="col-md-4 mb-3">
              <blockquote className="blockquote">
                <p>"I love how easy it is to stay connected with my friends!"</p>
                <footer className="blockquote-footer">Sarah, 21</footer>
              </blockquote>
            </div>
            <div className="col-md-4 mb-3">
              <blockquote className="blockquote">
                <p>"Posting and sharing photos has never been this fun."</p>
                <footer className="blockquote-footer">Jay, 27</footer>
              </blockquote>
            </div>
            <div className="col-md-4 mb-3">
              <blockquote className="blockquote">
                <p>"SocialSphere feels like home for all my ideas."</p>
                <footer className="blockquote-footer">Amara, 30</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="container py-5">
        <h3 className="text-center mb-4">Peek Inside the App</h3>
        <div className="row">
          <div className="col-md-4 mb-3">
            <img src="/images/feed-preview.png" className="img-fluid rounded shadow" alt="Feed preview" />
          </div>
          <div className="col-md-4 mb-3">
            <img src="/images/profile-preview.png" className="img-fluid rounded shadow" alt="Profile preview" />
          </div>
          <div className="col-md-4 mb-3">
            <img src="/images/chat-preview.png" className="img-fluid rounded shadow" alt="Chat preview" />
          </div>
        </div>
      </section>
      
    </div>
  );
}

export default HomePage;
