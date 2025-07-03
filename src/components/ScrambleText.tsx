"use client";

import { useState, useEffect, useRef } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

const ScrambleText: React.FC<ScrambleTextProps> = ({ text, className }) => {
  const [displayedText, setDisplayedText] = useState("");
  const ref = useRef<HTMLHeadingElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimating.current) {
          isAnimating.current = true;
          animateText();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [text]);

  const animateText = () => {
    let iteration = 0;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    const interval = setInterval(() => {
      const newText = text
        .split("")
        .map((_, index) => {
          if (index < iteration) {
            return text[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplayedText(newText);

      if (iteration >= text.length) {
        clearInterval(interval);
        isAnimating.current = false;
      }
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <h2 ref={ref} className={className}>
      {displayedText || " "}
    </h2>
  );
};

export default ScrambleText;
