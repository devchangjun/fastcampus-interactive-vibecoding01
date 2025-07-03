"use client";

import { useEffect, useRef, ReactNode } from "react";

interface SlideUpProps {
  children: ReactNode;
  className?: string;
  offset?: string;
  duration?: number;
  delay?: number;
}

const SlideUp: React.FC<SlideUpProps> = ({
  children,
  className = "",
  offset = "translate-y-8",
  duration = 700,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.remove("opacity-0", offset);
          element.classList.add("opacity-100", "translate-y-0");
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [offset]);

  return (
    <div
      ref={ref}
      className={`opacity-0 ${offset} transition-all ease-in-out ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default SlideUp;
