import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-foreground py-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="logo text-3xl text-primary">Settle</h2>
          <p className="text-muted text-sm mt-1">
            AI-powered journaling for self-growth.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <a href="#features" className="hover:text-primary transition">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-primary transition">
            How It Works
          </a>
          <a href="#about" className="hover:text-primary transition">
            About
          </a>
          <a href="#contact" className="hover:text-primary transition">
            Contact
          </a>
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 text-xl">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-xs text-muted mt-8 border-t border-primary border-border pt-4">
        © {new Date().getFullYear()} Settle. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
