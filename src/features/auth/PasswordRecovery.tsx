// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PasswordRecovery: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

    if (isValid) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        console.log("Password reset link sent to:", email);
      }, 1500);
    }
  };

  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      {/* back home link */}
      <Link
        to="/"
        className="absolute top-0 left-0 flex items-center p-3 cursor-pointer"
      >
        <div className="bg-transparent text-[#D4AF37] rounded-full w-6 h-6 flex items-center justify-center mr-1 ring-1 ring-[#D4AF37]">
          <i className="fas fa-arrow-left"></i>
        </div>
        <span className="text-[#D4AF37]">Back to Home</span>
      </Link>
      <div className="w-full max-w-4xl flex overflow-hidden rounded-lg shadow-xl">
        {/* Left side - Blue panel with welcome message */}
        <div className="w-2/5 bg-[#D4AF37] text-white p-10 flex flex-col">
          <h1 className="text-4xl font-light mb-6">Password Recovery</h1>
          <p className="mb-4 text-white/90">
            Enter your email address below and we'll send you a link to reset
            your password and get back to managing your account.
          </p>
          <div className="mt-auto flex justify-center">
            <img
              src="https://readdy.ai/api/search-image?query=secure%2520password%2520recovery%2520concept%2520with%2520shield%2520lock%2520email%2520verification%2520and%2520security%2520symbols%2520displayed%2520in%2520a%2520modern%2520minimalist%2520style%2520on%2520golden%2520background%2520color%2520D4AF37%2520professional%2520enterprise%2520design%2520with%2520subtle%2520geometric%2520patterns%2520and%2520soft%2520shadows%2520conveying%2520trust%2520and%2520reliability&width=300&height=200&seq=123457&orientation=squarish"
              alt="Password Recovery Illustration"
              className="w-64"
            />
          </div>
        </div>

        {/* Right side - Password recovery form */}
        <div className="w-3/5 bg-white p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center mb-5">
              <div className="text-[#D4AF37] text-4xl mr-3">
                <i className="fas fa-angle-right"></i>
              </div>
              <div>
                <h2 className="text-3xl font-bold">Akwabless</h2>
                {/* <p className="text-gray-500 text-sm">
                  made by <span className="underline">Bora.Technology</span>
                </p> */}
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Password Recovery</h3>

            {submitSuccess ? (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <div className="flex items-center">
                  <div className="mr-2">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div>
                    <p className="font-medium">Success!</p>
                    <p className="text-sm">
                      Password reset link has been sent to your email address.
                      Please check your inbox.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#F5F5DC] p-4 rounded-md mb-4">
                <div className="flex items-start">
                  <div className="bg-[#D4AF37] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-0.5 mr-3">
                    <i className="fas fa-info"></i>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2">
                      Enter your email address below and we'll send you
                      instructions to reset your password.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
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
                  placeholder="example@gmail.co"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting || submitSuccess}
                />
                {emailError && (
                  <p className="mt-1 text-red-500 text-sm">{emailError}</p>
                )}
              </div>

              <div className="flex items-center justify-between mb-6">
                <button
                  type="submit"
                  className={`w-40 bg-[#D4AF37] text-white py-2 px-4 rounded-md hover:bg-[#C19B2E] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-opacity-50 transition duration-200 font-medium !rounded-button whitespace-nowrap cursor-pointer ${
                    isSubmitting || submitSuccess
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={isSubmitting || submitSuccess}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Sending...
                    </span>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>

                <Link
                  to="/login"
                  data-readdy="true"
                  className="text-sm text-[#D4AF37] hover:text-[#228B22] cursor-pointer"
                >
                  Back to Login
                </Link>
              </div>
            </form>

            <div className="mt-4 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Still need help? contact us at
                <a
                  href="#"
                  className="text-[#D4AF37] hover:text-[#228B22] ml-1"
                >
                  help@akwabless.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;
