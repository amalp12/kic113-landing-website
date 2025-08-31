import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
      <div className="max-w-2xl mx-auto">
        <h1
          className={`text-6xl md:text-8xl font-bold mb-6 ${
            theme === "dark" ? "text-cyan-400" : "text-cyan-600"
          }`}
        >
          404
        </h1>
        <h2
          className={`text-3xl md:text-4xl font-bold mb-4 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Page Not Found
        </h2>
        <p
          className={`text-lg mb-8 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className={`px-6 py-3 rounded-lg font-semibold text-lg ${
              theme === "dark"
                ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                : "bg-cyan-600 hover:bg-cyan-700 text-white"
            } transition-colors`}
          >
            Go to Homepage
          </button>
          <button
            onClick={() => window.history.back()}
            className={`px-6 py-3 rounded-lg font-semibold text-lg ${
              theme === "dark"
                ? "bg-transparent border border-gray-600 hover:bg-gray-800 text-white"
                : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-800"
            } transition-colors`}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
