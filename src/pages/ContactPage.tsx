import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import { useTheme } from "@/context/ThemeContext";

const ContactPage = () => {
  const { theme } = useTheme();

  return (
    <div className="py-20 mt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-text-primary mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Ready to revolutionize your brand? Get in touch with our team today.
        </p>
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactPage;
