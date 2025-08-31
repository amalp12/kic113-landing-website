import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const WhoCanUse = () => {
  const { theme } = useTheme();

  const users = [
    {
      name: "Food manufacturers",
      description: "seeking seamless, real-time regulatory compliance",
    },
    {
      name: "Food brands",
      description: "aiming to connect directly with consumers and boost loyalty",
    },
    {
      name: "Restaurants, Cloud Kitchens and other food production units",
      description: "wanting authentic consumer feedback",
    },
    {
      name: "Digital marketing agencies",
      description: "lowering ad spend while maximizing reach",
    },
    {
      name: "Product developers",
      description: "leveraging consumer insights for faster innovation (New Product Development and R&D Teams)",
    },
    {
      name: "Food Consultants and Businesses of all sizes",
      description: "looking for scalable solutions to grow confidently",
    },
  ];

  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const glow = theme === "dark" ? "0 0 20px rgba(0, 255, 255, 0.5)" : "0 0 20px rgba(0, 169, 255, 0.3)";

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
          Who Can Use KIC113?
        </h2>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
          KIC113 is designed to empower a wide range of food industry players.
        </p>
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: glow }}
            className={`group relative overflow-hidden rounded-xl border-2 border-transparent transition-all duration-300 p-6 ${cardBg}`}
          >
            <div className="flex items-start">
              <CheckCircle className="text-cyan-500 mr-4 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  {user.name}
                </h3>
                <p className="text-text-secondary">{user.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center mt-12"
      >
        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
          Whether you're a startup or an established brand, KIC113’s AI-driven platform supports your journey towards safer, smarter, and more connected food business success.
        </p>
      </motion.div>
    </section>
  );
};

export default WhoCanUse;
