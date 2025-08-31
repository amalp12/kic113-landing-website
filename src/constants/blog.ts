import { Clipboard, Lightbulb } from "lucide-react";

export const blogPosts = [
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

export const blogContent = {
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
