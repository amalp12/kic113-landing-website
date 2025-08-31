import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Clock,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
} from "lucide-react";
import { blogContent, blogPosts } from "../constants/blog";
import { useTheme } from "../context/ThemeContext";

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const postId = id ? parseInt(id, 10) : null;

  // In a real app, you would fetch the blog post by ID from an API
  const post = postId ? blogContent[postId as keyof typeof blogContent] : null;

  // Get related posts (excluding the current post)
  const relatedPosts = blogPosts.filter((p) => p.id !== postId).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-lg mb-6">
            The requested blog post could not be found.
          </p>
          <button
            onClick={() => navigate("/blog")}
            className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  // Function to copy the current URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    // You might want to add a toast notification here
  };

  // Calculate reading time (assuming 200 words per minute)
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/blog")}
          className={`flex items-center mb-8 group ${
            theme === "dark" ? "text-cyan-400" : "text-cyan-600"
          }`}
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </button>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center text-sm mb-6">
            <div className="flex items-center mr-6 mb-2">
              <Calendar className="w-4 h-4 mr-1.5 text-gray-500" />
              <span
                className={theme === "dark" ? "text-gray-400" : "text-gray-600"}
              >
                {post.date}
              </span>
            </div>
            <div className="flex items-center mr-6 mb-2">
              <User className="w-4 h-4 mr-1.5 text-gray-500" />
              <span
                className={theme === "dark" ? "text-gray-400" : "text-gray-600"}
              >
                {post.author}
              </span>
            </div>
            <div className="flex items-center mr-6 mb-2">
              <Clock className="w-4 h-4 mr-1.5 text-gray-500" />
              <span
                className={theme === "dark" ? "text-gray-400" : "text-gray-600"}
              >
                {readingTime} min read
              </span>
            </div>
          </div>

          <h1
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {["AI", "Food Safety", "Technology"].map((tag, index) => (
              <span
                key={index}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  theme === "dark"
                    ? "bg-gray-700 text-cyan-400"
                    : "bg-cyan-100 text-cyan-800"
                }`}
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          <div className="h-96 rounded-xl overflow-hidden mb-8 bg-gradient-to-r from-cyan-500 to-blue-600">
            {/* Featured Image */}
            <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20"></div>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center justify-between py-4 border-t border-b border-gray-200 dark:border-gray-700 mb-8">
            <span
              className={theme === "dark" ? "text-gray-300" : "text-gray-600"}
            >
              Share this article:
            </span>
            <div className="flex space-x-3">
              <button
                className={`p-2 rounded-full ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                } transition-colors`}
                aria-label="Share on Facebook"
              >
                <Facebook className="w-5 h-5 text-blue-600" />
              </button>
              <button
                className={`p-2 rounded-full ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                } transition-colors`}
                aria-label="Share on Twitter"
              >
                <Twitter className="w-5 h-5 text-blue-400" />
              </button>
              <button
                className={`p-2 rounded-full ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                } transition-colors`}
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-blue-700" />
              </button>
              <button
                onClick={copyToClipboard}
                className={`p-2 rounded-full ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                } transition-colors`}
                aria-label="Copy link"
              >
                <LinkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose dark:prose-invert max-w-none mb-16">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* Author Bio */}
        <div
          className={`p-6 rounded-xl mb-16 ${
            theme === "dark" ? "bg-gray-800/50" : "bg-gray-50"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-20 h-20 rounded-full bg-gray-300 mb-4 md:mb-0 md:mr-6 overflow-hidden">
              {/* Author image placeholder */}
              <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600"></div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">{post.author}</h3>
              <p
                className={`mb-3 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {post.author === "Alex Rivera"
                  ? "AI & Food Safety Expert"
                  : post.author === "Jordan K."
                  ? "Blockchain Specialist"
                  : "Industry Expert"}
              </p>
              <p
                className={theme === "dark" ? "text-gray-300" : "text-gray-600"}
              >
                {post.author} is a leading expert in their field with years of
                experience in{" "}
                {post.title.includes("AI")
                  ? "artificial intelligence and machine learning"
                  : post.title.includes("Blockchain")
                  ? "blockchain technology and supply chain management"
                  : "food safety and regulatory compliance"}
                .
              </p>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mb-16">
            <h2
              className={`text-2xl font-bold mb-8 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              You might also like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <motion.article
                  key={relatedPost.id}
                  whileHover={{ y: -5 }}
                  className={`rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                    theme === "dark"
                      ? "bg-gray-800/50 hover:bg-gray-800/80"
                      : "bg-white hover:shadow-lg border border-gray-100"
                  }`}
                  onClick={() => navigate(`/blog/${relatedPost.id}`)}
                >
                  <div className="h-40 bg-gray-200">
                    {/* Placeholder for post image */}
                    <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20"></div>
                  </div>
                  <div className="p-5">
                    <h3
                      className={`font-bold mb-2 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {relatedPost.title}
                    </h3>
                    <p
                      className={`text-sm mb-3 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {relatedPost.excerpt.length > 80
                        ? `${relatedPost.excerpt.substring(0, 80)}...`
                        : relatedPost.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-cyan-500">
                      Read more
                      <ArrowRight className="ml-1 w-3 h-3" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div
          className={`p-8 rounded-2xl ${
            theme === "dark" ? "bg-gray-800/50" : "bg-gray-50"
          }`}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className={`text-2xl font-bold mb-3 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Enjoyed this article?
            </h2>
            <p
              className={`mb-6 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Subscribe to our newsletter to receive more content like this
              directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-3 rounded-lg border ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500"
                } focus:outline-none focus:ring-1`}
              />
              <button className="px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
