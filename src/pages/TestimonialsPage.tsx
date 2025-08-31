import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { testimonials } from "../constants/testimonials";
import { useTheme } from "../context/ThemeContext";

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  featured: boolean;
}

const TestimonialsPage = () => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
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
    <div className="py-20 mt-20 overflow-hidden">
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
              left: -(testimonials.length - 1) * (sliderRef.current?.offsetWidth || 0),
              right: 0,
            }}
            onDragEnd={(e, info) => {
              if (info.offset) {
                const { offset } = info;
                if (Math.abs(offset.x) > 50) {
                  if (offset.x < 0) {
                    goToNext();
                  } else {
                    goToPrev();
                  }
                }
              }
            }}
          >
            {testimonials.map((testimonial: Testimonial, index: number) => (
              <motion.div
                key={index}
                className="w-full flex-shrink-0 px-8 py-12 relative group"
                variants={testimonialVariants}
              >
                {/* Left Navigation Arrow - Only show on hover */}
                <div
                  className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    currentIndex === 0 ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  onClick={currentIndex === 0 ? undefined : goToPrev}
                >
                  <div
                    className={`p-2 rounded-full ${
                      theme === "dark"
                        ? "bg-white/20 hover:bg-white/40"
                        : "bg-gray-800/20 hover:bg-gray-800/40"
                    }`}
                  >
                    <ChevronLeft
                      size={24}
                      className={
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }
                    />
                  </div>
                </div>

                {/* Right Navigation Arrow - Only show on hover */}
                <div
                  className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    currentIndex === testimonials.length - 1 ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  onClick={
                    currentIndex === testimonials.length - 1
                      ? undefined
                      : goToNext
                  }
                >
                  <div
                    className={`p-2 rounded-full ${
                      theme === "dark"
                        ? "bg-white/20 hover:bg-white/40"
                        : "bg-gray-800/20 hover:bg-gray-800/40"
                    }`}
                  >
                    <ChevronRight
                      size={24}
                      className={
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }
                    />
                  </div>
                </div>

                {/* Testimonial Card */}
                <div
                  className={`p-8 rounded-xl relative border transition-all duration-300 hover:shadow-lg ${
                    testimonial.featured
                      ? `${featuredBorder} ${featuredBg} shadow-purple-glow`
                      : `${cardBorder} ${cardBg}`
                  }`}
                >
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={testimonial.featured ? { opacity: 1 } : {}}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                    style={{ background: neonGlow }}
                  />
                  <div className="relative z-10">
                    <p className="text-xl italic text-text-primary mb-6">
                      "{testimonial.quote}"
                    </p>
                    <p className={`font-semibold ${authorColor}`}>
                      {testimonial.author}
                    </p>
                    {testimonial.role && (
                      <p className="text-sm text-text-secondary mt-1">
                        {testimonial.role}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
