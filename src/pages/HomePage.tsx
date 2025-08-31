import { blogPosts } from "@/constants/blog";
import { testimonials } from "@/constants/testimonials";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FeaturedServices from "../components/sections/FeaturedServices";
import HeroSection from "../components/sections/HeroSection";
import { useTheme } from "@/context/ThemeContext";
interface LatestInsightsProps {
  onBlogClick: (postId: number) => void;
}

const LatestInsights: React.FC<LatestInsightsProps> = ({ onBlogClick }) => {
  const { theme } = useTheme();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const linkColor = theme === "dark" ? "text-cyan-400" : "text-cyan-600";
  const hoverLinkColor =
    theme === "dark"
      ? "group-hover:text-purple-400"
      : "group-hover:text-purple-600";
  const glow =
    theme === "dark"
      ? "0 0 20px rgba(0, 255, 255, 0.5)"
      : "0 0 20px rgba(0, 169, 255, 0.3)";

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
          Latest Insights
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Stay ahead of the curve with our latest articles on AI, food safety,
          and innovation.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {blogPosts.map((post) => (
          <motion.div
            key={post.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05, boxShadow: glow }}
            className={`group relative overflow-hidden rounded-xl border-2 border-transparent transition-all duration-300 cursor-pointer`}
            onClick={() => onBlogClick(post.id)}
          >
            <div
              className={`p-6 rounded-xl transition-colors duration-300 ${cardBg}`}
            >
              <h3
                className={`text-2xl font-semibold text-text-primary mb-2 transition-colors duration-300
                ${
                  theme === "dark"
                    ? "group-hover:text-cyan-400"
                    : "group-hover:text-cyan-600"
                }`}
              >
                {post.title}
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                {post.date} by {post.author}
              </p>
              <p className="text-text-secondary mb-6">{post.excerpt}</p>
              <button
                className={`font-semibold transition-colors duration-300 ${linkColor} ${hoverLinkColor}`}
              >
                Read More <ArrowRight className="inline-block ml-1" size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

interface Testimonial {
  quote: string;
  author: string;
  featured: boolean;
  role?: string;
  company?: string;
}

const TestimonialSlider = () => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const handleDragEnd = (e: any, info: { offset: { x: number } }) => {
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
  };

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
        type: 'spring',
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
    <section className="py-20 relative overflow-hidden">
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          theme === "dark"
            ? "bg-gradient-to-br from-purple-900/20 to-cyan-900/20"
            : "bg-gradient-to-br from-purple-200/20 to-cyan-200/20"
        }`}
      ></div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-4xl font-bold text-text-primary mb-4">
          What Our Clients Say
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Hear from the industry leaders who trust KIC113 to power their
          success.
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
              left: -((testimonials.length - 1) * (sliderRef.current?.offsetWidth || 0)),
              right: 0,
            }}
            onDragEnd={handleDragEnd}
          >
            {testimonials.map((testimonial: Testimonial, index) => (
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
                    currentIndex === testimonials.length - 1
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
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
                      <span className="block text-sm text-gray-400">{testimonial.role}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <HeroSection />
      <FeaturedServices />
      <LatestInsights onBlogClick={(id) => navigate(`/blog/${id}`)} />
      <TestimonialSlider />
    </>
  );
};

export default HomePage;
