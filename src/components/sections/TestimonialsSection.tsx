import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { testimonials } from "../../constants/testimonials";
import { useTheme } from "../../context/ThemeContext";

const TestimonialsSection: React.FC = () => {
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

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-xl max-w-2xl mx-auto ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Don't just take our word for it. Here's what our clients have to say
            about us.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
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
                className={`p-8 rounded-2xl ${
                  theme === "dark" ? "bg-gray-800/50" : "bg-white shadow-lg"
                }`}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex mb-4">
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
                    className={`text-xl md:text-2xl font-medium mb-6 max-w-3xl mx-auto ${
                      theme === "dark" ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    "{featuredTestimonials[currentIndex].quote}"
                  </blockquote>
                  <div
                    className={`text-lg font-semibold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {featuredTestimonials[currentIndex].author}
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

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 rounded-xl ${
                theme === "dark" ? "bg-gray-800/50" : "bg-white shadow-md"
              }`}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      theme === "dark" ? "text-yellow-400" : "text-yellow-500"
                    } fill-current`}
                  />
                ))}
              </div>
              <p
                className={`mb-4 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                "{testimonial.quote}"
              </p>
              <div
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                }`}
              >
                {testimonial.author}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
