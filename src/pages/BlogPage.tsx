import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, Tag, ArrowRight } from 'lucide-react';
import { blogPosts } from '../constants/blog';
import { useTheme } from '../context/ThemeContext';

const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // In a real app, you would fetch categories from an API
  const categories = [
    'AI & Machine Learning',
    'Food Safety',
    'Regulatory Compliance',
    'Industry Trends',
    'Case Studies'
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    // In a real app, you would filter by category when categories are implemented
    const matchesCategory = selectedCategory ? true : true;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Insights & Updates
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-xl max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Stay informed with the latest trends, news, and insights in food safety and AI technology.
          </motion.p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`block w-full pl-10 pr-3 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500'
              } focus:outline-none focus:ring-1`}
            />
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? theme === 'dark'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-cyan-100 text-cyan-800'
                  : theme === 'dark'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Articles
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? theme === 'dark'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-cyan-100 text-cyan-800'
                    : theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Featured Article
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`rounded-2xl overflow-hidden ${
                theme === 'dark' ? 'bg-gray-800/50' : 'bg-white shadow-md'
              }`}
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-1/3 bg-gray-200 h-64 md:h-auto">
                  {/* Placeholder for featured image */}
                  <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20"></div>
                </div>
                <div className="p-8 md:w-2/3">
                  <div className="flex items-center text-sm mb-4">
                    <span className={`${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'} font-medium`}>
                      {filteredPosts[0].date}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      {filteredPosts[0].author}
                    </span>
                  </div>
                  <h3
                    className={`text-2xl font-bold mb-3 cursor-pointer hover:text-cyan-500 transition-colors ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                    onClick={() => navigate(`/blog/${filteredPosts[0].id}`)}
                  >
                    {filteredPosts[0].title}
                  </h3>
                  <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {filteredPosts[0].excerpt}
                  </p>
                  <button
                    onClick={() => navigate(`/blog/${filteredPosts[0].id}`)}
                    className="inline-flex items-center text-cyan-500 hover:text-cyan-600 font-medium group"
                  >
                    Read full article
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Latest Articles
          </h2>
          
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`rounded-xl overflow-hidden transition-all duration-300 ${
                    theme === 'dark' ? 'bg-gray-800/50 hover:bg-gray-800/80' : 'bg-white hover:shadow-lg border border-gray-100'
                  }`}
                >
                  <div className="h-48 bg-gray-200">
                    {/* Placeholder for post image */}
                    <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-xs mb-3">
                      <div className="flex items-center text-cyan-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <span className="mx-2 text-gray-400">•</span>
                      <div className="flex items-center">
                        <Tag className="w-4 h-4 mr-1 text-gray-400" />
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                          {categories[index % categories.length].split(' ')[0]}
                        </span>
                      </div>
                    </div>
                    <h3
                      className={`text-xl font-bold mb-2 cursor-pointer hover:text-cyan-500 transition-colors ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                      onClick={() => navigate(`/blog/${post.id}`)}
                    >
                      {post.title}
                    </h3>
                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {post.excerpt}
                    </p>
                    <button
                      onClick={() => navigate(`/blog/${post.id}`)}
                      className="text-sm font-medium text-cyan-500 hover:text-cyan-600 flex items-center group"
                    >
                      Read more
                      <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className={`text-center py-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <p className="text-lg">No articles found matching your search.</p>
            </div>
          )}
        </div>

        {/* Newsletter Subscription */}
        <div
          className={`p-8 rounded-2xl ${
            theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
          }`}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Stay Updated
            </h2>
            <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Subscribe to our newsletter to receive the latest insights and updates directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500'
                } focus:outline-none focus:ring-1`}
              />
              <button className="px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors">
                Subscribe
              </button>
            </div>
            <p className={`mt-3 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
