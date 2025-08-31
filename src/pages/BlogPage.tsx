import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Calendar, Tag, ArrowRight } from "lucide-react";
import { blogPosts } from "../constants/blog";
import { useTheme } from "../context/ThemeContext";

const BlogPage = ({ navigate, onBlogClick }) => {
  const [activeTab, setActiveTab] = useState("all");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const theme = document.documentElement.className;
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const linkColor = theme === "dark" ? "text-cyan-400" : "text-cyan-600";
  const hoverLinkColor =
    theme === "dark"
      ? "group-hover:text-purple-400"
      : "group-hover:text-purple-600";
  const glow =
    theme === "dark"
      ? "0 0 20px rgba(0, 255, 255, 0.5)"
      : "0 0 20px rgba(0, 169, 255, 0.3)";

  return (
    <div className="py-20 mt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-text-primary mb-4">
          Our Insights
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Explore our latest thoughts on the intersection of AI, food, and
          technology.
        </p>
      </motion.div>

      <motion.div
        className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {blogPosts.map((post) => (
          <motion.div
            key={post.id}
            variants={cardVariants}
            whileHover={{ scale: 1.05, boxShadow: glow }}
            className={`group relative overflow-hidden rounded-xl border-2 border-transparent transition-all duration-300 cursor-pointer`}
            onClick={() => onBlogClick(post.id)}
          >
            <div
              className={`p-6 rounded-xl transition-colors duration-300 ${cardBg}`}
            >
              <h3
                className={`text-2xl font-semibold text-text-primary mb-2 transition-colors duration-300
                ${
                  theme === "dark"
                    ? "group-hover:text-cyan-400"
                    : "group-hover:text-cyan-600"
                }`}
              >
                {post.title}
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                {post.date} by {post.author}
              </p>
              <p className="text-text-secondary mb-4">{post.excerpt}</p>
              <span
                className={`font-semibold transition-colors duration-300 ${linkColor} ${hoverLinkColor}`}
              >
                Read Article{" "}
                <ArrowRight className="inline-block ml-1" size={16} />
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BlogPage;
