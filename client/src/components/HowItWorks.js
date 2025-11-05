import React from "react";
import { FaPenFancy, FaRobot, FaLeaf } from "react-icons/fa";

const steps = [
  {
    icon: <FaPenFancy className="text-primary text-4xl mb-4" />,
    title: "Write Freely",
    desc: "Capture your daily thoughts, emotions, and moments in a calm, distraction-free space.",
  },
  {
    icon: <FaRobot className="text-primary text-4xl mb-4" />,
    title: "AI Reflects Back",
    desc: "Our intelligent AI analyzes your entries to surface emotional insights and recurring patterns.",
  },
  {
    icon: <FaLeaf className="text-primary text-4xl mb-4" />,
    title: "Grow Mindfully",
    desc: "Understand your emotional journey through your own words.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="py-20 bg-secondary/30 text-foreground bg-linear-to-r from-[#fcfaf9] to-[#4ade8088]"
    >
      <div className="container mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
          How <span className="text-primary">Settle</span> Works
        </h2>
        <p className="text-muted max-w-2xl mx-auto mb-12">
          A simple process designed to help you journal effortlessly and reflect
          deeply with AI-powered insights.
        </p>

        {/* Steps Grid */}
        <div className="grid gap-12 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="card w-full h-full flex flex-col items-center">
                <div className="flex items-center justify-center bg-white rounded-full shadow-md w-16 h-16 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted">{step.desc}</p>
              </div>

              {/* Connector line for desktop */}
              {index !== steps.length - 1 && (
                <div className="hidden sm:block w-16 h-0.5 bg-border mt-8 mx-auto" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
