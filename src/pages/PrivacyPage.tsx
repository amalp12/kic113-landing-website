import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, EyeOff, Mail, Server, Key } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const PrivacyPage: React.FC = () => {
  const { theme } = useTheme();

  const privacyFeatures = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Data Encryption",
      description:
        "All your data is encrypted both in transit and at rest using industry-standard encryption protocols.",
    },
    {
      icon: <EyeOff className="w-6 h-6" />,
      title: "No Data Selling",
      description:
        "We never sell, rent, or trade your personal information to third parties.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "GDPR & CCPA Compliant",
      description:
        "We comply with global data protection regulations including GDPR and CCPA.",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Transparent Communication",
      description:
        "We clearly communicate how we use your data and obtain your consent when required.",
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Secure Infrastructure",
      description:
        "Our systems are hosted on secure, SOC 2 compliant cloud infrastructure.",
    },
    {
      icon: <Key className="w-6 h-6" />,
      title: "Access Control",
      description:
        "Strict access controls and authentication mechanisms protect your data.",
    },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
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
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-xl ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Last updated: June 10, 2024
          </motion.p>
        </div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p
            className={`mb-6 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            At KIC113, we are committed to protecting your privacy and ensuring
            the security of your personal information. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you use our services, visit our website, or
            interact with us.
          </p>
          <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
            Please read this Privacy Policy carefully. By accessing or using our
            services, you agree to the collection and use of information in
            accordance with this policy. If you do not agree with our policies
            and practices, please do not use our services.
          </p>
        </motion.div>

        {/* Privacy Features */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2
            className={`text-2xl font-bold mb-8 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Our Commitment to Your Privacy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {privacyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 rounded-xl ${
                  theme === "dark" ? "bg-gray-800/50" : "bg-white shadow-md"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    theme === "dark" ? "bg-cyan-500/20" : "bg-cyan-100"
                  }`}
                >
                  {React.cloneElement(feature.icon, {
                    className: `w-6 h-6 ${
                      theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                    }`,
                  })}
                </div>
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Policy Sections */}
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            {
              title: "1. Information We Collect",
              content: (
                <div className="space-y-4">
                  <p>
                    We collect several types of information from and about users
                    of our services, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Personal Information:</strong> Such as name, email
                      address, phone number, and company details that you
                      provide when registering or contacting us.
                    </li>
                    <li>
                      <strong>Usage Data:</strong> Information about how you
                      interact with our website and services, including IP
                      address, browser type, and pages visited.
                    </li>
                    <li>
                      <strong>Cookies and Tracking Technologies:</strong> We use
                      cookies and similar tracking technologies to track
                      activity on our service.
                    </li>
                  </ul>
                </div>
              ),
            },
            {
              title: "2. How We Use Your Information",
              content: (
                <div className="space-y-4">
                  <p>
                    We may use the information we collect for various purposes,
                    including to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Respond to your comments, questions, and requests</li>
                    <li>
                      Send you technical notices, updates, and support messages
                    </li>
                    <li>Monitor and analyze trends, usage, and activities</li>
                    <li>Detect, investigate, and prevent security incidents</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "3. Data Sharing and Disclosure",
              content: (
                <div className="space-y-4">
                  <p>
                    We may share your information in the following situations:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Service Providers:</strong> We may employ
                      third-party companies to facilitate our services, provide
                      services on our behalf, or assist us in analyzing how our
                      services are used.
                    </li>
                    <li>
                      <strong>Business Transfers:</strong> In connection with,
                      or during negotiations of, any merger, sale of company
                      assets, financing, or acquisition of all or a portion of
                      our business by another company.
                    </li>
                    <li>
                      <strong>Legal Requirements:</strong> If required to do so
                      by law or in response to valid requests by public
                      authorities.
                    </li>
                  </ul>
                </div>
              ),
            },
            {
              title: "4. Data Security",
              content: (
                <div className="space-y-4">
                  <p>
                    We implement appropriate technical and organizational
                    measures to protect the security of your personal
                    information. However, please be aware that no security
                    measures are perfect or impenetrable, and we cannot
                    guarantee the security of your information.
                  </p>
                </div>
              ),
            },
            {
              title: "5. Your Data Protection Rights",
              content: (
                <div className="space-y-4">
                  <p>
                    Depending on your location, you may have certain rights
                    regarding your personal information, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      The right to access, update, or delete your information
                    </li>
                    <li>
                      The right to rectification if your information is
                      inaccurate or incomplete
                    </li>
                    <li>
                      The right to object to our processing of your personal
                      data
                    </li>
                    <li>
                      The right to request restriction of processing your
                      personal information
                    </li>
                    <li>The right to data portability</li>
                    <li>The right to withdraw consent</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "6. Changes to This Privacy Policy",
              content: (
                <div className="space-y-4">
                  <p>
                    We may update our Privacy Policy from time to time. We will
                    notify you of any changes by posting the new Privacy Policy
                    on this page and updating the "Last updated" date at the top
                    of this policy.
                  </p>
                  <p>
                    You are advised to review this Privacy Policy periodically
                    for any changes. Changes to this Privacy Policy are
                    effective when they are posted on this page.
                  </p>
                </div>
              ),
            },
            {
              title: "7. Contact Us",
              content: (
                <div className="space-y-4">
                  <p>
                    If you have any questions about this Privacy Policy, please
                    contact us:
                  </p>
                  <ul className="space-y-2">
                    <li>By email: privacy@kic113.com</li>
                    <li>By visiting our contact page</li>
                    <li>
                      By mail: 1234 Innovation Drive, San Francisco, CA 94107,
                      USA
                    </li>
                  </ul>
                </div>
              ),
            },
          ].map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className={`p-6 rounded-xl ${
                theme === "dark" ? "bg-gray-800/30" : "bg-gray-50"
              }`}
            >
              <h2
                className={`text-xl font-bold mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {section.title}
              </h2>
              <div
                className={theme === "dark" ? "text-gray-300" : "text-gray-700"}
              >
                {section.content}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPage;
