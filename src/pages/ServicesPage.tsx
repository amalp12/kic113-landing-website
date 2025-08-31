import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Star, Sparkles, Zap } from 'lucide-react';
import { services } from '../constants/services';
import { useTheme } from '../context/ThemeContext';

const ServicesPage: React.FC = () => {
  const { theme } = useTheme();

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
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Our AI-Powered Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-xl max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Harness the power of artificial intelligence to transform your food safety and brand engagement strategies.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 rounded-2xl transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-800/50 hover:bg-gray-800/80 backdrop-blur-sm'
                  : 'bg-white hover:shadow-lg border border-gray-100'
              }`}
            >
              <div
                className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${
                  theme === 'dark' ? 'bg-cyan-500/20' : 'bg-cyan-100'
                }`}
              >
                {React.cloneElement(service.icon, {
                  className: `w-8 h-8 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`,
                })}
              </div>
              <h3
                className={`text-2xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {service.title}
              </h3>
              <p
                className={`mb-6 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {service.description}
              </p>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span
                      className={`mr-3 mt-1 ${
                        theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
                      }`}
                    >
                      <Zap className="w-4 h-4" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className={`px-6 py-2 rounded-lg font-medium ${
                  theme === 'dark'
                    ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                    : 'bg-cyan-100 hover:bg-cyan-200 text-cyan-800'
                } transition-colors`}
              >
                Learn More
              </button>
            </motion.div>
          ))}
        </div>

        {/* How It Works */}
        <div className="max-w-5xl mx-auto">
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
              How It Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`text-xl max-w-3xl mx-auto ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Our AI solutions are designed to integrate seamlessly into your existing workflows.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Data Integration',
                description: 'Connect your existing systems and data sources to our AI platform.',
                icon: '🔌',
              },
              {
                title: 'AI Analysis',
                description: 'Our algorithms process and analyze your data in real-time.',
                icon: '🤖',
              },
              {
                title: 'Actionable Insights',
                description: 'Get clear, actionable recommendations to improve your operations.',
                icon: '📊',
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto ${
                    theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'
                  }`}
                >
                  {step.icon}
                </div>
                <h3
                  className={`text-xl font-bold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div
          className={`mt-24 p-8 md:p-12 rounded-3xl ${
            theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
          }`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              Ready to get started?
            </h2>
            <p
              className={`text-xl mb-8 max-w-2xl mx-auto ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Schedule a demo to see how our AI solutions can transform your food business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                className={`px-8 py-3 rounded-lg font-semibold text-lg ${
                  theme === 'dark'
                    ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                    : 'bg-cyan-600 hover:bg-cyan-700 text-white'
                } transition-colors`}
              >
                Request Demo
              </button>
              <button
                className={`px-8 py-3 rounded-lg font-semibold text-lg ${
                  theme === 'dark'
                    ? 'bg-transparent border border-gray-600 hover:bg-gray-700/50 text-white'
                    : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-800'
                } transition-colors`}
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
