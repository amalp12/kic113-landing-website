import { useTheme } from "../context/ThemeContext";
import { BlogPost } from "../constants/blog";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Clipboard } from "lucide-react";
import {
  FaFacebook,
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";

interface BlogDetailPageProps {
  post: Omit<BlogPost, "id">;
  onBack: () => void;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ post, onBack }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1
          className={`text-3xl ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Blog post not found.
        </h1>
        <button
          onClick={onBack}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
            theme === "dark"
              ? "bg-cyan-600 text-white hover:bg-cyan-700"
              : "bg-cyan-600 text-white hover:bg-cyan-700"
          }`}
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleCopyToClipboard = () => {
    const content = post.content || "";
    const textToCopy = `${post.title} by ${post.author}\n\n${content.replace(
      /<[^>]*>/g,
      ""
    )}`;
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

  const shareOnSocialMedia = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);
    const content = post.content || "";
    const text = encodeURIComponent(
      content.replace(/<[^>]*>/g, "").substring(0, 200)
    );

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${text}`;
        break;
      case "x":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case "instagram":
        // Instagram doesn't support direct sharing of external content
        // This will open the Instagram app or website
        shareUrl = `https://www.instagram.com`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

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
          className={`prose max-w-none leading-relaxed text-foreground
            ${
              theme === "dark"
                ? "prose-invert prose-headings:text-white prose-p:text-gray-300"
                : "prose"
            }`}
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        ></motion.div>

        <motion.div className="flex items-center space-x-4 mt-8">
          <p className={`${shareButtonColor} font-medium`}>Share:</p>
          <div className="flex space-x-3">
            <motion.button
              onClick={() => shareOnSocialMedia("facebook")}
              whileHover={{ scale: 1.1, y: -2 }}
              className={`p-2 rounded-full ${socialIconColor} ${socialIconHover} transition-colors duration-300`}
              aria-label="Share on Facebook"
            >
              <FaFacebook className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => shareOnSocialMedia("linkedin")}
              whileHover={{ scale: 1.1, y: -2 }}
              className={`p-2 rounded-full ${socialIconColor} ${socialIconHover} transition-colors duration-300`}
              aria-label="Share on LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => shareOnSocialMedia("x")}
              whileHover={{ scale: 1.1, y: -2 }}
              className={`p-2 rounded-full ${socialIconColor} ${socialIconHover} transition-colors duration-300`}
              aria-label="Share on X"
            >
              <FaXTwitter className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => shareOnSocialMedia("instagram")}
              whileHover={{ scale: 1.1, y: -2 }}
              className={`p-2 rounded-full ${socialIconColor} ${socialIconHover} transition-colors duration-300`}
              aria-label="Share on Instagram"
            >
              <FaInstagram className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={handleCopyToClipboard}
              whileHover={{ scale: 1.1, y: -2 }}
              className={`p-2 rounded-full ${socialIconColor} ${socialIconHover} transition-colors duration-300`}
              aria-label="Copy to clipboard"
            >
              <Clipboard size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlogDetailPage;
