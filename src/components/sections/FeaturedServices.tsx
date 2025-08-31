import React from "react";
import { motion } from "framer-motion";
import { services } from "../../constants/services";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ServiceCard = ({ service, index }) => {
  const theme = document.documentElement.className;
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const cardBorder =
    theme === "dark"
      ? "border-2 border-transparent"
      : "border-2 border-transparent";
  const iconColor = theme === "dark" ? "text-cyan-500" : "text-cyan-600";
  const hoverIconColor =
    theme === "dark"
      ? "group-hover:text-purple-500"
      : "group-hover:text-purple-600";
  const glow =
    theme === "dark"
      ? "0 0 20px rgba(0, 255, 255, 0.5)"
      : "0 0 20px rgba(0, 169, 255, 0.3)";

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    hover: {
      scale: 1.05,
      y: -10,
      boxShadow: glow,
      transition: { duration: 0.3 },
    },
  };

  const iconVariants = {
    hover: {
      rotate: [0, 10, -10, 0],
      transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileInView="whileInView"
      initial="initial"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative rounded-xl overflow-hidden cursor-pointer"
    >
      {/* Background glow effect */}
      <div
        className={`absolute inset-0 z-0 rounded-xl transition-all duration-300
        ${
          theme === "dark"
            ? "bg-gradient-to-br from-cyan-500/10 to-purple-500/10"
            : "bg-gradient-to-br from-cyan-600/10 to-purple-600/10"
        }`}
      ></div>

      <div
        className={`relative z-10 w-full h-full rounded-xl p-8 flex flex-col justify-between transition-colors duration-300 ${cardBg} ${cardBorder}`}
      >
        <div>
          <motion.div
            variants={iconVariants}
            className={`w-16 h-16 mx-auto mb-4 transition-colors duration-300 ${iconColor} ${hoverIconColor}`}
          >
            {service.icon}
          </motion.div>
          <h3
            className={`text-3xl font-bold text-text-primary mb-2 text-center transition-colors duration-300 ${
              theme === "dark"
                ? "group-hover:text-cyan-400"
                : "group-hover:text-cyan-600"
            }`}
          >
            {service.title}
          </h3>
          <p className="text-center text-text-secondary">
            {service.description}
          </p>
        </div>

        <ul className="text-left space-y-2 text-text-secondary list-disc list-inside mt-6">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-center space-x-2">
              <span
                className={`flex-shrink-0 ${
                  theme === "dark" ? "text-purple-500" : "text-purple-600"
                }`}
              >
                <ArrowRight size={16} />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const FeaturedServices = () => {
  const theme = document.documentElement.className;
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-gray-100";

  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-text-primary mb-4">
          Our Core Solutions
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          We empower food brands with two powerful platforms, built on a
          foundation of AI innovation.
        </p>
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedServices;
