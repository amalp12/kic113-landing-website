import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import App from "./App";
import "./index.css";
import "./App.css";

// Initialize the application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application with all necessary providers
root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
