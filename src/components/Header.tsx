"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
}

export default function Header({ scrollToSection }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <motion.header
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 w-full h-16 px-6 md:px-12 backdrop-blur-lg z-50 transition-colors duration-300 ${
        scrolled ? "bg-black border-b border-gray-800" : "bg-transparent"
      }`}
      id="navbar"
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center h-full px-10">
        {/* Logo */}
        <Link
          href="#"
          className="text-2xl md:text-3xl font-bold text-white no-underline transition-colors duration-300 hover:text-gray-300"
        >
          LINE Studio
        </Link>

        {/* Navigation Links */}
        <ul className="flex list-none gap-6 md:gap-8 items-center">
          <li>
            <Link
              href="#home"
              className="text-white/90 no-underline font-medium text-sm md:text-base transition-colors duration-300 hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#about"
              className="text-white/90 no-underline font-medium text-sm md:text-base transition-colors duration-300 hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
              }}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="#works"
              className="text-white/90 no-underline font-medium text-sm md:text-base transition-colors duration-300 hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("works");
              }}
            >
              Works
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="px-4 py-2 text-white no-underline font-medium text-sm md:text-base border border-white/20 rounded-md transition-all duration-300 hover:bg-white hover:text-black"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
