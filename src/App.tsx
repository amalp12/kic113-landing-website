import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  Shield,
  Star,
  BookOpen,
  Mail,
  Users,
  Moon,
  Sun,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Lightbulb,
} from "lucide-react";

const links = [
  { name: "Home", path: "home" },
  { name: "Services", path: "services" },
  { name: "Blog", path: "blog" },
  { name: "Testimonials", path: "testimonials" },
  { name: "Contact", path: "contact" },
  { name: "Privacy Policy", path: "privacy" },
];

const services = [
  {
    title: "KIC113 Regulatory",
    icon: <Shield />,
    description:
      "Automate compliance checks and navigate complex food safety regulations with AI precision.",
    features: [
      "Automated Hazard Analysis",
      "Real-time Regulation Monitoring",
      "Compliance Documentation",
      "Supply Chain Traceability",
    ],
  },
  {
    title: "KIC113 BEE",
    icon: <Star />,
    description:
      "Enhance brand transparency and consumer trust with AI-powered brand engagement solutions.",
    features: [
      "Interactive Product Stories",
      "AI-Powered Chatbots",
      "Personalized Recommendations",
      "Consumer Feedback Analysis",
    ],
  },
  {
    title: "AI Innovation",
    icon: <Sparkles />,
    description:
      "Develop custom AI models to solve unique challenges in food production and marketing.",
    features: [
      "Predictive Analytics",
      "Quality Control Automation",
      "Consumer Trend Forecasting",
      "Generative Content Tools",
    ],
  },
];

const testimonials = [
  {
    quote:
      "KIC113 has transformed our compliance process. Their AI tools are a game-changer for food safety.",
    author: "Jane Doe, CEO of FreshFoods Inc.",
    featured: true,
  },
  {
    quote:
      "Our brand engagement has never been better. The BEE platform provides incredible insights and connections.",
    author: "John Smith, CMO at Harvest Co.",
    featured: false,
  },
  {
    quote:
      "The team's expertise and innovative approach helped us solve our biggest supply chain challenges.",
    author: "Sarah Lee, Operations Lead",
    featured: false,
  },
  {
    quote:
      "I was skeptical at first, but KIC113's solutions delivered beyond all expectations.",
    author: "Michael Chen, Founder of AgroTech",
    featured: true,
  },
  {
    quote:
      "The most seamless and user-friendly platform we've ever used for regulatory management.",
    author: "Emily Rodriguez, QA Director",
    featured: false,
  },
];

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Food Safety",
    date: "Oct 26, 2024",
    author: "Alex Rivera",
    excerpt:
      "AI is set to revolutionize how we manage and ensure food safety...",
  },
  {
    id: 2,
    title: "How Blockchain Enhances Food Traceability",
    date: "Oct 19, 2024",
    author: "Jordan K.",
    excerpt:
      "Combining AI with blockchain creates an immutable, transparent ledger...",
  },
  {
    id: 3,
    title: "5 Ways to Improve Consumer Trust with AI",
    date: "Oct 12, 2024",
    author: "Chris Evans",
    excerpt: "Building brand trust is crucial. AI can provide the tools to...",
  },
];

const blogContent = {
  1: {
    title: "The Future of AI in Food Safety",
    date: "Oct 26, 2024",
    author: "Alex Rivera",
    content: `
      <p>The food industry is on the cusp of a major transformation, with artificial intelligence leading the charge. AI-powered systems can now analyze vast datasets from supply chains, manufacturing processes, and consumer feedback to predict and prevent food safety issues before they occur. This proactive approach marks a significant shift from traditional, reactive methods.</p>
      <p>AI's ability to monitor real-time data from sensors and cameras allows for automated quality control, identifying contaminants or inconsistencies with a level of precision that human inspection cannot match. This not only reduces the risk of recalls but also minimizes waste and improves overall efficiency.</p>
      <p>Furthermore, AI models are becoming crucial for regulatory compliance. They can automatically scan and interpret changes in global food safety standards, alerting brands to potential non-compliance issues and generating the necessary documentation. This ensures that food products are safe for consumption and can be distributed without legal or logistical hurdles.</p>
      <p>As AI technology continues to evolve, we can expect to see even more sophisticated applications, from personalized nutrition plans based on genetic data to highly optimized agricultural practices that ensure sustainable and safe food production for a growing global population. The future of food is intelligent, and it's powered by AI.</p>
    `,
  },
  2: {
    title: "How Blockchain Enhances Food Traceability",
    date: "Oct 19, 2024",
    author: "Jordan K.",
    content: `
      <p>Blockchain technology offers an unprecedented level of transparency and security in food supply chains. By creating an immutable, decentralized ledger, every transaction and data point from farm to fork can be recorded and verified. This eliminates the risk of data tampering and provides a single, trustworthy source of truth.</p>
      <p>When combined with AI, blockchain's power is amplified. AI can analyze the data on the blockchain to identify inefficiencies, predict potential contamination sources, and streamline logistics. Consumers can simply scan a QR code to see the entire journey of their food, including its origin, processing history, and safety certifications. This transparency builds immense consumer trust and brand loyalty.</p>
    `,
  },
  3: {
    title: "5 Ways to Improve Consumer Trust with AI",
    date: "Oct 12, 2024",
    author: "Chris Evans",
    content: `
      <p>In today's market, consumer trust is a brand's most valuable asset. AI offers powerful tools to not only maintain but actively build this trust. Here are five ways AI can help:</p>
      <ol class="list-decimal list-inside space-y-2">
        <li><strong>Personalized Communication:</strong> AI-powered chatbots can provide instant, accurate answers to consumer questions, creating a sense of responsiveness and care.</li>
        <li><strong>Interactive Transparency:</strong> AI-driven platforms like our BEE solution can turn supply chain data into engaging stories, showing consumers exactly where their food comes from.</li>
        <li><strong>Predictive Quality Assurance:</strong> By analyzing data from production lines, AI can predict and prevent quality issues, ensuring every product meets the highest standards.</li>
        <li><strong>Ethical Sourcing Verification:</strong> AI models can verify the authenticity of ethical certifications and claims, giving consumers confidence that their choices are making a positive impact.</li>
        <li><strong>Feedback Analysis:</strong> AI can analyze consumer reviews and feedback at scale, allowing brands to quickly identify and respond to concerns, showing they are listening.</li>
      </ol>
      <p>By leveraging these AI-driven strategies, food brands can move beyond simple claims and actively demonstrate their commitment to transparency, quality, and consumer well-being, forging stronger, more lasting relationships.</p>
    `,
  },
};

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [theme, setTheme] = useState("dark");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeBlog, setActiveBlog] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme;
  };

  const navigate = (page, params = {}) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    if (page === "blog-detail" && params.id) {
      handleBlogClick(params.id);
    } else {
      setActiveBlog(null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBlogClick = (postId) => {
    const postData = blogContent[postId];
    if (postData) {
      setActiveBlog(postData);
      setCurrentPage("blog-detail");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      console.error("Blog post not found:", postId);
      alert("Blog post content is missing!");
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage navigate={navigate} />;
      case "services":
        return <ServicesPage />;
      case "blog":
        return <BlogPage navigate={navigate} onBlogClick={handleBlogClick} />;
      case "testimonials":
        return <TestimonialsPage />;
      case "contact":
        return <ContactPage />;
      case "privacy":
        return <PrivacyPolicyPage />;
      case "blog-detail":
        return <BlogDetail post={activeBlog} navigate={navigate} />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div
      className={`font-inter relative min-h-screen transition-colors duration-500
      ${
        theme === "dark"
          ? "bg-gray-950 text-gray-300"
          : "bg-gray-50 text-gray-800"
      }`}
    >
      <Navbar
        currentPage={currentPage}
        navigate={navigate}
        toggleTheme={toggleTheme}
        theme={theme}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

const Navbar = ({
  currentPage,
  navigate,
  toggleTheme,
  theme,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => (
  <motion.header
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ type: "spring", stiffness: 100 }}
    className={`fixed top-0 left-0 right-0 z-50 py-4 backdrop-blur-md transition-colors duration-500
      ${theme === "dark" ? "bg-gray-950/80" : "bg-gray-50/80"} shadow-lg`}
  >
    <nav className="container mx-auto flex items-center justify-between px-4 lg:px-8">
      <div
        className={`text-2xl font-bold tracking-wider cursor-pointer transition-colors duration-300
        ${theme === "dark" ? "text-cyan-500" : "text-cyan-600"}`}
        onClick={() => navigate("home")}
      >
        KIC113
      </div>
      <div className="hidden lg:flex items-center space-x-8">
        {links.map((link) => (
          <motion.div
            key={link.path}
            className="relative"
            whileHover={{ scale: 1.05 }}
          >
            <a
              href="#"
              onClick={() => navigate(link.path)}
              className={`text-lg transition-colors duration-300 relative group
                ${
                  currentPage === link.path
                    ? theme === "dark"
                      ? "text-white"
                      : "text-gray-900"
                    : theme === "dark"
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }
              `}
            >
              {link.name}
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out
                ${theme === "dark" ? "bg-cyan-500" : "bg-cyan-600"}`}
              ></span>
            </a>
          </motion.div>
        ))}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors duration-300
          ${
            theme === "dark"
              ? "text-white hover:bg-gray-800"
              : "text-gray-800 hover:bg-gray-200"
          }`}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
      </div>

      <div className="lg:hidden flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors duration-300
          ${
            theme === "dark"
              ? "text-white hover:bg-gray-800"
              : "text-gray-800 hover:bg-gray-200"
          }`}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`transition-colors duration-300
          ${theme === "dark" ? "text-white" : "text-gray-800"}`}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>

    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`lg:hidden mt-4 mx-4 p-4 rounded-xl transition-colors duration-500
            ${theme === "dark" ? "bg-gray-900/90" : "bg-gray-200/90"}`}
        >
          <ul className="flex flex-col items-center space-y-4">
            {links.map((link) => (
              <li key={link.path}>
                <a
                  href="#"
                  onClick={() => navigate(link.path)}
                  className={`text-lg font-medium transition-colors duration-300
                    ${
                      currentPage === link.path
                        ? theme === "dark"
                          ? "text-white"
                          : "text-gray-900"
                        : theme === "dark"
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.header>
);

const HeroSection = ({ navigate }) => {
  const tagline =
    "AI for Food Brands: Revolutionizing Food Safety & Consumer Engagement";
  const introText =
    "Leverage cutting-edge AI to automate compliance, enhance transparency, and build lasting consumer trust. Our innovative solutions protect your brand and empower your business in a data-driven world.";
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < introText.length) {
        setTypedText((prev) => prev + introText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 20);
    return () => clearInterval(typingInterval);
  }, []);

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 2,
      },
    },
    pulse: {
      scale: [1, 1.05, 1],
      boxShadow: [
        "0 0 0px rgba(0,0,0,0)",
        "0 0 20px rgba(0, 255, 255, 0.5)",
        "0 0 0px rgba(0,0,0,0)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-hero-dark bg-cover bg-fixed"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-gray-950/50"></div>

      <div className="relative z-10 text-center max-w-4xl px-4 mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
        >
          {tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-lg sm:text-xl text-gray-300 mb-8"
        >
          {typedText}
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate={["animate", "pulse"]}
            onClick={() => navigate("services")}
            className="group px-8 py-3 rounded-full text-lg font-semibold bg-cyan-600 text-white
            relative overflow-hidden transition-all duration-500"
          >
            Explore Services
          </motion.button>
          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            onClick={() => navigate("contact")}
            className="group px-8 py-3 rounded-full text-lg font-semibold border-2 border-cyan-500 text-cyan-500
            hover:bg-cyan-500 hover:text-white transition-colors duration-300"
          >
            Get in Touch
          </motion.button>
        </div>
      </div>
    </section>
  );
};

const FeaturedServices = () => {
  const theme = document.documentElement.className;
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-gray-100";

  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-text-primary mb-4">
          Our Core Solutions
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          We empower food brands with two powerful platforms, built on a
          foundation of AI innovation.
        </p>
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index }) => {
  const theme = document.documentElement.className;
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const cardBorder =
    theme === "dark"
      ? "border-2 border-transparent"
      : "border-2 border-transparent";
  const iconColor = theme === "dark" ? "text-cyan-500" : "text-cyan-600";
  const hoverIconColor =
    theme === "dark"
      ? "group-hover:text-purple-500"
      : "group-hover:text-purple-600";
  const glow =
    theme === "dark"
      ? "0 0 20px rgba(0, 255, 255, 0.5)"
      : "0 0 20px rgba(0, 169, 255, 0.3)";

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    hover: {
      scale: 1.05,
      y: -10,
      boxShadow: glow,
      transition: { duration: 0.3 },
    },
  };

  const iconVariants = {
    hover: {
      rotate: [0, 10, -10, 0],
      transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileInView="whileInView"
      initial="initial"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative rounded-xl overflow-hidden cursor-pointer"
    >
      {/* Background glow effect */}
      <div
        className={`absolute inset-0 z-0 rounded-xl transition-all duration-300
        ${
          theme === "dark"
            ? "bg-gradient-to-br from-cyan-500/10 to-purple-500/10"
            : "bg-gradient-to-br from-cyan-600/10 to-purple-600/10"
        }`}
      ></div>

      <div
        className={`relative z-10 w-full h-full rounded-xl p-8 flex flex-col justify-between transition-colors duration-300 ${cardBg} ${cardBorder}`}
      >
        <div>
          <motion.div
            variants={iconVariants}
            className={`w-16 h-16 mx-auto mb-4 transition-colors duration-300 ${iconColor} ${hoverIconColor}`}
          >
            {service.icon}
          </motion.div>
          <h3
            className={`text-3xl font-bold text-text-primary mb-2 text-center transition-colors duration-300 ${
              theme === "dark"
                ? "group-hover:text-cyan-400"
                : "group-hover:text-cyan-600"
            }`}
          >
            {service.title}
          </h3>
          <p className="text-center text-text-secondary">
            {service.description}
          </p>
        </div>

        <ul className="text-left space-y-2 text-text-secondary list-disc list-inside mt-6">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-center space-x-2">
              <span
                className={`flex-shrink-0 ${
                  theme === "dark" ? "text-purple-500" : "text-purple-600"
                }`}
              >
                <ArrowRight size={16} />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const LatestInsights = ({ navigate, onBlogClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const theme = document.documentElement.className;
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const linkColor = theme === "dark" ? "text-cyan-400" : "text-cyan-600";
  const hoverLinkColor =
    theme === "dark"
      ? "group-hover:text-purple-400"
      : "group-hover:text-purple-600";
  const glow =
    theme === "dark"
      ? "0 0 20px rgba(0, 255, 255, 0.5)"
      : "0 0 20px rgba(0, 169, 255, 0.3)";

  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-text-primary mb-4">
          Latest Insights
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Stay ahead of the curve with our latest articles on AI, food safety,
          and innovation.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {blogPosts.map((post) => (
          <motion.div
            key={post.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05, boxShadow: glow }}
            className={`group relative overflow-hidden rounded-xl border-2 border-transparent transition-all duration-300 cursor-pointer`}
            onClick={() => onBlogClick(post.id)}
          >
            <div
              className={`p-6 rounded-xl transition-colors duration-300 ${cardBg}`}
            >
              <h3
                className={`text-2xl font-semibold text-text-primary mb-2 transition-colors duration-300
                ${
                  theme === "dark"
                    ? "group-hover:text-cyan-400"
                    : "group-hover:text-cyan-600"
                }`}
              >
                {post.title}
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                {post.date} by {post.author}
              </p>
              <p className="text-text-secondary mb-6">{post.excerpt}</p>
              <button
                className={`font-semibold transition-colors duration-300 ${linkColor} ${hoverLinkColor}`}
              >
                Read More <ArrowRight className="inline-block ml-1" size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const theme = document.documentElement.className;
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const cardBorder = theme === "dark" ? "border-gray-700" : "border-gray-300";
  const featuredBorder =
    theme === "dark" ? "border-purple-500" : "border-purple-600";
  const featuredBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const authorColor = theme === "dark" ? "text-cyan-400" : "text-cyan-600";
  const neonGlow =
    theme === "dark"
      ? "radial-gradient(circle, rgba(128, 0, 128, 0.4) 0%, rgba(128, 0, 128, 0) 70%)"
      : "radial-gradient(circle, rgba(128, 0, 128, 0.2) 0%, rgba(128, 0, 128, 0) 70%)";

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const containerVariants = {
    initial: { x: 0 },
    animate: {
      x: `-${currentIndex * 100}%`,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
      },
    },
  };

  const testimonialVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
  };

  const navButtonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    hover: { scale: 1.1 },
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          theme === "dark"
            ? "bg-gradient-to-br from-purple-900/20 to-cyan-900/20"
            : "bg-gradient-to-br from-purple-200/20 to-cyan-200/20"
        }`}
      ></div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-4xl font-bold text-text-primary mb-4">
          What Our Clients Say
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Hear from the industry leaders who trust KIC113 to power their
          success.
        </p>
      </motion.div>

      <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl z-10">
        <div className="flex">
          <motion.div
            className="flex w-full"
            ref={sliderRef}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            drag="x"
            dragConstraints={{
              left: -(testimonials.length - 1) * sliderRef.current?.offsetWidth,
              right: 0,
            }}
            onDragEnd={(e, { offset }) => {
              if (Math.abs(offset.x) > 50) {
                if (offset.x < 0) {
                  goToNext();
                } else {
                  goToPrev();
                }
              }
            }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="w-full flex-shrink-0 p-8 relative"
                variants={testimonialVariants}
                initial="initial"
                animate={currentIndex === index ? "animate" : "initial"}
              >
                <div
                  className={`p-8 rounded-xl relative border transition-colors duration-300
                  ${
                    testimonial.featured
                      ? `${featuredBorder} ${featuredBg} shadow-purple-glow`
                      : `${cardBorder} ${cardBg}`
                  }`}
                >
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={testimonial.featured ? { opacity: 1 } : {}}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                    style={{ background: neonGlow }}
                  ></motion.div>
                  <p className="relative z-10 text-xl italic text-text-primary mb-4">
                    "{testimonial.quote}"
                  </p>
                  <p className={`relative z-10 font-semibold ${authorColor}`}>
                    {testimonial.author}
                  </p>
                </div>
                {index === currentIndex && (
                  <>
                    <motion.button
                      onClick={goToPrev}
                      className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full backdrop-blur-sm transition-colors duration-300
                      ${
                        theme === "dark"
                          ? "bg-white/20 text-white hover:bg-white/40"
                          : "bg-gray-800/20 text-white hover:bg-gray-800/40"
                      }`}
                      variants={navButtonVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                    >
                      <ChevronLeft size={24} />
                    </motion.button>
                    <motion.button
                      onClick={goToNext}
                      className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full backdrop-blur-sm transition-colors duration-300
                      ${
                        theme === "dark"
                          ? "bg-white/20 text-white hover:bg-white/40"
                          : "bg-gray-800/20 text-white hover:bg-gray-800/40"
                      }`}
                      variants={navButtonVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                    >
                      <ChevronRight size={24} />
                    </motion.button>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const HomePage = ({ navigate }) => (
  <>
    <HeroSection navigate={navigate} />
    <FeaturedServices />
    <LatestInsights
      navigate={navigate}
      onBlogClick={(id) => navigate("blog-detail", { id })}
    />
    <TestimonialSlider />
  </>
);

const ServicesPage = () => {
  const variants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };

  const featureVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
  };

  const theme = document.documentElement.className;
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const cardBorder =
    theme === "dark" ? "border-cyan-500/30" : "border-cyan-600/30";
  const iconColor = theme === "dark" ? "text-cyan-500" : "text-cyan-600";
  const neonGlow =
    theme === "dark"
      ? "radial-gradient(circle at center, rgba(0, 255, 255, 0.2), transparent 70%)"
      : "radial-gradient(circle at center, rgba(0, 255, 255, 0.1), transparent 70%)";

  return (
    <div className="py-20 mt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-text-primary mb-4">
          Our Services
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          KIC113 offers two powerful, AI-driven platforms designed to meet the
          unique needs of the modern food industry.
        </p>
      </motion.div>

      {services.map((service, index) => (
        <section key={index} className="py-12 border-b border-gray-800">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              variants={variants}
              className={`flex flex-col-reverse lg:flex-row items-center gap-12 ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="lg:w-1/2">
                <h2
                  className={`text-3xl lg:text-4xl font-bold mb-4 ${
                    theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                  }`}
                >
                  {service.title}
                </h2>
                <p className="text-lg text-text-secondary mb-6">
                  {service.description}
                </p>
                <motion.ul
                  className="space-y-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.2 } },
                  }}
                >
                  {service.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      variants={featureVariants}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="flex items-start space-x-3 text-text-primary"
                    >
                      <span
                        className={`flex-shrink-0 mt-1 ${
                          theme === "dark"
                            ? "text-purple-400"
                            : "text-purple-600"
                        }`}
                      >
                        <ArrowRight size={20} />
                      </span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
              <div className="lg:w-1/2 relative">
                <motion.div
                  className={`w-full h-80 rounded-xl flex items-center justify-center text-8xl transition-colors duration-300
                    ${cardBg} ${cardBorder} ${iconColor}`}
                  initial={{ rotateY: 0 }}
                  whileHover={{ rotateY: 10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {service.icon}
                </motion.div>
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{ background: neonGlow }}
                ></div>
              </div>
            </motion.div>
          </div>
        </section>
      ))}
    </div>
  );
};

const BlogPage = ({ navigate, onBlogClick }) => {
  const [activeTab, setActiveTab] = useState("all");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const theme = document.documentElement.className;
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const linkColor = theme === "dark" ? "text-cyan-400" : "text-cyan-600";
  const hoverLinkColor =
    theme === "dark"
      ? "group-hover:text-purple-400"
      : "group-hover:text-purple-600";
  const glow =
    theme === "dark"
      ? "0 0 20px rgba(0, 255, 255, 0.5)"
      : "0 0 20px rgba(0, 169, 255, 0.3)";

  return (
    <div className="py-20 mt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-text-primary mb-4">
          Our Insights
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Explore our latest thoughts on the intersection of AI, food, and
          technology.
        </p>
      </motion.div>

      <motion.div
        className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {blogPosts.map((post) => (
          <motion.div
            key={post.id}
            variants={cardVariants}
            whileHover={{ scale: 1.05, boxShadow: glow }}
            className={`group relative overflow-hidden rounded-xl border-2 border-transparent transition-all duration-300 cursor-pointer`}
            onClick={() => onBlogClick(post.id)}
          >
            <div
              className={`p-6 rounded-xl transition-colors duration-300 ${cardBg}`}
            >
              <h3
                className={`text-2xl font-semibold text-text-primary mb-2 transition-colors duration-300
                ${
                  theme === "dark"
                    ? "group-hover:text-cyan-400"
                    : "group-hover:text-cyan-600"
                }`}
              >
                {post.title}
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                {post.date} by {post.author}
              </p>
              <p className="text-text-secondary mb-4">{post.excerpt}</p>
              <span
                className={`font-semibold transition-colors duration-300 ${linkColor} ${hoverLinkColor}`}
              >
                Read Article{" "}
                <ArrowRight className="inline-block ml-1" size={16} />
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const BlogDetail = ({ post, navigate }) => {
  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl text-text-primary">Blog post not found.</h1>
        <button
          onClick={() => navigate("blog")}
          className={`mt-4 px-4 py-2 rounded-lg transition-colors duration-300
          ${
            document.documentElement.className === "dark"
              ? "bg-cyan-600 text-white"
              : "bg-cyan-600 text-white"
          }`}
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleCopyToClipboard = () => {
    const textToCopy = `${post.title} by ${
      post.author
    }\n\n${post.content.replace(/<[^>]*>/g, "")}`;
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      alert("Content copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
    document.body.removeChild(textarea);
  };

  const theme = document.documentElement.className;
  const backButtonColor = theme === "dark" ? "text-cyan-400" : "text-cyan-600";
  const backButtonHover =
    theme === "dark" ? "hover:text-white" : "hover:text-gray-900";
  const socialIconColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const socialIconHover =
    theme === "dark" ? "hover:text-cyan-400" : "hover:text-cyan-600";
  const shareButtonColor = theme === "dark" ? "text-gray-400" : "text-gray-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-20 mt-20"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <button
          onClick={() => navigate("blog")}
          className={`flex items-center transition-colors duration-300 mb-8
          ${backButtonColor} ${backButtonHover}`}
        >
          <ChevronLeft size={20} className="mr-2" /> Back to Blog
        </button>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl lg:text-5xl font-bold text-text-primary mb-2"
        >
          {post.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg text-text-secondary mb-8"
        >
          {post.date} by {post.author}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className={`prose max-w-none leading-relaxed
            ${theme === "dark" ? "prose-invert" : "prose"}`}
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></motion.div>

        <div className="mt-8 flex items-center space-x-4">
          <span className={shareButtonColor}>Share:</span>
          <motion.a
            href="#"
            whileHover={{ scale: 1.2, y: -2 }}
            className={`${socialIconColor} ${socialIconHover} transition-colors duration-300`}
          >
            <Facebook />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.2, y: -2 }}
            className={`${socialIconColor} ${socialIconHover} transition-colors duration-300`}
          >
            <Twitter />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.2, y: -2 }}
            className={`${socialIconColor} ${socialIconHover} transition-colors duration-300`}
          >
            <Linkedin />
          </motion.a>
          <motion.button
            onClick={handleCopyToClipboard}
            whileHover={{ scale: 1.2, y: -2 }}
            className={`${socialIconColor} ${socialIconHover} transition-colors duration-300`}
          >
            <Clipboard />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const theme = document.documentElement.className;
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const cardBorder = theme === "dark" ? "border-gray-700" : "border-gray-300";
  const featuredBorder =
    theme === "dark" ? "border-purple-500" : "border-purple-600";
  const featuredBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const authorColor = theme === "dark" ? "text-cyan-400" : "text-cyan-600";
  const neonGlow =
    theme === "dark"
      ? "radial-gradient(circle, rgba(128, 0, 128, 0.4) 0%, rgba(128, 0, 128, 0) 70%)"
      : "radial-gradient(circle, rgba(128, 0, 128, 0.2) 0%, rgba(128, 0, 128, 0) 70%)";

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const containerVariants = {
    initial: { x: 0 },
    animate: {
      x: `-${currentIndex * 100}%`,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
      },
    },
  };

  const testimonialVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
  };

  const navButtonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    hover: { scale: 1.1 },
  };

  return (
    <div className="py-20 mt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-text-primary mb-4">
          Client Success Stories
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Our clients' words are a testament to the impact and value we deliver
          every day.
        </p>
      </motion.div>

      <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
        <div className="flex">
          <motion.div
            className="flex w-full"
            ref={sliderRef}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            drag="x"
            dragConstraints={{
              left: -(testimonials.length - 1) * sliderRef.current?.offsetWidth,
              right: 0,
            }}
            onDragEnd={(e, { offset }) => {
              if (Math.abs(offset.x) > 50) {
                if (offset.x < 0) {
                  goToNext();
                } else {
                  goToPrev();
                }
              }
            }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="w-full flex-shrink-0 p-8 relative"
                variants={testimonialVariants}
                initial="initial"
                animate={currentIndex === index ? "animate" : "initial"}
              >
                <div
                  className={`p-10 rounded-xl relative border transition-colors duration-300
                  ${
                    testimonial.featured
                      ? `${featuredBorder} ${featuredBg} shadow-purple-glow`
                      : `${cardBorder} ${cardBg}`
                  }`}
                >
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={testimonial.featured ? { opacity: 1 } : {}}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                    style={{ background: neonGlow }}
                  ></motion.div>
                  <p className="relative z-10 text-xl italic text-text-primary mb-4">
                    "{testimonial.quote}"
                  </p>
                  <p className={`relative z-10 font-semibold ${authorColor}`}>
                    {testimonial.author}
                  </p>
                </div>
                {index === currentIndex && (
                  <>
                    <motion.button
                      onClick={goToPrev}
                      className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full backdrop-blur-sm transition-colors duration-300
                      ${
                        theme === "dark"
                          ? "bg-white/20 text-white hover:bg-white/40"
                          : "bg-gray-800/20 text-white hover:bg-gray-800/40"
                      }`}
                      variants={navButtonVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                    >
                      <ChevronLeft size={24} />
                    </motion.button>
                    <motion.button
                      onClick={goToNext}
                      className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full backdrop-blur-sm transition-colors duration-300
                      ${
                        theme === "dark"
                          ? "bg-white/20 text-white hover:bg-white/40"
                          : "bg-gray-800/20 text-white hover:bg-gray-800/40"
                      }`}
                      variants={navButtonVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                    >
                      <ChevronRight size={24} />
                    </motion.button>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this data to a server
    console.log("Form Submitted:", formData);
    setIsSubmitted(true);
  };

  const theme = document.documentElement.className;
  const formBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const formBorder =
    theme === "dark" ? "border-cyan-500/20" : "border-cyan-600/20";
  const inputBorder = theme === "dark" ? "border-gray-600" : "border-gray-400";
  const inputFocusBorder =
    theme === "dark" ? "focus:border-cyan-500" : "focus:border-cyan-600";
  const labelColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const labelFocusColor =
    theme === "dark"
      ? "group-focus-within:text-cyan-400"
      : "group-focus-within:text-cyan-600";
  const submitButtonBg = theme === "dark" ? "bg-cyan-600" : "bg-cyan-600";
  const submitButtonText = theme === "dark" ? "text-white" : "text-white";
  const shadowGlow =
    theme === "dark"
      ? "0 0 15px rgba(0, 255, 255, 0.6)"
      : "0 0 15px rgba(0, 169, 255, 0.4)";

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
        <form
          onSubmit={handleSubmit}
          className={`${formBg} border-2 ${formBorder} p-8 rounded-xl shadow-lg transition-colors duration-300`}
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <h2
                className={`text-3xl font-bold mb-4 ${
                  theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                }`}
              >
                Thank You!
              </h2>
              <p className="text-xl text-text-secondary">
                Your message has been received. We'll be in touch shortly.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b ${inputBorder} ${inputFocusBorder} text-text-primary py-2 focus:outline-none transition-colors duration-300 peer`}
                  required
                />
                <label
                  htmlFor="name"
                  className={`absolute left-0 top-2 transition-all duration-300 pointer-events-none
                    ${labelColor}
                    ${
                      formData.name ||
                      "group-focus-within:top-0 group-focus-within:text-sm"
                    }
                    ${formData.name || labelFocusColor}`}
                >
                  Name
                </label>
              </div>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b ${inputBorder} ${inputFocusBorder} text-text-primary py-2 focus:outline-none transition-colors duration-300 peer`}
                  required
                />
                <label
                  htmlFor="email"
                  className={`absolute left-0 top-2 transition-all duration-300 pointer-events-none
                    ${labelColor}
                    ${
                      formData.email ||
                      "group-focus-within:top-0 group-focus-within:text-sm"
                    }
                    ${formData.email || labelFocusColor}`}
                >
                  Email
                </label>
              </div>
              <div className="relative group">
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b ${inputBorder} ${inputFocusBorder} text-text-primary py-2 focus:outline-none transition-colors duration-300 peer`}
                  rows="4"
                  required
                ></textarea>
                <label
                  htmlFor="message"
                  className={`absolute left-0 top-2 transition-all duration-300 pointer-events-none
                    ${labelColor}
                    ${
                      formData.message ||
                      "group-focus-within:top-0 group-focus-within:text-sm"
                    }
                    ${formData.message || labelFocusColor}`}
                >
                  Message
                </label>
              </div>
              <motion.button
                type="submit"
                className={`w-full px-8 py-3 rounded-full text-lg font-semibold relative overflow-hidden transition-colors duration-500
                  ${submitButtonBg} ${submitButtonText}`}
                whileHover={{ scale: 1.05, boxShadow: shadowGlow }}
              >
                Submit
              </motion.button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

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

const Footer = () => {
  const theme = document.documentElement.className;
  const footerBg = theme === "dark" ? "bg-gray-950/80" : "bg-gray-50/80";
  const footerTextColor = theme === "dark" ? "text-gray-400" : "text-gray-600";

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
      className={`relative py-12 text-center transition-colors duration-500 ${footerTextColor} ${footerBg}`}
    >
      <div
        className={`absolute top-0 left-0 w-full h-1 transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gradient-to-r from-cyan-500 to-purple-500"
            : "bg-gradient-to-r from-cyan-600 to-purple-600"
        }`}
      ></div>
      <div className="container mx-auto px-4 lg:px-8">
        <p>&copy; 2024 KIC113. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default App;
