import { motion } from "framer-motion";

const PrivacyPolicyPage = () => {
  const sectionVariants = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
  };

  const sections = [
    {
      title: "1. Introduction",
      content:
        "This Privacy Policy outlines how KIC113 collects, uses, and protects your personal information.",
    },
    {
      title: "2. Information We Collect",
      content:
        "We may collect personal information such as name, email address, and company details when you use our contact form or services.",
    },
    {
      title: "3. How We Use Your Information",
      content:
        "The information collected is used to provide and improve our services, respond to inquiries, and communicate with you about our offerings.",
    },
    {
      title: "4. Data Security",
      content:
        "We implement industry-standard security measures to protect your data from unauthorized access, alteration, or destruction. We use encryption and other technologies to ensure your data is secure.",
    },
    {
      title: "5. Your Rights",
      content:
        "You have the right to access, update, or delete your personal information. Please contact us to exercise these rights.",
    },
  ];

  const theme = document.documentElement.className;
  const sectionBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const sectionBorder =
    theme === "dark" ? "border-gray-700" : "border-gray-300";
  const sectionTitleColor =
    theme === "dark" ? "text-cyan-400" : "text-cyan-600";

  return (
    <div className="py-20 mt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-text-primary mb-4">
          Privacy Policy
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Your privacy is important to us. Read our policy to understand how we
          handle your data.
        </p>
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 max-w-3xl space-y-8">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`p-6 rounded-xl border transition-colors duration-300 ${sectionBg} ${sectionBorder}`}
          >
            <h2 className={`text-2xl font-semibold mb-2 ${sectionTitleColor}`}>
              {section.title}
            </h2>
            <p className="text-text-secondary">{section.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
