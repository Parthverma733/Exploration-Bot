import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { login } from "../../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ongcLogo from "../../../assets/logo/ongc-logo.png";

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
            className="mx-auto mb-[90px] block h-auto w-[160px] max-w-[15vw] lg:w-[15vw]"
          />
          <h2 className="mb-4 text-[2.8rem]">Welcome Back</h2>
          <p className="max-w-[450px] leading-relaxed text-[#E2E8F0]">
            Access ONGC's exploration knowledge base, reports and AI assistant.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-5 md:p-10">
        <div className="w-full max-w-[420px] rounded-[var(--radius-card)] bg-white p-8 shadow-[var(--shadow-card)] md:p-10">
          <h2 className="mb-2">Sign In</h2>
          <p className="mb-8 text-text-light">Login to continue</p>

          <form onSubmit={handleSubmit}>
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
                  className="flex-1 border-0 p-3.5 text-[15px] focus:border-primary"
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
                  placeholder="Enter your password"
                  className="flex-1 border-0 p-3.5"
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

            <button
              className="mt-2.5 w-full rounded-lg bg-primary p-3.5 text-base font-semibold text-white transition-colors duration-300 hover:bg-primary-hover"
              type="submit"
            >
              Login
            </button>
          </form>

          <div className="my-5 flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <Link to="/forgot-password" className="text-primary">
              Forgot Password?
            </Link>
          </div>

          <p className="mt-5 text-center text-text-light">
            Don't have an account?
            <Link to="/register" className="text-primary">
              {" "}
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
