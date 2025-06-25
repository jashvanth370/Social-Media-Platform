import { useState } from "react";
import userApi from "../api/userApi";
import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.loginUser(formData);
      console.log("token : ", response.token);
      localStorage.setItem("token", response.token);
      navigate('/feed-page');
      console.log("User Login Successfully ");
    } catch (error) {
      console.log("Error response:", error);
      setError(error.response?.data?.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#fafafa" }}
    >
      <div
        className="card p-4"
        style={{ width: "350px", border: "1px solid #dbdbdb", borderRadius: "8px" }}
      >
        <h2
          className="text-center mb-4"
          style={{ fontFamily: "'Grand Hotel', cursive", fontSize: "40px", color: "#262626" }}
        >
          MySocial
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Log In
          </button>
        </form>

        <div className="mt-4 text-center" style={{ fontSize: "14px" }}>
          Don't have an account? <a href="/register">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
