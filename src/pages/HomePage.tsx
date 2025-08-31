import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroSection from '../components/sections/HeroSection';
import FeaturedServices from '../components/sections/FeaturedServices';
import BlogSection from '../components/sections/BlogSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="pt-24">
      <HeroSection />
      <FeaturedServices />
      <BlogSection />
      <TestimonialsSection />
      
      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-10 -skew-y-2"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Transform Your Food Business with AI?
            </h2>
            <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
              Join leading food brands that trust KIC113 for cutting-edge AI solutions in food safety and consumer engagement.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-white text-cyan-700 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/services')}
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
