// components/LoginForm.js
"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginForm = () => {
  const router = useRouter();
  const handleSignUpClick = () => {
    router.push("/signup");
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    setError(""); // Set error to an empty string initially

    // Basic client-side validation
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      // Make a POST request to the login API endpoint
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });

      console.log(response);

      if (response.status === 200) {
        // Login successful
        const user = { username }; // Create a user object with relevant information
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Login successful");
        router.push("/pages/home");
        // Redirect to the authenticated section or perform other actions
      } else {
        // Handle login error
        const data = response.data;
        setError(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error", error);
      setError("Internal Server Error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            value={username} // Add this line
            onChange={(e) => setUsername(e.target.value)} // Add this line
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
            value={password} // Add this line
            onChange={(e) => setPassword(e.target.value)} // Add this line
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleLogin}
          >
            Log In
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSignUpClick}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
