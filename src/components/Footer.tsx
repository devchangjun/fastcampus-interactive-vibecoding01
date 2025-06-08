"use client";

import Link from "next/link";

interface FooterProps {
  scrollToSection: (sectionId: string) => void;
  email: string;
  setEmail: (email: string) => void;
  handleSubscribe: () => void;
}

export default function Footer({ scrollToSection, email, setEmail, handleSubscribe }: FooterProps) {
  return (
    <footer className="bg-black py-16 md:py-20" id="contact">
      <div className="container mx-auto px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-12 md:mb-16">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold mb-6">Pages</h3>
              <ul className="list-none space-y-3">
                <li>
                  <Link
                    href="#home"
                    className="text-neutral-300 no-underline transition-colors duration-300 ease-in-out hover:text-white"
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
                    className="text-neutral-300 no-underline transition-colors duration-300 ease-in-out hover:text-white"
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
                    className="text-neutral-300 no-underline transition-colors duration-300 ease-in-out hover:text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("works");
                    }}
                  >
                    Work
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold mb-6">Company</h3>
              <ul className="list-none space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-neutral-300 no-underline transition-colors duration-300 ease-in-out hover:text-white"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="text-neutral-300 no-underline transition-colors duration-300 ease-in-out hover:text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("contact");
                    }}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-neutral-300 no-underline transition-colors duration-300 ease-in-out hover:text-white"
                  >
                    404
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold mb-6">Social</h3>
              <ul className="list-none space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-neutral-300 no-underline transition-colors duration-300 ease-in-out hover:text-white"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-neutral-300 no-underline transition-colors duration-300 ease-in-out hover:text-white"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-neutral-300 no-underline transition-colors duration-300 ease-in-out hover:text-white"
                  >
                    Dribbble
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-neutral-300 no-underline transition-colors duration-300 ease-in-out hover:text-white"
                  >
                    Behance
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-neutral-300 no-underline transition-colors duration-300 ease-in-out hover:text-white"
                  >
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold mb-6">Get Notified</h3>
              <p className="text-neutral-300 mb-4">Stay updated with our latest projects</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-neutral-800 border border-neutral-600 text-white py-3 px-4 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-white/20"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="bg-white text-black border-none py-3 px-6 rounded-md cursor-pointer transition-colors duration-300 hover:bg-neutral-200"
                  onClick={handleSubscribe}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-neutral-600 pt-8 text-center text-neutral-500">
            <p>Copyright © Line Studio — powered by Framer</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
