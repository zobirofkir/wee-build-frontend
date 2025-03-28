import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RegisterAction } from "../../redux/action/auth/register-action";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error: registerError, validationErrors } = useSelector((state) => state.register);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(prev => {
      const newErrors = { ...prev };
      
      if (registerError) {
        newErrors.general = registerError;
      }
      
      if (validationErrors) {
        if (validationErrors.email) {
          newErrors.email = validationErrors.email[0];
        }
        
        if (validationErrors.password) {
          newErrors.password = validationErrors.password[0];
        }
        
        if (validationErrors.username) {
          newErrors.general = newErrors.general || '';
          newErrors.general += ` Username error: ${validationErrors.username[0]}`;
        }
      }
      
      return newErrors;
    });
  }, [registerError, validationErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeToTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {

      dispatch(RegisterAction(
        formData.fullName,
        formData.email,
        formData.password,
        formData.confirmPassword
      ));
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Title */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join the AI Store Generator community
          </p>
        </div>

        {/* Registration Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            {/* Full Name Input */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`block w-full appearance-none rounded-lg border ${
                    errors.fullName
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-400 sm:text-sm`}
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>
            </div>

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
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full appearance-none rounded-lg border ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-400 sm:text-sm`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full appearance-none rounded-lg border ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-400 sm:text-sm`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-4 w-4" />
                  ) : (
                    <FaEye className="h-4 w-4" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Password must be at least 8 characters
              </p>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <div className="relative mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full appearance-none rounded-lg border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } px-3 py-2 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-400 sm:text-sm`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="h-4 w-4" />
                  ) : (
                    <FaEye className="h-4 w-4" />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="terms"
                className={`font-medium ${
                  errors.terms
                    ? "text-red-500"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                >
                  Privacy Policy
                </Link>
              </label>
              {errors.terms && (
                <p className="mt-1 text-sm text-red-600">{errors.terms}</p>
              )}
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
                "Create account"
              )}
            </button>
          </div>

          {/* Display general error message */}
          {errors.general && (
            <div className="mt-2 text-center text-sm text-red-600">
              {errors.general}
            </div>
          )}

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-50 px-2 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                Or sign up with
              </span>
            </div>
          </div>

          {/* Social Registration Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <FaGoogle className="mr-2 h-5 w-5 text-red-500" />
              Google
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <FaGithub className="mr-2 h-5 w-5" />
              GitHub
            </button>
          </div>

          {/* Sign In Link */}
          <div className="text-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
            </span>
            <Link
              to="/auth/login"
              className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
