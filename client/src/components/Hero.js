"use client";

import { motion } from "framer-motion";
import { FaPenFancy } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 py-20 md:py-32 bg-linear-to-bl from-[#f0eeee]  to-[#21c06359]">
      {/* Small tagline */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm md:text-base font-medium text-primary mb-3"
      >
        🌿 Your safe space for self-reflection
      </motion.p>

      {/* Logo / Title */}
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-5xl md:text-6xl font-bold text-gray-900"
      >
        <span className="font-pacifico text-primary">Settle</span>
        <span className="font-poppins ml-2">— AI Journal App</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 max-w-2xl text-gray-600 text-lg md:text-xl"
      >
        Reflect, write, and grow — with AI by your side. 
        Settle helps you understand your thoughts and emotions 
        through intelligent journaling and mood insights.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 flex flex-col sm:flex-row gap-4"
      >
        <button className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-lg font-semibold hover:scale-105 transition-all shadow-md">
          <FaPenFancy />
          Start Journaling
        </button>

        <button className="flex items-center justify-center gap-2 border border-gray-300 px-6 py-3 rounded-full text-lg font-semibold text-gray-800 hover:bg-gray-100 transition-all">
          See How It Works <AiOutlineArrowRight />
        </button>
      </motion.div>

      {/* Decorative background glow */}
      <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/20 blur-[120px] rounded-full opacity-30"></div>
    </section>
  );
};

export default Hero;
