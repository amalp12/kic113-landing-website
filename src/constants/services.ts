import { Shield, Sparkles, Star } from "lucide-react";
import React, { ReactElement } from "react";

interface Service {
  title: string;
  icon: ReactElement;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    title: "KIC113 Regulatory",
    icon: React.createElement(Shield, { className: "w-6 h-6" }),
    description:
      "Automate compliance checks and navigate complex food safety regulations with AI precision.",
    features: [
      "Data with trusted source of truth",
      "Real-time Regulation Monitoring",
      "Compliance AI Assistant",
      "Compliance Update Notifications",
    ],
  },
  {
    title: "KIC113 BEE",
    icon: React.createElement(Star, { className: "w-6 h-6" }),
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
    icon: React.createElement(Sparkles, { className: "w-6 h-6" }),
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

export { services };
