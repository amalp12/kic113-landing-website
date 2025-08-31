import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import ContactForm from "../components/ContactForm";

const ContactPage: React.FC = () => {
  const { theme } = useTheme();
  const [formStatus, setFormStatus] = useState<{
    status: "idle" | "success" | "error";
    message: string;
  }>({ status: "idle", message: "" });

  const handleFormSubmit = async (formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    try {
      // In a real app, you would send this data to your backend
      console.log("Form submitted:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setFormStatus({
        status: "success",
        message:
          "Your message has been sent successfully! We'll get back to you soon.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus({
        status: "error",
        message:
          "Something went wrong. Please try again later or contact us via email.",
      });
    }
  };

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
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-xl max-w-3xl mx-auto ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Have questions or want to learn more about our AI solutions? We'd
            love to hear from you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h2
                className={`text-2xl font-bold mb-6 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Contact Information
              </h2>
              <p
                className={theme === "dark" ? "text-gray-300" : "text-gray-600"}
              >
                Fill out the form or reach out to us through any of these
                channels.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div
                  className={`p-3 rounded-full mr-4 ${
                    theme === "dark" ? "bg-cyan-500/20" : "bg-cyan-100"
                  }`}
                >
                  <Mail
                    className={`w-6 h-6 ${
                      theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                    }`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-semibold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Email Us
                  </h3>
                  <a
                    href="mailto:info@kic113.com"
                    className={`hover:text-cyan-500 transition-colors ${
                      theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                    }`}
                  >
                    info@kic113.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div
                  className={`p-3 rounded-full mr-4 ${
                    theme === "dark" ? "bg-cyan-500/20" : "bg-cyan-100"
                  }`}
                >
                  <Phone
                    className={`w-6 h-6 ${
                      theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                    }`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-semibold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Call Us
                  </h3>
                  <a
                    href="tel:+1234567890"
                    className={`hover:text-cyan-500 transition-colors ${
                      theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                    }`}
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div
                  className={`p-3 rounded-full mr-4 ${
                    theme === "dark" ? "bg-cyan-500/20" : "bg-cyan-100"
                  }`}
                >
                  <MapPin
                    className={`w-6 h-6 ${
                      theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                    }`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-semibold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Visit Us
                  </h3>
                  <p
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }
                  >
                    1234 Innovation Drive
                    <br />
                    San Francisco, CA 94107
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h3
                className={`text-lg font-semibold mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Business Hours
              </h3>
              <div className="space-y-2">
                {[
                  "Monday - Friday: 9:00 AM - 6:00 PM",
                  "Saturday: 10:00 AM - 4:00 PM",
                  "Sunday: Closed",
                ].map((time, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700"
                  >
                    <span
                      className={
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }
                    >
                      {time.split(":")[0]}:
                    </span>
                    <span
                      className={
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }
                    >
                      {time.split(":").slice(1).join(":").trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`p-8 rounded-2xl ${
              theme === "dark" ? "bg-gray-800/50" : "bg-white shadow-lg"
            }`}
          >
            <h2
              className={`text-2xl font-bold mb-6 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Send Us a Message
            </h2>

            {formStatus.status === "success" ||
            formStatus.status === "error" ? (
              <div
                className={`p-4 rounded-lg mb-6 flex items-start ${
                  formStatus.status === "success"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {formStatus.status === "success" ? (
                  <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium">
                    {formStatus.status === "success"
                      ? "Message Sent!"
                      : "Error"}
                  </p>
                  <p className="text-sm mt-1">{formStatus.message}</p>
                  {formStatus.status === "success" && (
                    <button
                      onClick={() =>
                        setFormStatus({ status: "idle", message: "" })
                      }
                      className="mt-3 text-sm font-medium text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                    >
                      Send another message
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <ContactForm onSubmit={handleFormSubmit} />
            )}
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="aspect-w-16 aspect-h-9 w-full h-96 bg-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.146170659405!2d-122.3928479242505!3d37.79003847195044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858062a2caf249%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2suk!4v1620000000000!5m2!1sen!2suk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Our Location"
              className="w-full h-full"
            ></iframe>
          </div>
        </motion.div>

        {/* CTA Section */}
        <div
          className={`mt-20 p-12 rounded-3xl text-center ${
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
            Ready to Transform Your Business?
          </h2>
          <p
            className={`text-xl mb-8 max-w-2xl mx-auto ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Schedule a free consultation with our AI experts to discuss how we
            can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className={`px-8 py-3 rounded-lg font-semibold text-lg flex items-center justify-center mx-auto ${
                theme === "dark"
                  ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                  : "bg-cyan-600 hover:bg-cyan-700 text-white"
              } transition-colors`}
            >
              <Send className="w-5 h-5 mr-2" />
              Book a Free Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
