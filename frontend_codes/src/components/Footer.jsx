export default function Footer() {
    return (
        <footer className="bg-dark text-white py-5 mt-auto">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 mb-4">
                        <h5 className="fw-bold mb-3">
                            <i className="bi bi-globe me-2"></i>
                            SocialSphere
                        </h5>
                        <p className="text-muted">
                            Connect, share, and explore with people around the world.
                            Join our community and start sharing your stories today.
                        </p>
                    </div>

                    <div className="col-lg-2 col-md-6 mb-4">
                        <h6 className="fw-bold mb-3">Platform</h6>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-muted text-decoration-none">About Us</a></li>
                            <li><a href="#" className="text-muted text-decoration-none">Features</a></li>
                            <li><a href="#" className="text-muted text-decoration-none">Privacy</a></li>
                            <li><a href="#" className="text-muted text-decoration-none">Terms</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-2 col-md-6 mb-4">
                        <h6 className="fw-bold mb-3">Support</h6>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-muted text-decoration-none">Help Center</a></li>
                            <li><a href="#" className="text-muted text-decoration-none">Contact Us</a></li>
                            <li><a href="#" className="text-muted text-decoration-none">Community</a></li>
                            <li><a href="#" className="text-muted text-decoration-none">Feedback</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-4 mb-4">
                        <h6 className="fw-bold mb-3">Connect With Us</h6>
                        <div className="d-flex gap-3 mb-3">
                            <a href="#" className="text-white text-decoration-none">
                                <i className="bi bi-facebook fs-5"></i>
                            </a>
                            <a href="#" className="text-white text-decoration-none">
                                <i className="bi bi-twitter fs-5"></i>
                            </a>
                            <a href="#" className="text-white text-decoration-none">
                                <i className="bi bi-instagram fs-5"></i>
                            </a>
                            <a href="#" className="text-white text-decoration-none">
                                <i className="bi bi-linkedin fs-5"></i>
                            </a>
                        </div>
                        <p className="text-muted small">
                            Subscribe to our newsletter for updates and news.
                        </p>
                    </div>
                </div>

                <hr className="my-4" />

                <div className="row align-items-center">
                    <div className="col-md-6">
                        <p className="mb-0 text-muted">
                            © {new Date().getFullYear()} SocialSphere. All rights reserved.
                        </p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <p className="mb-0 text-muted">
                            Made with <i className="bi bi-heart-fill text-danger"></i> for the community
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}