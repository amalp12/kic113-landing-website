import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "react-toast";
import { useTheme } from "../context/ThemeContext";

// Simple toast wrapper for consistent styling
const showToast = (
  message: string,
  type: "success" | "error" | "warning" | "info" = "info"
) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.warn(message);
      break;
    default:
      toast(message);
  }
};

// Extend the ImportMeta interface to include Vite's env variables
declare global {
  interface ImportMeta {
    env: {
      VITE_EMAILJS_SERVICE_ID?: string;
      VITE_EMAILJS_TEMPLATE_ID?: string;
      VITE_EMAILJS_PUBLIC_KEY?: string;
    };
  }
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phoneNumber?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  phoneNumber?: string;
}

const ContactForm: React.FC = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    phoneNumber: "",
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
      showToast("Please fill in all required fields correctly.", "warning");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Show loading state
    showToast("Sending your message...", "info");

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_name: "Admin",
        subject: formData.subject,
        message: formData.message,
        phone: formData.phoneNumber || "Not provided",
        time: new Date().toISOString(),
      };

      const data = {
        service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
        template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
        user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "",
        template_params: templateParams,
      };

      await axios.post("https://api.emailjs.com/api/v1.0/email/send", data, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 seconds timeout
      });

      // Show success message
      showToast(
        "Message sent successfully! We'll get back to you soon.",
        "success"
      );

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
        phoneNumber: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);

      let errorMessage = "Failed to send message. Please try again later.";

      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          errorMessage =
            "Request timed out. Please check your connection and try again.";
        } else if (error.response) {
          // Handle specific error status codes from EmailJS
          switch (error.response.status) {
            case 400:
              errorMessage =
                "Invalid request. Please check your form data and try again.";
              break;
            case 401:
              errorMessage = "Authentication failed. Please contact support.";
              break;
            case 429:
              errorMessage = "Too many requests. Please try again later.";
              break;
            case 500:
              errorMessage = "Server error. Please try again later.";
              break;
          }
        }
      }

      // Show error message
      showToast(errorMessage, "error");

      setSubmitStatus({
        success: false,
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = `w-full px-4 py-3 rounded-lg border ${
    theme === "dark"
      ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30"
      : "bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30"
  } transition-all duration-200 ease-out`;

  const labelClasses = `block text-sm font-medium mb-2 ${
    theme === "dark" ? "text-gray-300" : "text-gray-700"
  }`;

  const errorClasses = "mt-1.5 text-sm text-red-500";

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
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className={labelClasses}>
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`${inputClasses} ${
                  errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                    : ""
                }`}
                placeholder="John Doe"
              />
              {errors.name && <p className={errorClasses}>{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className={labelClasses}>
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${inputClasses} ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                    : ""
                }`}
                placeholder="you@example.com"
              />
              {errors.email && <p className={errorClasses}>{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={labelClasses}>Phone Number (Optional)</label>
              <div className={`relative ${inputClasses} p-0 ${
                errors.phoneNumber 
                  ? "border-red-500 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500/30" 
                  : ""
              }`}>
                <PhoneInput
                  international
                  defaultCountry="US"
                  value={formData.phoneNumber}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, phoneNumber: value || "" }))
                  }
                  className="w-full"
                  style={{
                    '--PhoneInputCountrySelectArrow-color': theme === 'dark' ? '#9CA3AF' : '#6B7280',
                    '--PhoneInput-color': theme === 'dark' ? '#E5E7EB' : '#111827',
                    '--PhoneInputCountryFlag-borderColor': theme === 'dark' ? '#4B5563' : '#D1D5DB',
                  }}
                  numberInputProps={{
                    className: `w-full bg-transparent border-0 focus:ring-0 py-3 px-4 ${theme === 'dark' ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`
                  }}
                />
              </div>
              {errors.phoneNumber && (
                <p className={errorClasses}>{errors.phoneNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className={labelClasses}>
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`${inputClasses} ${
                  errors.subject
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                    : ""
                }`}
                placeholder="How can we help?"
              />
              {errors.subject && (
                <p className={errorClasses}>{errors.subject}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className={labelClasses}>
              Your Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className={`${inputClasses} min-h-[120px] resize-y ${
                errors.message
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                  : ""
              }`}
              placeholder="Tell us more about your project or inquiry..."
            ></textarea>
            {errors.message && <p className={errorClasses}>{errors.message}</p>}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 px-6 rounded-lg font-semibold text-base transition-all duration-200 ease-out ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-md hover:shadow-cyan-500/20 hover:-translate-y-0.5 active:translate-y-0"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
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
