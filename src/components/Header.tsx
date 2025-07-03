"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
}

export default function Header({ scrollToSection }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);

    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full h-16 px-6 md:px-12 z-50 transition-all duration-500 ease-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${scrolled ? "bg-black/80 backdrop-blur-lg border-b border-neutral-800" : "bg-transparent"}`}
      id="navbar"
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center h-full">
        {/* Logo */}
        <Link
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
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
    </header>
  );
}
