"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface CustomCursorProps {
  isHovered?: boolean;
}

export default function CustomCursor({ isHovered = false }: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: mousePosition.x - 20,
        y: mousePosition.y - 20,
      }}
      animate={{
        scale: isHovered ? 2.5 : 1,
      }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 700,
        mass: 0.5,
      }}
    >
      {/* Outer ring */}
      <motion.div
        className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
        animate={{
          borderColor: isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
          backgroundColor: isHovered ? "#ffffff" : "transparent",
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
        }}
      >
        {/* View text */}
        <motion.span
          className="text-xs font-semibold"
          animate={{
            color: isHovered ? "#000000" : "transparent",
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.75,
          }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 400,
          }}
        >
          View
        </motion.span>
      </motion.div>

      {/* Dot in center for better tracking */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full"
        style={{
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          opacity: isHovered ? 0 : 0.6,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
        }}
      />
    </motion.div>
  );
}
