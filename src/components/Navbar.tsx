import { motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { links } from "../constants/links";

interface NavbarProps {
  toggleTheme: () => void;
  theme: 'light' | 'dark';
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  toggleTheme,
  theme,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 py-4 backdrop-blur-md transition-colors duration-500
        ${theme === "dark" ? "bg-gray-950/80" : "bg-gray-50/80"} shadow-lg`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 lg:px-8">
        <Link
          to="/"
          className={`text-2xl font-bold tracking-wider cursor-pointer transition-colors duration-300
          ${theme === "dark" ? "text-cyan-500" : "text-cyan-600"}`}
        >
          KIC113
        </Link>
        <div className="hidden lg:flex items-center space-x-8">
          {links.map((link) => (
            <motion.div
              key={link.path}
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to={link.path}
                className={`text-lg transition-colors duration-300 relative group
                  ${
                    currentPath === link.path
                      ? theme === "dark"
                        ? "text-white"
                        : "text-gray-900"
                      : theme === "dark"
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }
                `}
              >
                {link.name}
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 ${
                  theme === "dark" ? "bg-cyan-400" : "bg-cyan-600"
                } ${currentPath === link.path ? "scale-x-100" : "scale-x-0"}`}
              />
            </Link>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${
              theme === "dark"
                ? "text-cyan-400 hover:bg-gray-800"
                : "text-cyan-600 hover:bg-gray-100"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>
          <button
            className="lg:hidden p-2 rounded-md focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X
                className={`w-6 h-6 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}
              />
            ) : (
              <Menu
                className={`w-6 h-6 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}
              />
            )}
          </button>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <div
            className={`px-4 py-2 space-y-2 ${
              theme === "dark" ? "bg-gray-900/95" : "bg-white/95"
            }`}
          >
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-md transition-colors ${
                  currentPath === link.path
                    ? theme === "dark"
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-900"
                    : theme === "dark"
                    ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
