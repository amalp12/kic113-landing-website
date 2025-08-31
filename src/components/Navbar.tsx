import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { links } from "../constants/links";

const Navbar = ({
  currentPage,
  navigate,
  toggleTheme,
  theme,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => (
  <motion.header
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ type: "spring", stiffness: 100 }}
    className={`fixed top-0 left-0 right-0 z-50 py-4 backdrop-blur-md transition-colors duration-500
      ${theme === "dark" ? "bg-gray-950/80" : "bg-gray-50/80"} shadow-lg`}
  >
    <nav className="container mx-auto flex items-center justify-between px-4 lg:px-8">
      <div
        className={`text-2xl font-bold tracking-wider cursor-pointer transition-colors duration-300
        ${theme === "dark" ? "text-cyan-500" : "text-cyan-600"}`}
        onClick={() => navigate("home")}
      >
        KIC113
      </div>
      <div className="hidden lg:flex items-center space-x-8">
        {links.map((link) => (
          <motion.div
            key={link.path}
            className="relative"
            whileHover={{ scale: 1.05 }}
          >
            <a
              href="#"
              onClick={() => navigate(link.path)}
              className={`text-lg transition-colors duration-300 relative group
                ${
                  currentPage === link.path
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
                className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out
                ${theme === "dark" ? "bg-cyan-500" : "bg-cyan-600"}`}
              ></span>
            </a>
          </motion.div>
        ))}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors duration-300
          ${
            theme === "dark"
              ? "text-white hover:bg-gray-800"
              : "text-gray-800 hover:bg-gray-200"
          }`}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
      </div>

      <div className="lg:hidden flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors duration-300
          ${
            theme === "dark"
              ? "text-white hover:bg-gray-800"
              : "text-gray-800 hover:bg-gray-200"
          }`}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`transition-colors duration-300
          ${theme === "dark" ? "text-white" : "text-gray-800"}`}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>

    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`lg:hidden mt-4 mx-4 p-4 rounded-xl transition-colors duration-500
            ${theme === "dark" ? "bg-gray-900/90" : "bg-gray-200/90"}`}
        >
          <ul className="flex flex-col items-center space-y-4">
            {links.map((link) => (
              <li key={link.path}>
                <a
                  href="#"
                  onClick={() => navigate(link.path)}
                  className={`text-lg font-medium transition-colors duration-300
                    ${
                      currentPage === link.path
                        ? theme === "dark"
                          ? "text-white"
                          : "text-gray-900"
                        : theme === "dark"
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.header>
);

export default Navbar;
