"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import WorkCard from "../components/WorkCard";
import ServiceCard from "../components/ServiceCard";
import BlogCard from "../components/BlogCard";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ParticleField from "@/components/ParticleField";
import Image from "next/image";
import { FiAward, FiBarChart2, FiBriefcase } from "react-icons/fi";
import TypingAnimation from "@/components/TypingAnimation";
import ScrambleText from "@/components/ScrambleText";
import CountUp from "@/components/CountUp";
import Marquee from "@/components/Marquee";
import ScrollTriggerText from "@/components/ScrollTriggerText";
import SlideUp from "@/components/SlideUp";

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
          <TypingAnimation
            text="Digital Creative Studio"
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[8rem] font-bold leading-[0.9] mb-8 max-w-6xl text-white"
          />
          <SlideUp offset="translate-y-12" duration={1000} delay={500}>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-4xl mx-auto text-neutral-300 px-4">
              Line Studio® is a versatile creative studio specializing in Branding, Web Design, and Development. We
              empower clients to elevate their brands, expand their reach, and distinguish themselves in their industry
              through impactful solutions and innovative design.
            </p>
          </SlideUp>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32" id="about">
        <div className="container mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative w-full h-96 lg:h-[30rem]">
              <Image
                src="/image/6.webp"
                alt="About Line Studio"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div>
              <ScrambleText
                text="Design with Purpose"
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
              />
              <ScrollTriggerText
                className="text-lg md:text-xl leading-relaxed mb-8"
                fromColor="#737373"
                toColor="#d4d4d4"
              >
                Our expertise is in designing visuals that effectively connect with the target audience. We create
                memorable brand experiences through strategic design thinking and cutting-edge technology.
              </ScrollTriggerText>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-4">
                  <span className="text-xl text-white">✓</span>
                  <p className="text-neutral-300 text-lg">Insight-driven Strategy</p>
                </li>
                <li className="flex items-center gap-4">
                  <span className="text-xl text-white">✓</span>
                  <p className="text-neutral-300 text-lg">Human-centered Design</p>
                </li>
                <li className="flex items-center gap-4">
                  <span className="text-xl text-white">✓</span>
                  <p className="text-neutral-300 text-lg">Innovative Technology</p>
                </li>
              </ul>
              <Link
                href="#contact"
                className="inline-block py-4 px-8 bg-transparent border border-neutral-600 text-white no-underline rounded-full"
              >
                Work with us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-10 md:py-20">
        <Marquee baseVelocity={-1} className="text-4xl md:text-6xl font-bold">
          Line Studio® • Design with Purpose •&nbsp;
        </Marquee>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-32 bg-neutral-900">
        <div className="container mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Stat Card 1 */}
            <div className="stat-item bg-neutral-800/50 p-8 rounded-lg opacity-0 translate-y-8 transition-all duration-500 ease-in-out">
              <FiBriefcase className="text-4xl text-white mx-auto mb-4" />
              <CountUp endValue={19} suffix="+" className="block text-5xl font-bold text-white" />
              <h3 className="text-lg font-semibold text-neutral-300 mt-3">Featured Work</h3>
              <p className="text-neutral-400 mt-2 text-sm">Recognized for excellence in design and development.</p>
            </div>
            {/* Stat Card 2 */}
            <div className="stat-item bg-neutral-800/50 p-8 rounded-lg opacity-0 translate-y-8 transition-all duration-500 ease-in-out delay-150">
              <FiBarChart2 className="text-4xl text-white mx-auto mb-4" />
              <CountUp endValue={350} suffix="+" className="block text-5xl font-bold text-white" />
              <h3 className="text-lg font-semibold text-neutral-300 mt-3">Projects Completed</h3>
              <p className="text-neutral-400 mt-2 text-sm">Delivering impactful solutions across various industries.</p>
            </div>
            {/* Stat Card 3 */}
            <div className="stat-item bg-neutral-800/50 p-8 rounded-lg opacity-0 translate-y-8 transition-all duration-500 ease-in-out delay-300">
              <FiAward className="text-4xl text-white mx-auto mb-4" />
              <CountUp endValue={39} suffix="+" className="block text-5xl font-bold text-white" />
              <h3 className="text-lg font-semibold text-neutral-300 mt-3">Awwwards Featured</h3>
              <p className="text-neutral-400 mt-2 text-sm">Honored by the most prestigious web design awards.</p>
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
