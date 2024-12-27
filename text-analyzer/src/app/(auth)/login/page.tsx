"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { error } from "console";
import Link from "next/link";

export default function Login() {
  // export default ELI5 = "make this function available to other files", the default meaning it's the only thing being exported
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null); // ELI5: create a state variable to store the error message
  const [isLoading, setIsLoading] = useState(false);

  const justRegistered = searchParams.get("registered") === "true"; // Check if the user just registered

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget); // Get the form data
    const email = formData.get("email") as string; // Get the email from the form data
    const password = formData.get("password") as string; // Get the password from the form data

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard"); // Redirect to the user's dashboard page after successful login
        router.refresh(); // Refresh the page
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-teal-600">
            Sign in to your account
          </h2>
          {justRegistered && (
            <div className="mt-2 text-center text-sm text-green-600">
              Registration successful! Please sign in with your new account.
            </div>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none 
                focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 
                placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 
                focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
              text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
          <div className="text-sm text-center">
            <Link
              href="/register"
              className="font-medium text-teal-600 hover:text-teal-500"
            >
              Don't have an account? Sign up!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
