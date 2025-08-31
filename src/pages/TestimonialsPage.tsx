import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  Users,
  Briefcase,
  Award,
} from "lucide-react";
import { testimonials } from "../constants/testimonials";
import { useTheme } from "../context/ThemeContext";
import { useRef } from "react";

const TestimonialsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const theme = document.documentElement.className;
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const cardBorder = theme === "dark" ? "border-gray-700" : "border-gray-300";
  const featuredBorder =
    theme === "dark" ? "border-purple-500" : "border-purple-600";
  const featuredBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const authorColor = theme === "dark" ? "text-cyan-400" : "text-cyan-600";
  const neonGlow =
    theme === "dark"
      ? "radial-gradient(circle, rgba(128, 0, 128, 0.4) 0%, rgba(128, 0, 128, 0) 70%)"
      : "radial-gradient(circle, rgba(128, 0, 128, 0.2) 0%, rgba(128, 0, 128, 0) 70%)";

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const containerVariants = {
    initial: { x: 0 },
    animate: {
      x: `-${currentIndex * 100}%`,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
      },
    },
  };

  const testimonialVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
  };

  const navButtonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    hover: { scale: 1.1 },
  };

  return (
    <div className="py-20 mt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-text-primary mb-4">
          Client Success Stories
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Our clients' words are a testament to the impact and value we deliver
          every day.
        </p>
      </motion.div>

      <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
        <div className="flex">
          <motion.div
            className="flex w-full"
            ref={sliderRef}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            drag="x"
            dragConstraints={{
              left: -(testimonials.length - 1) * sliderRef.current?.offsetWidth,
              right: 0,
            }}
            onDragEnd={(e, { offset }) => {
              if (Math.abs(offset.x) > 50) {
                if (offset.x < 0) {
                  goToNext();
                } else {
                  goToPrev();
                }
              }
            }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="w-full flex-shrink-0 p-8 relative"
                variants={testimonialVariants}
                initial="initial"
                animate={currentIndex === index ? "animate" : "initial"}
              >
                <div
                  className={`p-10 rounded-xl relative border transition-colors duration-300
                  ${
                    testimonial.featured
                      ? `${featuredBorder} ${featuredBg} shadow-purple-glow`
                      : `${cardBorder} ${cardBg}`
                  }`}
                >
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={testimonial.featured ? { opacity: 1 } : {}}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                    style={{ background: neonGlow }}
                  ></motion.div>
                  <p className="relative z-10 text-xl italic text-text-primary mb-4">
                    "{testimonial.quote}"
                  </p>
                  <p className={`relative z-10 font-semibold ${authorColor}`}>
                    {testimonial.author}
                  </p>
                </div>
                {index === currentIndex && (
                  <>
                    <motion.button
                      onClick={goToPrev}
                      className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full backdrop-blur-sm transition-colors duration-300
                      ${
                        theme === "dark"
                          ? "bg-white/20 text-white hover:bg-white/40"
                          : "bg-gray-800/20 text-white hover:bg-gray-800/40"
                      }`}
                      variants={navButtonVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                    >
                      <ChevronLeft size={24} />
                    </motion.button>
                    <motion.button
                      onClick={goToNext}
                      className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full backdrop-blur-sm transition-colors duration-300
                      ${
                        theme === "dark"
                          ? "bg-white/20 text-white hover:bg-white/40"
                          : "bg-gray-800/20 text-white hover:bg-gray-800/40"
                      }`}
                      variants={navButtonVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                    >
                      <ChevronRight size={24} />
                    </motion.button>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
