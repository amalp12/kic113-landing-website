import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { services } from "../constants/services";
import { useTheme } from "../context/ThemeContext";

const ServicesPage = () => {
  const { theme } = useTheme();

  const cardBg = theme === "dark" ? "bg-gray-800/50" : "bg-white";
  const cardBorder =
    theme === "dark"
      ? "border-cyan-500/20 hover:border-cyan-500/40"
      : "border-gray-200 hover:border-cyan-500/40";
  const iconBg = theme === "dark" ? "bg-cyan-900/30" : "bg-cyan-50";
  const textColor = theme === "dark" ? "text-cyan-400" : "text-cyan-600";
  const hoverEffect =
    theme === "dark"
      ? "hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]"
      : "hover:shadow-lg";

  return (
    <div className="py-20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            AI-driven solutions designed to transform the food industry through
            innovation and compliance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative rounded-xl border ${cardBg} ${cardBorder} ${hoverEffect} transition-all duration-300 overflow-hidden`}
            >
              <div className="p-6">
                <motion.div
                  className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center mb-6`}
                  whileHover={{ rotateY: 10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {React.cloneElement(service.icon, {
                    className: `w-6 h-6 ${textColor} transition-transform duration-300 group-hover:scale-110`,
                  })}
                </motion.div>

                <h3
                  className={`text-xl font-bold mb-3 ${textColor} group-hover:text-cyan-500 transition-colors`}
                >
                  {service.title}
                </h3>

                <p className="text-text-secondary mb-4">{service.description}</p>

                <ul className="space-y-2.5 mt-6">
                  {service.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 * idx }}
                      className="flex items-start text-sm"
                    >
                      <ChevronRight
                        className={`flex-shrink-0 mt-0.5 mr-2 ${textColor} w-4 h-4`}
                      />
                      <span className="text-text-primary">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-gray-200/10"></div>
              </div>

              {/* Decorative elements */}
              <div
                className={`absolute -right-10 -top-10 w-40 h-40 rounded-full ${
                  theme === "dark" ? "bg-cyan-500/5" : "bg-cyan-500/10"
                } group-hover:opacity-50 transition-opacity duration-300`}
              ></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
