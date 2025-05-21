// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  setopenJoin: React.Dispatch<React.SetStateAction<Boolean>>;
};

const Registration = ({ setopenJoin }: Props) => {
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoadingRegistered, setIsLoadingRegistered] = useState(false); // Loading state for subscribe request
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    email: "",
    phoneNumber: "",
    profession: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form submission logic would go here
    console.log(formData);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setIsSuccess(true);
      setTimeout(() => {
        setIsLoadingRegistered(false);
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }

    setIsLoadingRegistered(true);
  };

  const countries = [
    "Algeria",
    "Angola",
    "Democratic Republic of the Congo",
    "Egypt",
    "Ghana",
    "Ivory Coast",
    "Tanzania",
    "Tunisia",
    "Zimbabwe",
  ];

  const professions = [
    "Software Developer",
    "Designer",
    "Marketing",
    "Sales",
    "Healthcare Professional",
    "Teacher",
    "Engineer",
    "Student",
    "Business Owner",
    "Other",
  ];

  return (
    <div className="max-w-6xl w-full flex shadow-lg rounded-lg overflow-hidden ">
      {/* Left Panel - Gold Background */}
      <div className="hidden md:flex md:flex-col w-2/5 bg-gradient-to-br from-[#D4AF37] to-yellow-600 p-10">
        <div
          onClick={() => setopenJoin(false)}
          className="text-white flex items-center mb-4 cursor-pointer"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          <span>Home page</span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-6">
          Join Our Community
        </h1>

        <p className="text-white mb-4">
          Please complete the registration to become a part of our growing
          community.
        </p>

        <div className="flex-grow flex items-center justify-center">
          <div className="w-full overflow-hidden">
            <img
              src="https://readdy.ai/api/search-image?query=A%20professional%20and%20elegant%203D%20golden%20shield%20with%20community%20symbols%2C%20people%20silhouettes%20connected%20in%20a%20network%2C%20on%20a%20warm%20gold%20gradient%20background%2C%20high%20quality%20render%20with%20soft%20lighting%20and%20subtle%20particle%20effects&width=400&height=300&seq=123&orientation=landscape"
              alt="Community Security"
              className="w-full h-auto object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* Right Panel - White Background */}
      <div className="h-[80%] max-h-[90%] w-full flex justify-center bg-gray-100">
        <div className="flex-grow w-full md:w-3/5 bg-white p-10 max-h-screen overflow-y-auto">
          <div className="flex justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-700">
              Registration
            </h3>

            <button
              onClick={() => setopenJoin(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="col-span-1">
                <label className="block text-gray-700 mb-2">* First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>

              {/* Last Name */}
              <div className="col-span-1">
                <label className="block text-gray-700 mb-2">* Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>

              {/* Country */}
              <div className="col-span-1">
                <label className="block text-gray-700 mb-2">* Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer"
                  required
                >
                  <option value="" disabled>
                    Select your country
                  </option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Email */}
              <div className="col-span-1">
                <label className="block text-gray-700 mb-2">* Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="col-span-1">
                <label className="block text-gray-700 mb-2">
                  * Phone Number
                </label>
                <div className="flex">
                  <div className="w-2/5 mr-2">
                    <select className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer">
                      <option value="+213">+213</option>
                      <option value="+244">+244</option>
                      <option value="+243">+243</option>
                      <option value="+20">+20</option>
                      <option value="+233">+233</option>
                      <option value="+225">+225</option>
                      <option value="+255">+255</option>
                      <option value="+216">+216</option>
                      <option value="+263">+263</option>
                    </select>
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="(242) 456-7890"
                    className="w-3/5 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
              </div>

              {/* Profession */}
              <div className="col-span-1">
                <label className="block text-gray-700 mb-2">* Profession</label>
                <select
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer"
                  required
                >
                  <option value="" disabled>
                    Select your profession
                  </option>
                  {professions.map((profession, index) => (
                    <option key={index} value={profession}>
                      {profession}
                    </option>
                  ))}
                </select>
              </div>

              {/* Password */}
              {/* <div className="col-span-1">
                <label className="block text-gray-700 mb-2">* Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      } text-gray-400`}
                    ></i>
                  </button>
                </div>
              </div> */}

              {/* Confirm Password */}
              {/* <div className="col-span-1">
                <label className="block text-gray-700 mb-2">
                  * Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i
                      className={`fas ${
                        showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                      } text-gray-400`}
                    ></i>
                  </button>
                </div>
              </div> */}
            </div>

            {/* Terms and Conditions */}
            <div className="mt-6">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 mr-2"
                  required
                />
                <span className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="text-yellow-600 hover:underline">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-yellow-600 hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            {/* Register Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoadingRegistered}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 px-4 rounded-md hover:from-yellow-600 hover:to-yellow-700 transition duration-300 !rounded-button whitespace-nowrap cursor-pointer"
              >
                {!isLoadingRegistered ? (
                  <span>Register</span>
                ) : (
                  <span>Registering...</span>
                )}
              </button>
            </div>

            {/* Login Link */}
            {/* <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a href="#" className="text-yellow-600 hover:underline">
                Login
              </a>
            </p>
          </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
