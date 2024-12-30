"use client"; // This tells Next.js this component needs to run on the client side

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const currentUser = useSession().data?.user; // Just to say hi to the user

  const [users, setUsers] = useState<User[]>([]); // ELI5: This is a state variable that holds an array of User objects
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch users from the API
      const response = await fetch("/api/getUsers");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      // parse the response as JSON
      const data = await response.json();

      setUsers(data.users);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-6">Welcome, {currentUser?.name} !</p>

      {isLoading && <p>Loading users...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!isLoading && !error && (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
