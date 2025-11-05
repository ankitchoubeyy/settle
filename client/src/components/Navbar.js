"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="w-full bg-white border-b border-secondary py-4 px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="logo text-3xl text-primary">
        Settle
      </Link>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-8 text-[16px] font-medium">
        <li>
          <Link
            href="/"
            className="hover:text-primary transition-colors duration-200"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/journal"
            className="hover:text-primary transition-colors duration-200"
          >
            Journal
          </Link>
        </li>
        <li>
          <Link
            href="/insights"
            className="hover:text-primary transition-colors duration-200"
          >
            Insights
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-primary transition-colors duration-200"
          >
            About
          </Link>
        </li>
      </ul>

      {/* Desktop Button */}
      <div className="hidden md:block">
        <Link
          href="/login"
          className="btn shadow-sm hover:shadow-md transition-all duration-200"
        >
          Get Started
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-3xl text-foreground hover:text-primary transition"
        aria-label="Toggle Menu"
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute bg-white top-[68px] w-full left-0 z-50 border-t border-secondary shadow-md flex flex-col items-center py-6 gap-6 md:hidden animate-fadeIn">
          <Link
            href="/"
            onClick={closeMenu}
            className="text-lg hover:text-primary transition"
          >
            Home
          </Link>
          <Link
            href="/journal"
            onClick={closeMenu}
            className="text-lg hover:text-primary transition"
          >
            Journal
          </Link>
          <Link
            href="/insights"
            onClick={closeMenu}
            className="text-lg hover:text-primary transition"
          >
            Insights
          </Link>
          <Link
            href="/about"
            onClick={closeMenu}
            className="text-lg hover:text-primary transition"
          >
            About
          </Link>
          <Link
            href="/login"
            onClick={closeMenu}
            className="btn w-[80%] text-center"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
