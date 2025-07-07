import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        jwtDecode(token);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    }
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white text-center py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 text-lg-start">
              <h1 className="display-4 fw-bold mb-4">Connect. Share. Explore.</h1>
              <p className="lead mb-4">Join SocialSphere — your digital space to express, connect, and engage with people around the world.</p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                {!isAuthenticated ? (
                  <>
                    <Link to="/register" className="btn btn-light btn-lg px-4">
                      <i className="bi bi-person-plus me-2"></i>Get Started
                    </Link>
                    <Link to="/login" className="btn btn-outline-light btn-lg px-4">
                      <i className="bi bi-box-arrow-in-right me-2"></i>Login
                    </Link>
                  </>
                ) : (
                  <Link to="/feed-page" className="btn btn-light btn-lg px-4">
                    <i className="bi bi-house me-2"></i>Go to Feed
                  </Link>
                )}
              </div>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="position-relative">
                <div className="bg-white bg-opacity-10 rounded-3 p-4 backdrop-blur">
                  <i className="bi bi-phone display-1 text-white-50"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-5">
        <div className="row text-center">
          <div className="col-12 mb-5">
            <h2 className="fw-bold">Why Choose SocialSphere?</h2>
            <p className="text-muted">Experience the next generation of social networking</p>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                  <i className="bi bi-people-fill fs-1 text-primary"></i>
                </div>
                <h5 className="fw-bold">Connect</h5>
                <p className="text-muted">Build meaningful friendships and communities that matter to you.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                  <i className="bi bi-image-fill fs-1 text-success"></i>
                </div>
                <h5 className="fw-bold">Share</h5>
                <p className="text-muted">Post updates, stories, and experiences with your trusted circle.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                  <i className="bi bi-globe2 fs-1 text-warning"></i>
                </div>
                <h5 className="fw-bold">Discover</h5>
                <p className="text-muted">Stay inspired by exploring content from around the world.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">What our users say</h2>
            <p className="text-muted">Join thousands of satisfied users</p>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                      <span className="text-white fw-bold">S</span>
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">Sarah Johnson</h6>
                      <small className="text-muted">Student, 21</small>
                    </div>
                  </div>
                  <p className="mb-0">"I love how easy it is to stay connected with my friends! The interface is so intuitive."</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-success rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                      <span className="text-white fw-bold">J</span>
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">Jay Rodriguez</h6>
                      <small className="text-muted">Designer, 27</small>
                    </div>
                  </div>
                  <p className="mb-0">"Posting and sharing photos has never been this fun. The community is amazing!"</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                      <span className="text-white fw-bold">A</span>
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">Amara Thompson</h6>
                      <small className="text-muted">Entrepreneur, 30</small>
                    </div>
                  </div>
                  <p className="mb-0">"SocialSphere feels like home for all my ideas. The perfect platform for creators."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Ready to join the community?</h2>
          <p className="lead mb-4">Start sharing your stories and connecting with amazing people today.</p>
          {!isAuthenticated ? (
            <Link to="/register" className="btn btn-light btn-lg px-5">
              <i className="bi bi-rocket me-2"></i>Get Started Now
            </Link>
          ) : (
            <Link to="/feed-page" className="btn btn-light btn-lg px-5">
              <i className="bi bi-house me-2"></i>Go to Feed
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
