import { motion } from "framer-motion";
import { ChevronLeft, Facebook, Linkedin, Twitter } from "lucide-react";

const BlogDetailPage = ({ post, navigate }) => {
  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl text-text-primary">Blog post not found.</h1>
        <button
          onClick={() => navigate("blog")}
          className={`mt-4 px-4 py-2 rounded-lg transition-colors duration-300
          ${
            document.documentElement.className === "dark"
              ? "bg-cyan-600 text-white"
              : "bg-cyan-600 text-white"
          }`}
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleCopyToClipboard = () => {
    const textToCopy = `${post.title} by ${
      post.author
    }\n\n${post.content.replace(/<[^>]*>/g, "")}`;
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      alert("Content copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
    document.body.removeChild(textarea);
  };

  const theme = document.documentElement.className;
  const backButtonColor = theme === "dark" ? "text-cyan-400" : "text-cyan-600";
  const backButtonHover =
    theme === "dark" ? "hover:text-white" : "hover:text-gray-900";
  const socialIconColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const socialIconHover =
    theme === "dark" ? "hover:text-cyan-400" : "hover:text-cyan-600";
  const shareButtonColor = theme === "dark" ? "text-gray-400" : "text-gray-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-20 mt-20"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <button
          onClick={() => navigate("blog")}
          className={`flex items-center transition-colors duration-300 mb-8
          ${backButtonColor} ${backButtonHover}`}
        >
          <ChevronLeft size={20} className="mr-2" /> Back to Blog
        </button>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl lg:text-5xl font-bold text-text-primary mb-2"
        >
          {post.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg text-text-secondary mb-8"
        >
          {post.date} by {post.author}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className={`prose max-w-none leading-relaxed
            ${theme === "dark" ? "prose-invert" : "prose"}`}
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></motion.div>

        <div className="mt-8 flex items-center space-x-4">
          <span className={shareButtonColor}>Share:</span>
          <motion.a
            href="#"
            whileHover={{ scale: 1.2, y: -2 }}
            className={`${socialIconColor} ${socialIconHover} transition-colors duration-300`}
          >
            <Facebook />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.2, y: -2 }}
            className={`${socialIconColor} ${socialIconHover} transition-colors duration-300`}
          >
            <Twitter />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.2, y: -2 }}
            className={`${socialIconColor} ${socialIconHover} transition-colors duration-300`}
          >
            <Linkedin />
          </motion.a>
          <motion.button
            onClick={handleCopyToClipboard}
            whileHover={{ scale: 1.2, y: -2 }}
            className={`${socialIconColor} ${socialIconHover} transition-colors duration-300`}
          >
            <Clipboard />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetailPage;
