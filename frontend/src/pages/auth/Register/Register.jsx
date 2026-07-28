import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../../api/auth";
import ongcLogo from "../../../assets/logo/ongc-logo.png";
import toast from "react-hot-toast";

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
    <div className="grid min-h-screen grid-cols-1 bg-background lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-gradient-to-br from-sidebar to-[#183A6B] p-10 text-white lg:flex lg:p-[70px]">
        <div>
          <h1 className="text-[2.2rem] font-bold">ExploreAI</h1>
          <p className="mt-2 text-[#CBD5E1]">Exploration Knowledge Assistant</p>
        </div>

        <div className="flex flex-col">
          <img
            src={ongcLogo}
            alt="ONGC Logo"
            className="mx-auto mb-[90px] block h-auto w-[160px] max-w-[15vw]"
          />

          <h2 className="mb-4 text-[2.8rem]">Create Your Account</h2>

          <p className="max-w-[450px] leading-relaxed text-[#E2E8F0]">
            Join ExploreAI to access ONGC's exploration knowledge base and
            AI-powered tools.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-5 md:p-10">
        <div className="w-full max-w-[450px] rounded-[var(--radius-card)] bg-white p-8 shadow-[var(--shadow-card)] md:p-10">
          <h2 className="mb-2">Register</h2>
          <p className="mb-8 text-text-light">Create a new account</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-5 flex flex-col">
              <label className="mb-2 font-medium">Full Name</label>

              <div className="flex items-center overflow-hidden rounded-lg border border-border bg-white">
                <FaUser className="ml-4 text-gray-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="flex-1 border-0 p-3.5 text-[15px]"
                />
              </div>
            </div>

            <div className="mb-5 flex flex-col">
              <label className="mb-2 font-medium">Email</label>

              <div className="flex items-center overflow-hidden rounded-lg border border-border bg-white">
                <FaEnvelope className="ml-4 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="flex-1 border-0 p-3.5 text-[15px]"
                />
              </div>
            </div>

            <div className="mb-5 flex flex-col">
              <label className="mb-2 font-medium">Password</label>

              <div className="flex items-center overflow-hidden rounded-lg border border-border bg-white">
                <FaLock className="ml-4 text-gray-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  className="flex-1 border-0 p-3.5 text-[15px]"
                />

                <button
                  type="button"
                  className="border-0 bg-transparent px-4 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="mb-5 flex flex-col">
              <label className="mb-2 font-medium">Confirm Password</label>

              <div className="flex items-center overflow-hidden rounded-lg border border-border bg-white">
                <FaLock className="ml-4 text-gray-500" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="flex-1 border-0 p-3.5 text-[15px]"
                />

                <button
                  type="button"
                  className="border-0 bg-transparent px-4 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              className="mt-2.5 w-full rounded-lg bg-primary p-3.5 text-base font-semibold text-white transition-colors duration-300 hover:bg-primary-hover"
              type="submit"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-text-light">
            Already have an account?
            <Link to="/" className="font-semibold text-primary hover:underline">
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
