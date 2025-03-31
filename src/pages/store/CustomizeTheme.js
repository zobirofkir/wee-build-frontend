import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentTheme } from "../../redux/action/store/get-current-theme-action";
import AuthAppLayout from "../../layouts/auth/auth-app-layout";

const CustomizeTheme = () => {
  const dispatch = useDispatch();
  const { currentTheme, loading, error } = useSelector(
    (state) => state.currentTheme
  );

  useEffect(() => {
    dispatch(fetchCurrentTheme());
  }, [dispatch]);

  if (loading) {
    return (
      <AuthAppLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </AuthAppLayout>
    );
  }

  if (error) {
    return (
      <AuthAppLayout>
        <div className="min-h-screen p-4">
          <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg">
            <p>Error: {error}</p>
            <button
              onClick={() => dispatch(fetchCurrentTheme())}
              className="mt-2 text-sm font-medium underline hover:text-red-800 dark:hover:text-red-200"
            >
              Try again
            </button>
          </div>
        </div>
      </AuthAppLayout>
    );
  }

  return (
    <AuthAppLayout>
      <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
        {currentTheme && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Theme Customization
              </h1>

              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Theme Details
                  </h2>
                  <div className="mt-2 space-y-2">
                    <p className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Name:</span>{" "}
                      {currentTheme.name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Applied at:</span>{" "}
                      {new Date(currentTheme.applied_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Preview
                  </h2>
                  <div className="mt-2">
                    <iframe
                      src={currentTheme.preview_url}
                      className="w-full h-96 border border-gray-200 dark:border-gray-700 rounded-lg"
                      title="Theme Preview"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthAppLayout>
  );
};

export default CustomizeTheme;
