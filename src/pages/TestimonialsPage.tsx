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

const TestimonialsPage: React.FC = () => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const featuredTestimonials = testimonials.filter((t) => t.featured);
  const totalTestimonials = featuredTestimonials.length;

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === totalTestimonials - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalTestimonials - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, isAutoPlaying]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  // Stats data
  const stats = [
    { value: "95%", label: "Client Satisfaction", icon: <Star /> },
    { value: "50+", label: "Happy Clients", icon: <Users /> },
    { value: "100+", label: "Projects Completed", icon: <Briefcase /> },
    { value: "5", label: "Industry Awards", icon: <Award /> },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            What Our Clients Say
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-xl max-w-3xl mx-auto ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Don't just take our word for it. Here's what our clients have to say
            about working with us.
          </motion.p>
        </div>

        {/* Featured Testimonial Slider */}
        <div className="relative max-w-5xl mx-auto mb-20">
          <div className="relative overflow-hidden">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className={`p-8 md:p-12 rounded-3xl ${
                  theme === "dark" ? "bg-gray-800/50" : "bg-white shadow-xl"
                }`}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-1/3 mb-8 md:mb-0 md:pr-8">
                    <div className="relative">
                      <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-cyan-500/20">
                        <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white text-5xl font-bold">
                          {featuredTestimonials[currentIndex].author.charAt(0)}
                        </div>
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-cyan-500 text-white p-2 rounded-full">
                        <Quote className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3 text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-6 h-6 ${
                            theme === "dark"
                              ? "text-yellow-400"
                              : "text-yellow-500"
                          } fill-current`}
                        />
                      ))}
                    </div>
                    <blockquote
                      className={`text-xl md:text-2xl font-medium mb-6 italic ${
                        theme === "dark" ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      "{featuredTestimonials[currentIndex].quote}"
                    </blockquote>
                    <div>
                      <p
                        className={`text-lg font-semibold ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {
                          featuredTestimonials[currentIndex].author.split(
                            ","
                          )[0]
                        }
                      </p>
                      <p
                        className={`${
                          theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                        }`}
                      >
                        {
                          featuredTestimonials[currentIndex].author.split(
                            ","
                          )[1]
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prevSlide}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 rounded-full ${
              theme === "dark"
                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-200"
            } transition-colors`}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={nextSlide}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 rounded-full ${
              theme === "dark"
                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-200"
            } transition-colors`}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="flex justify-center mt-8 space-x-2">
            {featuredTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index
                    ? theme === "dark"
                      ? "bg-cyan-500 scale-125"
                      : "bg-cyan-600 scale-125"
                    : theme === "dark"
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 rounded-xl text-center ${
                theme === "dark" ? "bg-gray-800/50" : "bg-white shadow-md"
              }`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  theme === "dark" ? "bg-cyan-500/20" : "bg-cyan-100"
                }`}
              >
                {React.cloneElement(stat.icon, {
                  className: `w-7 h-7 ${
                    theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                  }`,
                })}
              </div>
              <p
                className={`text-3xl font-bold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {stat.value}
              </p>
              <p
                className={theme === "dark" ? "text-gray-300" : "text-gray-600"}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* All Testimonials Grid */}
        <div className="mb-20">
          <h2
            className={`text-3xl font-bold text-center mb-12 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            More Success Stories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                className={`p-6 rounded-xl transition-all duration-300 hover:shadow-lg ${
                  theme === "dark"
                    ? "bg-gray-800/50 hover:bg-gray-800/80"
                    : "bg-white hover:shadow-xl border border-gray-100"
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500 mr-4">
                    <Quote className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">
                      {testimonial.author.split(",")[0]}
                    </p>
                    <p className="text-sm text-cyan-500">
                      {testimonial.author.split(",")[1]}
                    </p>
                  </div>
                </div>
                <p
                  className={
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }
                >
                  "{testimonial.quote}"
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        theme === "dark" ? "text-yellow-400" : "text-yellow-500"
                      } fill-current`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div
          className={`p-12 rounded-3xl text-center ${
            theme === "dark"
              ? "bg-gradient-to-r from-cyan-900/50 to-blue-900/50"
              : "bg-gradient-to-r from-cyan-50 to-blue-50"
          }`}
        >
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Ready to join our satisfied clients?
          </h2>
          <p
            className={`text-xl mb-8 max-w-2xl mx-auto ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Get started with KIC113 today and experience the difference our AI
            solutions can make for your business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className={`px-8 py-3 rounded-lg font-semibold text-lg ${
                theme === "dark"
                  ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                  : "bg-cyan-600 hover:bg-cyan-700 text-white"
              } transition-colors`}
            >
              Get Started
            </button>
            <button
              className={`px-8 py-3 rounded-lg font-semibold text-lg ${
                theme === "dark"
                  ? "bg-transparent border border-gray-600 hover:bg-gray-700/50 text-white"
                  : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-800"
              } transition-colors`}
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
