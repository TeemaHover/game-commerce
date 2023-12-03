// components/Profile.js
"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import axios from "axios";

const Profile = () => {
  const storedUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  const [user, setUser] = useState(storedUser);

  const [newPassword, setNewPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`/api/users/profile/${user.username}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      return; // If there's no user, do nothing
    }

    fetchUserDetails(); // Fetch user details when the component mounts
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleChangePassword = () => {
    console.log("Password changed successfully!");
    setNewPassword("");
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      // Prepare the request body
      const requestBody = {
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        // Add other fields as needed
      };

      // Send a PUT request to the user edit API
      await axios.put(`/api/users/edit`, requestBody);

      setIsEditing(false);
      fetchUserDetails(); // Fetch updated user details
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  };

  const handleUsernameChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, username: e.target.value }));
  };

  const handleAddressChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, address: e.target.value }));
  };

  const handlePhoneChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, phone: e.target.value }));
  };

  const handleEmailChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, email: e.target.value }));
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center h-screen w-full justify-center">
        <div className="max-w-xs">
          <div className="bg-white shadow-xl rounded-lg py-3">
            <div className="p-2">
              <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                {isEditing ? (
                  <input
                    type="text"
                    value={user.username}
                    onChange={handleUsernameChange}
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  />
                ) : (
                  user.username
                )}
              </h3>

              <table className="text-xs my-3">
                <tbody>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Address
                    </td>
                    <td className="px-2 py-2">
                      {isEditing ? (
                        <input
                          type="text"
                          value={user.address}
                          onChange={handleAddressChange}
                          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                        />
                      ) : (
                        user.address
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Phone
                    </td>
                    <td className="px-2 py-2">
                      {isEditing ? (
                        <input
                          type="text"
                          value={user.phone}
                          onChange={handlePhoneChange}
                          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                        />
                      ) : (
                        user.phone
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Email
                    </td>
                    <td className="px-2 py-2">
                      {isEditing ? (
                        <input
                          type="email"
                          value={user.email}
                          onChange={handleEmailChange}
                          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="text-center my-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      className="bg-green-500 text-white py-2 px-4 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-500 text-white py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEditProfile}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="text-center my-3">
                  <h2>Change Password</h2>
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  />
                  <button
                    onClick={handleChangePassword}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Change Password
                  </button>
                </div>
              ) : null}

              <div className="text-center my-3">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
