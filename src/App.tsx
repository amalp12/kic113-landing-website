import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { blogContent } from "./constants/blog";
import BlogDetailPage from "./pages/BlogDetailPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ServicesPage from "./pages/ServicesPage";
import TestimonialsPage from "./pages/TestimonialsPage";

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [theme, setTheme] = useState("dark");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeBlog, setActiveBlog] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme;
  };

  const navigate = (page, params = {}) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    if (page === "blog-detail" && params.id) {
      handleBlogClick(params.id);
    } else {
      setActiveBlog(null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBlogClick = (postId) => {
    const postData = blogContent[postId];
    if (postData) {
      setActiveBlog(postData);
      setCurrentPage("blog-detail");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      console.error("Blog post not found:", postId);
      alert("Blog post content is missing!");
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage navigate={navigate} />;
      case "services":
        return <ServicesPage />;
      case "blog":
        return <BlogPage navigate={navigate} onBlogClick={handleBlogClick} />;
      case "testimonials":
        return <TestimonialsPage />;
      case "contact":
        return <ContactPage />;
      case "privacy":
        return <PrivacyPolicyPage />;
      case "blog-detail":
        return <BlogDetailPage post={activeBlog} navigate={navigate} />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div
      className={`font-inter relative min-h-screen transition-colors duration-500
      ${
        theme === "dark"
          ? "bg-gray-950 text-gray-300"
          : "bg-gray-50 text-gray-800"
      }`}
    >
      <Navbar
        currentPage={currentPage}
        navigate={navigate}
        toggleTheme={toggleTheme}
        theme={theme}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default App;
