import React, { useState, useEffect } from "react";
import AuthAppLayout from "../../layouts/auth/auth-app-layout";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit,
  FiCamera,
  FiLock,
  FiShield,
  FiBell,
  FiGlobe,
  FiAlertCircle,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { LogoutAction } from "../../redux/action/auth/logout-action";
import { getCurrentAuthenticatedUser } from "../../redux/action/auth/get-current-authenticated-user-action";
import {
  updateCurrentAuthenticatedUser,
  resetUpdateUserState,
} from "../../redux/action/auth/update-current-authenticated-user-action";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    username: "",
    account_type: "",
    avatar: null,
  });
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const dispatch = useDispatch();

  /**
   * Get current user from Redux store
   */
  const { currentUser, loading, error } = useSelector(
    (state) => state.getCurrentAuthenticatedUser || {}
  );

  /**
   * Get update user state from Redux store
   */
  const {
    loading: updateLoading,
    success: updateSuccess,
    message: updateMessage,
    error: updateError,
  } = useSelector((state) => state.updateCurrentAuthenticatedUser || {});

  useEffect(() => {
    dispatch(getCurrentAuthenticatedUser());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        location: currentUser.location || "",
        username: currentUser.username || currentUser.email || "",
        account_type: currentUser.account_type || "free",
        avatar: null,
      });

      if (currentUser.avatar) {
        setAvatarPreview(currentUser.avatar);
      } else {
        setAvatarPreview(null);
      }
    }
  }, [currentUser]);

  /**
   * Reset update state when changing tabs
   */
  useEffect(() => {
    dispatch(resetUpdateUserState());
  }, [activeTab, dispatch]);

  /**
   * Use currentUser data if available, otherwise fallback to mock data
   */
  const userData = currentUser || {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "January 2023",
    avatar: null,
    role: "Administrator",
    plan: "Premium",
  };

  const handleLogout = () => {
    dispatch(LogoutAction());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        avatar: file,
      });

      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Ensure all required fields are included
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("username", formData.username || formData.email);
    formDataToSend.append("account_type", formData.account_type || "free");

    // Add optional fields if they exist
    if (formData.phone) formDataToSend.append("phone", formData.phone);
    if (formData.location) formDataToSend.append("location", formData.location);

    // Add avatar if it exists
    if (formData.avatar) {
      formDataToSend.append("avatar", formData.avatar);
    }

    dispatch(updateCurrentAuthenticatedUser(formDataToSend));
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    // Create FormData for password update
    const formDataToSend = new FormData();

    // Add required user fields
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("username", formData.username || formData.email);
    formDataToSend.append("account_type", formData.account_type || "free");

    // Add password fields
    formDataToSend.append("current_password", passwordData.current_password);
    formDataToSend.append("password", passwordData.password);
    formDataToSend.append(
      "password_confirmation",
      passwordData.password_confirmation
    );

    // Add optional fields
    if (formData.phone) formDataToSend.append("phone", formData.phone);
    if (formData.location) formDataToSend.append("location", formData.location);

    dispatch(updateCurrentAuthenticatedUser(formDataToSend));
  };

  /**
   * Show loading state
   */
  if (loading && !currentUser) {
    return (
      <AuthAppLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Loading profile...
            </p>
          </div>
        </div>
      </AuthAppLayout>
    );
  }

  /**
   * Show error state
   */
  if (error && !currentUser) {
    return (
      <AuthAppLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center bg-red-50 dark:bg-red-900/20 p-6 rounded-lg max-w-md">
            <div className="text-red-500 text-5xl mb-4">
              <FiAlertCircle className="mx-auto" />
            </div>
            <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">
              Error Loading Profile
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
            <button
              onClick={() => dispatch(getCurrentAuthenticatedUser())}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </AuthAppLayout>
    );
  }

  return (
    <AuthAppLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 text-4xl font-bold overflow-hidden">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt={userData.name}
                    className="h-full w-full object-cover"
                  />
                ) : userData.avatar ? (
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  userData.name.charAt(0)
                )}
              </div>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors cursor-pointer"
              >
                <FiCamera className="h-4 w-4" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {userData.name}
              </h1>
              <p className="text-purple-600 dark:text-purple-400">
                {userData.role}
              </p>
              <div className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                Member since {userData.joinDate}
              </div>
              <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                  {userData.account_type} Plan
                </span>
                <button
                  onClick={() => setActiveTab("account")}
                  className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-medium hover:bg-purple-700 transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Tabs */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <nav className="flex flex-col">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex items-center gap-3 px-4 py-3 text-left ${
                    activeTab === "profile"
                      ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-l-4 border-purple-600"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <FiUser className="h-5 w-5" />
                  <span>Profile Information</span>
                </button>
                <button
                  onClick={() => setActiveTab("account")}
                  className={`flex items-center gap-3 px-4 py-3 text-left ${
                    activeTab === "account"
                      ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-l-4 border-purple-600"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <FiEdit className="h-5 w-5" />
                  <span>Account Settings</span>
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`flex items-center gap-3 px-4 py-3 text-left ${
                    activeTab === "security"
                      ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-l-4 border-purple-600"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <FiLock className="h-5 w-5" />
                  <span>Security</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                    Profile Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center py-3 border-b dark:border-gray-700">
                      <div className="md:w-1/3 flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
                        <FiUser className="h-5 w-5" />
                        <span>Full Name</span>
                      </div>
                      <div className="md:w-2/3 text-gray-800 dark:text-white mt-1 md:mt-0">
                        {userData.name}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center py-3 border-b dark:border-gray-700">
                      <div className="md:w-1/3 flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
                        <FiMail className="h-5 w-5" />
                        <span>Email</span>
                      </div>
                      <div className="md:w-2/3 text-gray-800 dark:text-white mt-1 md:mt-0">
                        {userData.email}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center py-3 border-b dark:border-gray-700">
                      <div className="md:w-1/3 flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
                        <FiPhone className="h-5 w-5" />
                        <span>Phone</span>
                      </div>
                      <div className="md:w-2/3 text-gray-800 dark:text-white mt-1 md:mt-0">
                        {userData.phone}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center py-3 border-b dark:border-gray-700">
                      <div className="md:w-1/3 flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
                        <FiMapPin className="h-5 w-5" />
                        <span>Location</span>
                      </div>
                      <div className="md:w-2/3 text-gray-800 dark:text-white mt-1 md:mt-0">
                        {userData.location}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center py-3">
                      <div className="md:w-1/3 flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
                        <FiGlobe className="h-5 w-5" />
                        <span>Account Type</span>
                      </div>
                      <div className="md:w-2/3 text-gray-800 dark:text-white mt-1 md:mt-0">
                        {userData.account_type} Plan
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "account" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                    Account Settings
                  </h2>

                  {updateSuccess && (
                    <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300">
                      {updateMessage}
                    </div>
                  )}

                  {updateError && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
                      {updateError}
                    </div>
                  )}

                  <form className="space-y-6" onSubmit={handleUpdateProfile}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                        Profile Picture
                      </h3>
                      <div className="flex items-start space-x-4">
                        <div className="h-20 w-20 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 text-2xl font-bold overflow-hidden">
                          {avatarPreview ? (
                            <img
                              src={avatarPreview}
                              alt="Avatar preview"
                              className="h-full w-full object-cover"
                            />
                          ) : userData.avatar ? (
                            <img
                              src={userData.avatar}
                              alt={userData.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            userData.name.charAt(0)
                          )}
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Upload New Picture
                          </label>
                          <input
                            type="file"
                            name="avatar"
                            accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
                            onChange={handleFileChange}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-sm"
                          />
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Accepted formats: JPEG, PNG, JPG, GIF, SVG. Max
                            size: 2MB.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                        Subscription Plan
                      </h3>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-purple-700 dark:text-purple-300">
                              {userData.plan} Plan
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              Your plan renews on April 21, 2023
                            </p>
                          </div>
                          <button
                            type="button"
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            Upgrade
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          if (currentUser) {
                            setFormData({
                              name: currentUser.name || "",
                              email: currentUser.email || "",
                              phone: currentUser.phone || "",
                              location: currentUser.location || "",
                              username:
                                currentUser.username || currentUser.email || "",
                              account_type: currentUser.account_type || "free",
                              avatar: null,
                            });
                          }
                          dispatch(resetUpdateUserState());
                        }}
                        className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg mr-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        disabled={updateLoading}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                        disabled={updateLoading}
                      >
                        {updateLoading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                            Saving...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === "security" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                    Security Settings
                  </h2>

                  {updateSuccess && (
                    <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300">
                      {updateMessage}
                    </div>
                  )}

                  {updateError && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
                      {updateError}
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="pb-6 border-b dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                        Change Password
                      </h3>
                      <form
                        className="space-y-4"
                        onSubmit={handleUpdatePassword}
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Current Password
                          </label>
                          <input
                            type="password"
                            name="current_password"
                            value={passwordData.current_password}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={passwordData.password}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            name="password_confirmation"
                            value={passwordData.password_confirmation}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setPasswordData({
                                current_password: "",
                                password: "",
                                password_confirmation: "",
                              });
                              dispatch(resetUpdateUserState());
                            }}
                            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg mr-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            disabled={updateLoading}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                            disabled={updateLoading}
                          >
                            {updateLoading ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                Updating...
                              </>
                            ) : (
                              "Update Password"
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthAppLayout>
  );
};

export default Profile;
