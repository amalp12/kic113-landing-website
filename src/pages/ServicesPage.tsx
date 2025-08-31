import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "../constants/services";
import { useTheme } from "../context/ThemeContext";
const ServicesPage = () => {
  const { theme } = useTheme();
  const variants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };

  const featureVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
  };

  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const cardBorder =
    theme === "dark" ? "border-cyan-500/30" : "border-cyan-600/30";
  const iconColor = theme === "dark" ? "text-cyan-500" : "text-cyan-600";
  const neonGlow =
    theme === "dark"
      ? "radial-gradient(circle at center, rgba(0, 255, 255, 0.2), transparent 70%)"
      : "radial-gradient(circle at center, rgba(0, 255, 255, 0.1), transparent 70%)";

  return (
    <div className="py-20 mt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-text-primary mb-4">
          Our Services
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          KIC113 offers two powerful, AI-driven platforms designed to meet the
          unique needs of the modern food industry.
        </p>
      </motion.div>

      {services.map((service, index) => (
        <section key={index} className="py-12 border-b border-gray-800">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              variants={variants}
              className={`flex flex-col-reverse lg:flex-row items-center gap-12 ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="lg:w-1/2">
                <h2
                  className={`text-3xl lg:text-4xl font-bold mb-4 ${
                    theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                  }`}
                >
                  {service.title}
                </h2>
                <p className="text-lg text-text-secondary mb-6">
                  {service.description}
                </p>
                <motion.ul
                  className="space-y-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.2 } },
                  }}
                >
                  {service.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      variants={featureVariants}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="flex items-start space-x-3 text-text-primary"
                    >
                      <span
                        className={`flex-shrink-0 mt-1 ${
                          theme === "dark"
                            ? "text-purple-400"
                            : "text-purple-600"
                        }`}
                      >
                        <ArrowRight size={20} />
                      </span>
                      <q></q>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
              <div className="lg:w-1/2 relative">
                <motion.div
                  className={`w-full h-80 rounded-xl flex items-center justify-center text-8xl transition-colors duration-300
                    ${cardBg} ${cardBorder} ${iconColor}`}
                  initial={{ rotateY: 0 }}
                  whileHover={{ rotateY: 10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {service.icon}
                </motion.div>
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{ background: neonGlow }}
                ></div>
              </div>
            </motion.div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ServicesPage;
