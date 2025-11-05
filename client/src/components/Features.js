import React from "react";
import { FaBrain, FaLock, FaFeatherAlt, FaChartLine } from "react-icons/fa";

const features = [
  {
    icon: <FaBrain className="text-primary text-4xl mb-4" />,
    title: "AI-Powered Insights",
    desc: "Understand your thoughts with smart reflections and summaries powered by AI.",
  },
  {
    icon: <FaFeatherAlt className="text-primary text-4xl mb-4" />,
    title: "Minimal & Peaceful Writing",
    desc: "A clean, distraction-free space to capture your daily thoughts with calm and clarity.",
  },
  {
    icon: <FaLock className="text-primary text-4xl mb-4" />,
    title: "Privacy First",
    desc: "Your journal stays encrypted and secure. Only you have access to your reflections.",
  },
  {
    icon: <FaChartLine className="text-primary text-4xl mb-4" />,
    title: "Mood Tracking",
    desc: "Track your emotional trends and visualize your personal growth over time.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-background text-foreground">
      <div className="container mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
          Why Choose <span className="text-primary">Settle</span>?
        </h2>
        <p className="text-muted max-w-2xl mx-auto mb-12">
          Settle blends mindfulness and technology to help you write freely,
          reflect deeply, and grow meaningfully — every single day.
        </p>

        {/* Features Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card hover:shadow-lg transition-all duration-300 p-6"
            >
              <div className="flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
