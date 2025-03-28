import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ForgetPasswordAction,
  forgetPasswordReset,
} from "../../redux/action/auth/forget-password-action";
import AppLayout from "../../layouts/app-layout";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const {
    loading = false,
    success = false,
    message = "",
    error = "",
  } = useSelector((state) => state.forgetPassword || {});

  useEffect(() => {
    if (success && message) {
      toast.success(message);
      setEmail("");
    }
  }, [success, message]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    return () => {
      dispatch(forgetPasswordReset());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    dispatch(ForgetPasswordAction(email));
  };

  return (
    <AppLayout>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Title */}
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
              Forgot Password
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Enter your email and we'll send you a link to reset your password
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Success message */}
            {success && (
              <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/30">
                <div className="flex">
                  <div className="text-sm text-green-700 dark:text-green-400">
                    {message}
                  </div>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/30">
                <div className="flex">
                  <div className="text-sm text-red-700 dark:text-red-400">
                    {error}
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-md shadow-sm">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-400 sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full justify-center rounded-lg border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-75 dark:bg-purple-700 dark:hover:bg-purple-600"
              >
                {loading ? (
                  <svg
                    className="h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </div>

            {/* Back to Login */}
            <div className="text-center text-sm">
              <Link
                to="/auth/login"
                className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default ForgotPassword;
