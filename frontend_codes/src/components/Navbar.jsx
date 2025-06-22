import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userApi from '../api/userApi';

function Navbar() {

  const isAuthendication = userApi.isAuthenticated();
  const logout = userApi.logout;
  const navigate = useNavigate();

  const handleLogout = () => {
        const isLogout = window.confirm('Are you sure you want to logout this user?');
        if (isLogout) {
            logout();
            navigate('/');
        }
    };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container">
        <Link className="navbar-brand" to="/">ConnectHub</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {!isAuthendication && <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>}
            {!isAuthendication && <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>}
            {isAuthendication && <li className="nav-item"><Link className="nav-link" to="/profile/:id">Profile</Link></li>}
            {isAuthendication && <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleLogout}>
                Logout
                </button>
              </li>
            }

            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
