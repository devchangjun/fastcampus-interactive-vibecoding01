"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface WorkCardProps {
  id: number;
  title: string;
  category: string;
  award: string;
  image: string;
  index?: number;
  onViewMore?: () => void;
}

export default function WorkCard({ id, title, category, award, image, index = 0, onViewMore }: WorkCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-35%", "35%"]);

  return (
    <motion.div
      ref={ref}
      className="work-item h-[500px] md:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden relative transition-all duration-500 ease-in-out cursor-pointer opacity-0 translate-y-12 group hover:-translate-y-4 hover:scale-[1.02] hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y }}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover z-10 transition-transform duration-75 ease-out will-change-transform"
            style={{
              objectPosition: "center",
              transform: "scale(1.2) translateY(-5%)",
            }}
            onError={(e) => {
              // Fallback to gradient if image fails to load
              const target = e.target as HTMLElement;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                parent.style.background = `linear-gradient(135deg, hsl(${id * 60}, 70%, 60%) 0%, hsl(${
                  id * 60 + 30
                }, 70%, 40%) 100%)`;
              }
            }}
          />
        </motion.div>
      </div>

      {/* Main overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-center items-center text-center p-10 transition-all duration-300 ease-in-out z-20"
        style={{
          background: "linear-gradient(135deg, rgba(59, 90, 242, 0.8) 0%, rgba(139, 70, 255, 0.8) 100%)",
        }}
      >
        {/* Category */}
        <div className="absolute top-8 left-8 text-sm text-white/90 font-medium">{category}</div>

        {/* Award */}
        <div className="absolute top-8 right-8 text-sm text-white/90 font-medium">{award}</div>

        {/* Title */}
        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-white leading-tight tracking-tight uppercase">
          {title}
        </h3>

        {/* Button */}
        <button
          className="bg-white/20 border-2 border-white/30 text-white py-4 px-9 rounded-full text-base font-semibold uppercase tracking-wider transition-all duration-300 ease-in-out backdrop-blur-md hover:bg-white/30 hover:border-white/50 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)]"
          onClick={onViewMore}
        >
          View More
        </button>
      </div>

      {/* Hover effect for overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(42, 74, 214, 0.9) 0%, rgba(122, 53, 232, 0.9) 100%)",
        }}
      ></div>
    </motion.div>
  );
}
