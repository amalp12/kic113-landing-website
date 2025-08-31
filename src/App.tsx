import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useTheme, Theme } from "./context/ThemeContext";
import { blogContent, BlogPost } from "./constants/blog";
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

const BlogDetailPageWrapper = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const post = id ? blogContent[parseInt(id)] : null;
  
  if (!post) {
    return <div>Blog post not found</div>;
  }
  
  return <BlogDetailPage post={post} onBack={() => navigate(-1)} />;
};

const App = () => {
  const { theme, toggleTheme } = useTheme() as { theme: Theme; toggleTheme: () => void };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  const handleBlogClick = (postId: number) => {
    navigate(`/blog/${postId}`);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <Navbar
        toggleTheme={toggleTheme}
        theme={theme as 'light' | 'dark'}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex-grow"
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPageWrapper />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
};


export default App;
