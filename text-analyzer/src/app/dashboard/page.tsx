// app/dashboard/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TextAnalyzer from "@/components/TextAnalyzer";
import AdminDashboard from "@/components/admin/AdminDashboard";
import UserDashboard from "@/components/user/UserDashboard";

// Define interfaces for our data types
interface UserData {
  id: string;
  email: string;
  role: "user" | "ADMIN"; // Be explicit about possible role values
}

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/userData");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = (await response.json()) as UserData;
        setUserData(data);
      } catch (error) {
        // Properly type the error
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchUserData();
    }
  }, [session, status, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {userData?.role === "ADMIN" ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
};

export default Dashboard;
