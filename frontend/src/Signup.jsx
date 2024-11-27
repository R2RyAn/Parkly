// src/Signup.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "./logo.png";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState({ renter: false, user: false });

  const handleSignup = async (e) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !number ||
      !email ||
      !password ||
      (!roles.renter && !roles.user)
    ) {
      alert(
        "All fields must be filled out, and at least one role must be selected."
      );
      return;
    }
    e.preventDefault();
    try {
      const role =
        roles.renter && roles.user
          ? "BOTH"
          : roles.renter
          ? "RENTER"
          : roles.user
          ? "USER"
          : "";
      const response = await axios.post("http://127.0.0.1:8000/users/", {
        username: firstName + lastName,
        email: email,
        full_name: firstName + " " + lastName,
        phone_number: number,
        role: role,
        status: "Active",
        profile_pic: "null",
      });
      alert("Account created successfully!");
      console.log("Account created successfully:", response.data);
    } catch (error) {
      console.error(
        "Error signing up:",
        error.response ? error.response.data.detail : error.message
      );
      alert(
        "Failed to create account. Please check your details and try again."
      );
    }
  };

  const handleRoleChange = (role) => {
    setRoles((prevRoles) => ({
      ...prevRoles,
      [role]: !prevRoles[role],
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-xl">
        <div className="flex justify-center">
          <img src={logo} alt="Logo" width="120" />
        </div>
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Your Account
        </h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="relative">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <label
              htmlFor="number"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="number"
              pattern="\d*"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
              placeholder="Enter your phone number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Roles
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={roles.renter}
                  onChange={() => handleRoleChange("renter")}
                  className="form-checkbox h-5 w-5 text-red-600"
                />
                <span className="ml-2 text-gray-700">Renter</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={roles.user}
                  onChange={() => handleRoleChange("user")}
                  className="form-checkbox h-5 w-5 text-red-600"
                />
                <span className="ml-2 text-gray-700">User</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-600 hover:underline font-medium"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
