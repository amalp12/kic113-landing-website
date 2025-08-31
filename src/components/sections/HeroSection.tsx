import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const tagline = "AI for Food Brands: Revolutionizing Food Safety & Consumer Engagement";

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-4xl md:text-6xl font-bold leading-tight mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Transforming Food Safety with
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              {' '}
              AI Innovation
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {tagline}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button
              onClick={() => navigate('/services')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Explore Our Solutions
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/contact')}
              className={`px-8 py-4 rounded-lg font-semibold text-lg border-2 ${
                theme === 'dark'
                  ? 'border-cyan-500 text-cyan-400 hover:bg-cyan-500/10'
                  : 'border-cyan-600 text-cyan-600 hover:bg-cyan-50'
              } transition-colors`}
            >
              Contact Us
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 relative"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
              <div className="text-center p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Experience the Future of Food Safety
                </h3>
                <p className="text-gray-300 mb-6">
                  See how our AI solutions are transforming the food industry
                </p>
                <button className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/20 rounded-full filter blur-3xl -z-10"></div>
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-blue-500/20 rounded-full filter blur-3xl -z-10"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
