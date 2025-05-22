// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/visitor/Header";
import images from "../../assets/images";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      console.log("Form submitted:", { email, password, rememberMe });
      // Here you would typically make an API call to authenticate the user
      switch (email) {
        case "admin@gmail.com":
          navigate("/admin");
          break;
        case "director@gmail.com":
          navigate("/director");
          break;
        case "david@gmail.com":
          navigate("/dashboard");
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f5cb4252] via-[#f9ffde] to-[#ffffff] w-full relative ">
      <Header />
      {/* back home link */}
      {/* <Link
        to="/"
        className="absolute top-0 left-0 flex items-center p-3 cursor-pointer"
      >
        <div className="bg-transparent text-[#D4AF37] rounded-full w-6 h-6 flex items-center justify-center mr-1 ring-1 ring-[#D4AF37]">
          <i className="fas fa-arrow-left"></i>
        </div>
        <span className="text-[#D4AF37]">Back to Home</span>
      </Link> */}
      <div className="mt-9 w-screen max-w-4xl flex md:flex-row overflow-hidden rounded-lg shadow-xl">
        {/* Left side - Blue panel with welcome message */}
        <div className="hidden md:flex md:flex-col w-2/5 bg-[#D4AF37] text-white p-10 cursor-pointer">
          <Link to="/">
            <p className="text-gray-500 text-sm flex items-center">
              <div className="bg-transparent text-gray rounded-full w-6 h-6 mr-2 flex items-center justify-center ring-1 ring-[#D4AF37]">
                <i className="fas fa-arrow-left"></i>
              </div>
              <span className="underline"> Go back to the home page</span>
            </p>
          </Link>

          <h1 className="text-4xl font-light mb-6">Welcome back</h1>

          <p className="mb-4 text-white/90">
            Please log in to continue. You’ll be able to access your account
            right away
          </p>

          <div className="mt-auto flex justify-center">
            <img
              src={images.authImage}
              alt="Password Recovery Illustration"
              className="w-64"
            />
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-[96%] mx-auto md:w-3/5 bg-white p-6 md:p-10">
          <div className="max-w-md mx-auto">
            {/* <div className="flex items-center mb-4">
              <div className="text-[#D4AF37] text-4xl mr-3">
                <i className="fas fa-angle-right"></i>
              </div>
              <div>
                <h2 className="text-3xl font-bold">Akwabless</h2>
                <p className="text-gray-500 text-sm">
                  Go back <span className="underline">to the home page</span>
                </p>
              </div>
            </div> */}

            <h3 className="text-xl font-semibold mb-4">Login</h3>

            <div className="bg-[#F5F5DC] p-4 rounded-md mb-4">
              <div className="flex items-center">
                <div className="bg-[#D4AF37] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  <i className="fas fa-info"></i>
                </div>
                <div>
                  <p className="text-gray-700">Email: example@gmail.com</p>
                  <p className="text-gray-700">Password: password</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  * Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`w-full px-3 py-2 border ${
                    emailError ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                  <p className="mt-1 text-red-500 text-sm">{emailError}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  * Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`w-full px-3 py-2 border ${
                      passwordError ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      } text-gray-400`}
                    ></i>
                  </div>
                </div>
                {passwordError && (
                  <p className="mt-1 text-red-500 text-sm">{passwordError}</p>
                )}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <div>
                  <a
                    href="/forget-password"
                    className="text-sm text-[#D4AF37] hover:text-[#228B22] cursor-pointer"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="w-32 bg-[#D4AF37] text-white py-2 px-4 rounded-md hover:bg-[#bd9802] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-opacity-50 transition duration-200 font-medium !rounded-button whitespace-nowrap cursor-pointer"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
