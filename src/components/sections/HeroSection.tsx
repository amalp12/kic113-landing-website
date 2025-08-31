import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AnimatedBackground from "../AnimatedBackground";

import { Variants } from "framer-motion";

interface HeroSectionProps {
  navigate: (path: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ navigate }) => {
  const tagline =
    "AI for Food Brands: Revolutionizing Food Safety & Consumer Engagement";
  const introText =
    "Leeverage cutting-edge AI to automate compliance, enhance transparency, and build lasting consumer trust. Our innovative solutions protect your brand and empower your business in a data-driven world.";
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < introText.length) {
        setTypedText((prev) => prev + introText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 20);
    return () => clearInterval(typingInterval);
  }, []);

  const buttonVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        delay: 2,
      },
    },
    pulse: {
      scale: [1, 1.05, 1],
      boxShadow: [
        "0 0 0px rgba(0,0,0,0)",
        "0 0 20px rgba(0, 255, 255, 0.5)",
        "0 0 0px rgba(0,0,0,0)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-transparent to-gray-950/50 dark:from-gray-900/90 dark:via-gray-900/20 dark:to-gray-900/40" />
      </div>

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center max-w-4xl px-4 mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white dark:text-gray-100 mb-6 leading-tight tracking-tight"
          >
            {tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-lg sm:text-xl text-gray-200 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            {typedText}
          </motion.p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.button
              variants={buttonVariants}
              initial="initial"
              animate={["animate", "pulse"]}
              onClick={() => navigate("services")}
              className="group px-8 py-3 rounded-full text-lg font-semibold bg-cyan-600 text-white relative overflow-hidden transition-all duration-500"
            >
              Explore Services
            </motion.button>
            <motion.button
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              onClick={() => navigate("contact")}
              className="group px-8 py-3 rounded-full text-lg font-semibold border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white transition-colors duration-300"
            >
              Get in Touch
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
