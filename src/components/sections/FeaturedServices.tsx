import React from 'react';
import { motion } from 'framer-motion';
import { services } from '../../constants/services';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const FeaturedServices: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Our AI-Powered Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-xl max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Transforming the food industry with cutting-edge AI technology
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate('/services')}
            className={`px-8 py-3 rounded-lg font-semibold text-lg ${
              theme === 'dark'
                ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                : 'bg-cyan-100 hover:bg-cyan-200 text-cyan-800'
            } transition-colors`}
          >
            View All Services
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard: React.FC<{ service: any; index: number }> = ({
  service,
  index,
}) => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className={`p-6 rounded-xl transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gray-800/50 hover:bg-gray-800/80 backdrop-blur-sm'
          : 'bg-white hover:shadow-lg border border-gray-100'
      }`}
    >
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
          theme === 'dark' ? 'bg-cyan-500/20' : 'bg-cyan-100'
        }`}
      >
        {React.cloneElement(service.icon, {
          className: `w-7 h-7 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`,
        })}
      </div>
      <h3
        className={`text-xl font-bold mb-3 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}
      >
        {service.title}
      </h3>
      <p
        className={`mb-4 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}
      >
        {service.description}
      </p>
      <ul className="space-y-2 mb-6">
        {service.features.map((feature: string, i: number) => (
          <li key={i} className="flex items-start">
            <span
              className={`mr-2 mt-1 ${
                theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
              }`}
            >
              ✓
            </span>
            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <button
        className={`flex items-center text-sm font-medium ${
          theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
        } hover:opacity-80 transition-opacity`}
      >
        Learn more
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </motion.div>
  );
};

export default FeaturedServices;
