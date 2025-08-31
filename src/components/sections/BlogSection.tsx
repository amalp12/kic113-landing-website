import { motion } from "framer-motion";
import { Clipboard, Lightbulb } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { blogPosts } from "../../constants/blog";
import { useTheme } from "../../context/ThemeContext";

const BlogSection: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Latest Insights
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-xl max-w-2xl mx-auto ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Stay updated with the latest trends and insights in food safety and
            AI
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`rounded-xl overflow-hidden transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gray-800/50 hover:bg-gray-800/80"
                  : "bg-white hover:shadow-lg border border-gray-100"
              }`}
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              <div className="p-6">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    theme === "dark" ? "bg-cyan-500/20" : "bg-cyan-100"
                  }`}
                >
                  {index % 2 === 0 ? (
                    <Clipboard
                      className={`w-6 h-6 ${
                        theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                      }`}
                    />
                  ) : (
                    <Lightbulb
                      className={`w-6 h-6 ${
                        theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                      }`}
                    />
                  )}
                </div>
                <h3
                  className={`text-xl font-bold mb-2 hover:text-cyan-500 transition-colors cursor-pointer ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {post.title}
                </h3>
                <div className="flex items-center text-sm mb-4">
                  <span
                    className={
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }
                  >
                    {post.date}
                  </span>
                  <span className="mx-2">•</span>
                  <span
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }
                  >
                    {post.author}
                  </span>
                </div>
                <p
                  className={`mb-4 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {post.excerpt}
                </p>
                <button
                  className={`flex items-center text-sm font-medium ${
                    theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                  } hover:opacity-80 transition-opacity`}
                >
                  Read more
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate("/blog")}
            className={`px-8 py-3 rounded-lg font-semibold text-lg ${
              theme === "dark"
                ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                : "bg-cyan-100 hover:bg-cyan-200 text-cyan-800"
            } transition-colors`}
          >
            View All Articles
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
