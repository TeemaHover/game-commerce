// components/SignupForm.js
"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const handleLoginClick = () => {
    router.push("/");
  };
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    setError("");

    // Basic client-side validation
    if (!username || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Make a POST request to the signup API endpoint
      const response = await axios.post("/api/auth/signup", {
        username,
        password,
        confirmPassword,
      });
      console.log(response);
      if (response.ok) {
        // Signup successful
        console.log("Signup successful");
        // Redirect to login page or perform other actions
      } else {
        // Handle signup error
        const data = await response.json();
        setError(data.error || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Internal Server Error");
    }
  };
  return (
    <div className="max-w-md mx-auto mt-8">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSignup}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleLoginClick}
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
