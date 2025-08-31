import { motion } from "framer-motion";
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real app, you would send the form data to your backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      // if (!response.ok) throw new Error('Failed to send message');

      setSubmitStatus({
        success: true,
        message:
          "Your message has been sent successfully! We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        success: false,
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = `w-full px-4 py-3 rounded-lg border ${
    theme === "dark"
      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
  } transition-colors`;

  const labelClasses = `block text-sm font-medium mb-1 ${
    theme === "dark" ? "text-gray-300" : "text-gray-700"
  }`;

  const errorClasses = "mt-1 text-sm text-red-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-2xl ${
        theme === "dark" ? "bg-gray-800/50" : "bg-white shadow-lg"
      }`}
    >
      <h2
        className={`text-2xl font-bold mb-6 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Send us a Message
      </h2>

      {submitStatus && (
        <div
          className={`p-4 mb-6 rounded-lg ${
            submitStatus.success
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className={labelClasses}>
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`${inputClasses} ${
                errors.name
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : ""
              }`}
              placeholder="John Doe"
            />
            {errors.name && <p className={errorClasses}>{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className={labelClasses}>
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${inputClasses} ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : ""
              }`}
              placeholder="you@example.com"
            />
            {errors.email && <p className={errorClasses}>{errors.email}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="subject" className={labelClasses}>
            Subject *
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`${inputClasses} ${
              errors.subject
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : ""
            }`}
          >
            <option value="">Select a subject</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Sales">Sales</option>
            <option value="Support">Support</option>
            <option value="Partnership">Partnership</option>
            <option value="Other">Other</option>
          </select>
          {errors.subject && <p className={errorClasses}>{errors.subject}</p>}
        </div>

        <div>
          <label htmlFor="message" className={labelClasses}>
            Your Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className={`${inputClasses} ${
              errors.message
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : ""
            }`}
            placeholder="How can we help you?"
          ></textarea>
          {errors.message && <p className={errorClasses}>{errors.message}</p>}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3
          className={`text-lg font-semibold mb-4 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Contact Information
        </h3>
        <div className="space-y-3">
          <p
            className={`flex items-center ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <svg
              className="w-5 h-5 mr-3 text-cyan-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            123 AI Street, Tech City, TC 10001
          </p>
          <p
            className={`flex items-center ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <svg
              className="w-5 h-5 mr-3 text-cyan-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            info@kic113.com
          </p>
          <p
            className={`flex items-center ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <svg
              className="w-5 h-5 mr-3 text-cyan-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            (123) 456-7890
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactForm;
