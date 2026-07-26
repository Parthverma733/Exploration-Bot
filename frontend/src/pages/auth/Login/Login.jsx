import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { login } from "../../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ongcLogo from "../../../assets/logo/ongc-logo.png";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await toast.promise(
      login(formData),
      {
        loading: "Logging in...",
        success: "Login successful!",
        error: (err) =>
          err.response?.data?.message || "Login failed!",
      }
    );

    localStorage.setItem("auth", JSON.stringify(response.data));

    navigate("/documents");
  } catch (error) {
    // Error toast is already handled by toast.promise()
  }
};
  return (
    <div className="login">
      <div className="login-left">
        <div className="brand">
          <h1>ExploreAI</h1>
          <p>Exploration Knowledge Assistant</p>
        </div>

        <div className="hero">
          <img src={ongcLogo} alt="ONGC Logo" className="ongc-logo" />
          <h2>Welcome Back</h2>
          <p>
            Access ONGC's exploration knowledge base, reports and AI assistant.
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Sign In</h2>
          <p>Login to continue</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>

              <div className="input-box">
                <FaEnvelope className="input-icon" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>

              <div className="input-box">
                <FaLock className="input-icon" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button className="login-btn" type="submit">
              Login
            </button>
          </form>

          <div className="options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <p className="register-link">
            Don't have an account?
            <Link to="/register"> Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
