"use client";

import { useState, useEffect } from "react";

interface TypingAnimationProps {
  text: string;
  className?: string;
  speed?: number;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ text, className, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsComplete(true);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return (
    <div className="relative">
      <h1 className={`${className} invisible`}>
        {text}
        <span className="ml-2 inline-block w-1 h-[0.8em]"></span>
      </h1>
      <h1 className={`${className} absolute top-0 left-0 w-full`}>
        {displayedText}
        <span
          className={`ml-2 inline-block w-1 h-[0.8em] bg-white transition-opacity duration-300 ${
            isComplete ? "opacity-100 animate-blink" : "opacity-0"
          }`}
        ></span>
      </h1>
    </div>
  );
};

export default TypingAnimation;
