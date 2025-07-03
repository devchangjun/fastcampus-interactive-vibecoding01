"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import WorkCard from "../components/WorkCard";
import ServiceCard from "../components/ServiceCard";
import BlogCard from "../components/BlogCard";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ParticleField from "@/components/ParticleField";

export default function Home() {
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

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-8", "translate-y-12");
          entry.target.classList.add("opacity-100", "translate-y-0");
        }
      });
    }, observerOptions);

    // Observe elements
    const elementsToObserve = document.querySelectorAll(".fade-in, .work-item, .service-item, .blog-item, .stat-item");
    elementsToObserve.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

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
      <Navigation scrollToSection={scrollToSection} />

      {/* Hero Section */}
      <section className="min-h-screen w-full relative overflow-hidden" id="home">
        <ParticleField />
        <div
          className="absolute top-0 left-0 w-full h-full -z-10"
          style={{
            background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.02) 0%, rgba(10, 10, 10, 1) 70%)",
          }}
        ></div>
        <div className="container mx-auto px-5 md:px-10 h-screen flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[8rem] font-bold leading-[0.9] mb-8 max-w-6xl">
            Digital Creative Studio
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-4xl mx-auto text-neutral-300 px-4">
            Line Studio® is a versatile creative studio specializing in Branding, Web Design, and Development. We
            empower clients to elevate their brands, expand their reach, and distinguish themselves in their industry
            through impactful solutions and innovative design.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section
        className="fade-in py-20 md:py-30 px-5 md:px-10 max-w-6xl mx-auto opacity-0 translate-y-8 transition-all duration-700 ease-in-out"
        id="about"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20 items-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-center md:text-left">
            About Us
          </h2>
          <div className="md:col-span-2">
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-8">
              Our expertise is in designing visuals that effectively connect with the target audience. We create
              memorable brand experiences through strategic design thinking and cutting-edge technology.
            </p>
            <Link
              href="#contact"
              className="inline-block py-4 px-8 bg-transparent border border-neutral-600 text-white no-underline rounded-full transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:-translate-y-1"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
            >
              Work with us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-neutral-900">
        <div className="container mx-auto px-5 md:px-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-16 text-center">
            <div className="stat-item opacity-0 translate-y-8 transition-all duration-500 ease-in-out">
              <span className="stat-number block text-5xl font-bold text-white" data-target="19">
                19
              </span>
              <span className="text-base text-neutral-300 mt-3 block">Featured work</span>
            </div>
            <div className="stat-item opacity-0 translate-y-8 transition-all duration-500 ease-in-out">
              <span className="stat-number block text-5xl font-bold text-white" data-target="350">
                350
              </span>
              <span className="text-base text-neutral-300 mt-3 block">Projects Completed</span>
            </div>
            <div className="stat-item opacity-0 translate-y-8 transition-all duration-500 ease-in-out">
              <span className="stat-number block text-5xl font-bold text-white" data-target="39">
                39
              </span>
              <span className="text-base text-neutral-300 mt-3 block">Awwwards Featured</span>
            </div>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section
        className="fade-in py-20 md:py-30 px-5 md:px-10 max-w-7xl mx-auto opacity-0 translate-y-8 transition-all duration-700 ease-in-out"
        id="works"
      >
        <h2 className="text-4xl mb-10 sm:text-5xl md:text-6xl font-bold text-center">Featured Works</h2>
        <div className="grid grid-cols-1 gap-10 mt-10">
          {portfolioItems.map((item, index) => (
            <WorkCard
              key={item.id}
              id={item.id}
              title={item.title}
              category={item.category}
              award={item.award}
              image={item.image}
              index={index}
              onViewMore={() => console.log(`View more for ${item.title}`)}
            />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-30 bg-neutral-900">
        <div className="container mx-auto px-5 md:px-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16 md:mb-20">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <ServiceCard
                icon="📊"
                title="Strategy"
                description="Insight-driven strategies that align your brand goals with market opportunities and user needs."
                index={0}
              />
              <ServiceCard
                icon="🎨"
                title="UI Design"
                description="Clean, intuitive interfaces that enhance usability and elevate the user experience across all platforms."
                index={1}
              />
              <ServiceCard
                icon="💻"
                title="Web Design"
                description="Modern, responsive websites designed to captivate users and drive engagement with your brand."
                index={2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="fade-in py-20 md:py-30 px-5 md:px-10 max-w-6xl mx-auto opacity-0 translate-y-8 transition-all duration-700 ease-in-out">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16 md:mb-20">Latest Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, index) => (
            <BlogCard
              key={post.id}
              title={post.title}
              date={post.date}
              readTime={post.readTime}
              index={index}
              onClick={() => console.log(`Read more about ${post.title}`)}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer scrollToSection={scrollToSection} email={email} setEmail={setEmail} handleSubscribe={handleSubscribe} />
    </div>
  );
}
