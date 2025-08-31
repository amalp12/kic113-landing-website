import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

const Footer = () => {
  const { theme } = useTheme();
  const footerBg = theme === "dark" ? "bg-gray-950/80" : "bg-gray-50/80";
  const footerTextColor = theme === "dark" ? "text-gray-400" : "text-gray-600";

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
      className={`relative py-12 text-center transition-colors duration-500 ${footerTextColor} ${footerBg}`}
    >
      <div
        className={`absolute top-0 left-0 w-full h-1 transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gradient-to-r from-cyan-500 to-purple-500"
            : "bg-gradient-to-r from-cyan-600 to-purple-600"
        }`}
      ></div>
      <div className="container mx-auto px-4 lg:px-8">
        <p>&copy; 2024 KIC113. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
