"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const NavBar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    // Signout returns promise, so we can use async/await
    try {
      await signOut({
        callbackUrl: "/login",
      });
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  if (!mounted) return null; // Don't render if not mounted
  // ELI5: If the component is not mounted, don't render it
  // Mounted = component is rendered on the page

  return (
    <nav className="bg-teal-950 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link href="/" className="hover:text-teal-300">
            AI Checker
          </Link>
        </div>

        {/* Navigation links */}
        <div className="space-x-4">
          {/* Show these when user is logged in */}
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="hover:text-teal-300 transition-colors"
              >
                Dashboard{" "}
              </Link>
              <Link
                href="/uploads"
                className="hover:text-teal-300 transition-colors"
              >
                Uploads{" "}
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-teal-300 transition-colors"
              >
                Log Out{" "}
              </button>
            </>
          ) : (
            /* Buttons if not authenticated */
            <>
              <Link
                href="/login"
                className="hover:text-teal-300 transition-colors"
              >
                Log In{" "}
              </Link>
              <Link
                href="/register"
                className="hover:text-teal-300 transition-colors"
              >
                Register{" "}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
