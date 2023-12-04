import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all users when the component mounts
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("/api/users/all");

        if (response.status === 200) {
          setUsers(response.data);
        } else {
          console.error("Failed to fetch users:");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <div>
      <h1>User Management</h1>
      <div>
        <div className="">
          {loading ? (
          <p>Loading...</p>
        ) : users.length > 0 ? (
            <div>
              <table className="min-w-full bg-slate-300 rounded-3xl border-gray-300 dark:bg-gray-800 dark:border-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                      User Name
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                      Email
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                      Phone
                    </th>
                    <th className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                      Address
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className=" odd:dark:bg-gray-500 even:bg-slate-500 even:dark:bg-gray-500 dark:border-gray-700 even:text-white"
                    >
                      <td className="px-6 py-4 text-center">{user.username}</td>
                      <td className="px-6 py-4 text-center">{user.email}</td>
                      <td className="px-6 py-4 text-center">{user.phone}</td>
                      <td className="px-6 py-4 text-center">{user.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No users available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersAdmin;
