import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../../api/auth";
import ongcLogo from "../../../assets/logo/ongc-logo.png";
import toast from "react-hot-toast";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Registration Successful");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="register">
      <div className="register-left">
        <div className="register-brand">
          <h1>ExploreAI</h1>
          <p>Exploration Knowledge Assistant</p>
        </div>

        <div className="register-hero">
          <img src={ongcLogo} alt="ONGC Logo" className="register-logo" />

          <h2>Create Your Account</h2>

          <p>
            Join ExploreAI to access ONGC's exploration knowledge base and
            AI-powered tools.
          </p>
        </div>
      </div>

      <div className="register-right">
        <div className="register-card">
          <h2>Register</h2>
          <p>Create a new account</p>

          <form onSubmit={handleSubmit}>
            <div className="register-form-group">
              <label>Full Name</label>

              <div className="register-input-box">
                <FaUser className="register-input-icon" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="register-form-group">
              <label>Email</label>

              <div className="register-input-box">
                <FaEnvelope className="register-input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="register-form-group">
              <label>Password</label>

              <div className="register-input-box">
                <FaLock className="register-input-icon" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                />

                <button
                  type="button"
                  className="register-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="register-form-group">
              <label>Confirm Password</label>

              <div className="register-input-box">
                <FaLock className="register-input-icon" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                />

                <button
                  type="button"
                  className="register-eye-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button className="register-btn" type="submit">
              Create Account
            </button>
          </form>

          <p className="register-login-link">
            Already have an account?
            <Link to="/"> Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
