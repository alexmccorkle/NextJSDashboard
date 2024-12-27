"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Type to represent errors in the form
type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  general?: string;
};

export default function Register() {
  const router = useRouter(); // ELI5: This is how we can navigate to other pages
  const [isLoading, setIsLoading] = useState(false); // How we know if form is being submitted or not
  const [errors, setErrors] = useState<FormErrors>({}); // Errors in the form

  // Function to valide form client-side before sending to server
  const validateForm = (formData: FormData): FormErrors => {
    // "( ): => " syntax explained simply is "this function returns a FormErrors object"
    const errors: FormErrors = {};
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    if (!name) {
      errors.name = "Name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    return errors;
    // Returns the errors object, this can be empty if no errors are found or have one or all of the fields' errors
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Function called on submit
    event.preventDefault();
    setIsLoading(true); // Set loading to true since form is being submitted
    setErrors({}); // Reset errors. ({}) = empty object

    const formData = new FormData(event.currentTarget); // Get form data
    const validationErrors = validateForm(formData); // Validate form data to check for errors

    if (Object.keys(validationErrors).length > 0) {
      // If any errors exist, show them and stop submission
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      const data = await response.json(); // Get the response data from the server

      if (!response.ok) {
        // If server returns error
        setErrors({ general: data.message || "Something went wrong :(" });
        return;
      }

      // If we made it this far then the user was successfully registered and redirect to login page
      router.push("/login?registered=true"); // Redirect to login page with a query parameter
    } catch (error) {
      setErrors({ general: "An error occurred, try again plz" });
    } finally {
      setIsLoading(false); // Set loading to false after form submission is done (success or fail)
    }
  };

  // JSX code for the register page
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-teal-600">
            Create your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Name field */}
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Full name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email field */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          {/* General error message */}
          {errors.general && (
            <div className="text-red-500 text-sm text-center">
              {errors.general}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </button>
          </div>

          <div className="text-sm text-center">
            <Link
              href="/login"
              className="font-medium text-teal-600 hover:text-teal-500"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

// Basic explanation of the code (for me, since I'm a little learner boy)
// 1. We have a function component called Register that returns some JSX code
// 2. The component has a form that takes in a name, email, and password
// 3. When the form is submitted, it calls the handleSubmit function
// 4. The handleSubmit function validates the form data, sends a POST request to the server to register the user
// 5. If there are any errors, it displays them to the user
// 6. If the registration is successful, it redirects the user to the login page
// 7. The component also has some state variables to keep track of loading state and errors
