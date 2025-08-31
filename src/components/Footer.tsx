import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { links } from '../constants/links';

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={`py-12 mt-12 transition-colors duration-500 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">KIC113</h3>
            <p className="mb-4">
              AI-powered solutions for food safety, compliance, and brand
              engagement.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className={`p-2 rounded-full ${
                  theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
                }`}
              >
                <Facebook />
              </a>
              <a
                href="#"
                className={`p-2 rounded-full ${
                  theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
                }`}
              >
                <Twitter />
              </a>
              <a
                href="#"
                className={`p-2 rounded-full ${
                  theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
                }`}
              >
                <Linkedin />
              </a>
              <a
                href="#"
                className={`p-2 rounded-full ${
                  theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
                }`}
              >
                <Mail />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`hover:underline ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#services"
                  className={`hover:underline ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  KIC113 Regulatory
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className={`hover:underline ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  KIC113 BEE
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className={`hover:underline ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  AI Innovation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <address className="not-italic">
              <p className="mb-2">123 AI Street</p>
              <p className="mb-2">Tech City, TC 10001</p>
              <p className="mb-2">Email: info@kic113.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>

        <div
          className={`border-t mt-12 pt-6 text-center ${
            theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
          }`}
        >
          <p>
            &copy; {new Date().getFullYear()} KIC113. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
