import { motion } from "framer-motion";
import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this data to a server
    console.log("Form Submitted:", formData);
    setIsSubmitted(true);
  };

  const theme = document.documentElement.className;
  const formBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const formBorder =
    theme === "dark" ? "border-cyan-500/20" : "border-cyan-600/20";
  const inputBorder = theme === "dark" ? "border-gray-600" : "border-gray-400";
  const inputFocusBorder =
    theme === "dark" ? "focus:border-cyan-500" : "focus:border-cyan-600";
  const labelColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const labelFocusColor =
    theme === "dark"
      ? "group-focus-within:text-cyan-400"
      : "group-focus-within:text-cyan-600";
  const submitButtonBg = theme === "dark" ? "bg-cyan-600" : "bg-cyan-600";
  const submitButtonText = theme === "dark" ? "text-white" : "text-white";
  const shadowGlow =
    theme === "dark"
      ? "0 0 15px rgba(0, 255, 255, 0.6)"
      : "0 0 15px rgba(0, 169, 255, 0.4)";

  return (
    <div className="py-20 mt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-text-primary mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Ready to revolutionize your brand? Get in touch with our team today.
        </p>
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className={`${formBg} border-2 ${formBorder} p-8 rounded-xl shadow-lg transition-colors duration-300`}
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <h2
                className={`text-3xl font-bold mb-4 ${
                  theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                }`}
              >
                Thank You!
              </h2>
              <p className="text-xl text-text-secondary">
                Your message has been received. We'll be in touch shortly.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b ${inputBorder} ${inputFocusBorder} text-text-primary py-2 focus:outline-none transition-colors duration-300 peer`}
                  required
                />
                <label
                  htmlFor="name"
                  className={`absolute left-0 top-2 transition-all duration-300 pointer-events-none
                    ${labelColor}
                    ${
                      formData.name ||
                      "group-focus-within:top-0 group-focus-within:text-sm"
                    }
                    ${formData.name || labelFocusColor}`}
                >
                  Name
                </label>
              </div>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b ${inputBorder} ${inputFocusBorder} text-text-primary py-2 focus:outline-none transition-colors duration-300 peer`}
                  required
                />
                <label
                  htmlFor="email"
                  className={`absolute left-0 top-2 transition-all duration-300 pointer-events-none
                    ${labelColor}
                    ${
                      formData.email ||
                      "group-focus-within:top-0 group-focus-within:text-sm"
                    }
                    ${formData.email || labelFocusColor}`}
                >
                  Email
                </label>
              </div>
              <div className="relative group">
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b ${inputBorder} ${inputFocusBorder} text-text-primary py-2 focus:outline-none transition-colors duration-300 peer`}
                  rows={4}
                  required
                ></textarea>
                <label
                  htmlFor="message"
                  className={`absolute left-0 top-2 transition-all duration-300 pointer-events-none
                    ${labelColor}
                    ${
                      formData.message ||
                      "group-focus-within:top-0 group-focus-within:text-sm"
                    }
                    ${formData.message || labelFocusColor}`}
                >
                  Message
                </label>
              </div>
              <motion.button
                type="submit"
                className={`w-full px-8 py-3 rounded-full text-lg font-semibold relative overflow-hidden transition-colors duration-500
                  ${submitButtonBg} ${submitButtonText}`}
                whileHover={{ scale: 1.05, boxShadow: shadowGlow }}
              >
                Submit
              </motion.button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
