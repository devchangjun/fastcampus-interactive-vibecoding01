"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Smooth scrolling function
  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Navigation scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, observerOptions);

    // Observe elements
    const elementsToObserve = document.querySelectorAll(".fade-in, .work-item, .service-item, .blog-item, .stat-item");
    elementsToObserve.forEach((el) => {
      observerRef.current?.observe(el);
    });

    // Stats counter animation
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target.querySelector(".stat-number") as HTMLElement;
            const target = parseInt(counter.getAttribute("data-target") || "0");
            animateCounter(counter, target);
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const statItems = document.querySelectorAll(".stat-item");
    statItems.forEach((item) => {
      statsObserver.observe(item);
    });

    return () => {
      observerRef.current?.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  // Counter animation function
  const animateCounter = (element: HTMLElement, target: number, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);

    const updateCounter = () => {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start).toString();
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toString();
      }
    };
    updateCounter();
  };

  // Email subscription handler
  const handleSubscribe = () => {
    if (email) {
      alert("구독해주셔서 감사합니다! 🎉");
      setEmail("");
    }
  };

  // Portfolio data
  const portfolioItems = [
    {
      id: 1,
      title: "Creative Pulse",
      category: "UI, UX, Development",
      award: "CSS Award",
      image: "/image/1.webp",
    },
    {
      id: 2,
      title: "Design Surge",
      category: "Logo, User Interface",
      award: "Awwwards",
      image: "/image/2.webp",
    },
    {
      id: 3,
      title: "Vision Craft",
      category: "Logo, User Interface",
      award: "Awwwards",
      image: "/image/3.webp",
    },
    {
      id: 4,
      title: "Brand Bloom",
      category: "UI, UX, Development",
      award: "CSS Award",
      image: "/image/4.webp",
    },
    {
      id: 5,
      title: "Impact Edge",
      category: "Font, User Interface",
      award: "CSS Award",
      image: "/image/5.webp",
    },
  ];

  // Blog data
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Framer CMS",
      date: "April 12, 2025",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "SEO Strategies for 2024",
      date: "April 12, 2025",
      readTime: "5 min read",
    },
    {
      id: 3,
      title: "Content Marketing Strategies",
      date: "April 12, 2025",
      readTime: "5 min read",
    },
  ];

  return (
    <div>
      {/* Navigation */}
      <nav className={`nav ${isScrolled ? "scrolled" : ""}`} id="navbar">
        <a href="#" className="logo">
          LINE Studio
        </a>
        <ul className="nav-links">
          <li>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
              }}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#works"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("works");
              }}
            >
              Works
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-bg"></div>
        <h1 className="hero-title">
          Digital Creative
          <br />
          Studio
        </h1>
        <p className="hero-subtitle">
          Line Studio® is a versatile creative studio specializing in Branding, Web Design, and Development. We empower
          clients to elevate their brands, expand their reach, and distinguish themselves in their industry through
          impactful solutions and innovative design.
        </p>
      </section>

      {/* About Section */}
      <section className="about fade-in" id="about">
        <div className="about-content">
          <h2 className="about-title">About Us</h2>
          <div>
            <p className="about-text">
              Our expertise is in designing visuals that effectively connect with the target audience. We create
              memorable brand experiences through strategic design thinking and cutting-edge technology.
            </p>
            <a
              href="#contact"
              className="about-btn"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
            >
              Work with us
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number" data-target="19">
              0
            </span>
            <span className="stat-label">Featured work</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" data-target="350">
              0
            </span>
            <span className="stat-label">Projects Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" data-target="39">
              0
            </span>
            <span className="stat-label">Awwwards Featured</span>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section className="works fade-in" id="works">
        <h2 className="works-title">Featured Works</h2>
        <div className="works-grid">
          {portfolioItems.map((item, index) => (
            <div key={item.id} className="work-item" style={{ transitionDelay: `${index * 0.1}s` }}>
              <Image
                src={item.image}
                alt={item.title}
                fill
                style={{ objectFit: "cover" }}
                onError={(e) => {
                  // Fallback to gradient if image fails to load
                  const target = e.target as HTMLElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.style.background = `linear-gradient(135deg, hsl(${item.id * 60}, 70%, 60%) 0%, hsl(${
                      item.id * 60 + 30
                    }, 70%, 40%) 100%)`;
                  }
                }}
              />
              <div className="work-overlay">
                <div className="work-category">{item.category}</div>
                <div className="work-award">{item.award}</div>
                <h3 className="work-title">{item.title}</h3>
                <a href="#" className="work-btn">
                  View More
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="services-container">
          <h2 className="services-title">Our Services</h2>
          <div className="services-grid">
            <div className="service-item" style={{ transitionDelay: "0s" }}>
              <div className="service-icon">📊</div>
              <h3 className="service-title">Strategy</h3>
              <p className="service-description">
                Insight-driven strategies that align your brand goals with market opportunities and user needs.
              </p>
            </div>
            <div className="service-item" style={{ transitionDelay: "0.2s" }}>
              <div className="service-icon">🎨</div>
              <h3 className="service-title">UI Design</h3>
              <p className="service-description">
                Clean, intuitive interfaces that enhance usability and elevate the user experience across all platforms.
              </p>
            </div>
            <div className="service-item" style={{ transitionDelay: "0.4s" }}>
              <div className="service-icon">💻</div>
              <h3 className="service-title">Web Design</h3>
              <p className="service-description">
                Modern, responsive websites designed to captivate users and drive engagement with your brand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog fade-in">
        <h2 className="blog-title">Latest Insights</h2>
        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <article key={post.id} className="blog-item" style={{ transitionDelay: `${index * 0.1}s` }}>
              <div className="blog-image"></div>
              <div className="blog-content">
                <div className="blog-meta">
                  {post.date} • {post.readTime}
                </div>
                <h3 className="blog-item-title">{post.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Pages</h3>
              <ul>
                <li>
                  <a
                    href="#home"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("home");
                    }}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("about");
                    }}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#works"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("works");
                    }}
                  >
                    Work
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Company</h3>
              <ul>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("contact");
                    }}
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#">404</a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Social</h3>
              <ul>
                <li>
                  <a href="#">Instagram</a>
                </li>
                <li>
                  <a href="#">LinkedIn</a>
                </li>
                <li>
                  <a href="#">Dribbble</a>
                </li>
                <li>
                  <a href="#">Behance</a>
                </li>
                <li>
                  <a href="#">Facebook</a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Get Notified</h3>
              <p style={{ color: "#b0b0b0", marginBottom: "15px" }}>Stay updated with our latest projects</p>
              <div className="email-subscription">
                <input
                  type="email"
                  placeholder="Your email"
                  className="email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="subscribe-btn" onClick={handleSubscribe}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Copyright © Line Studio — powered by Framer</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
