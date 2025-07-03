"use client";

import { useState, useEffect, useRef } from "react";

interface CountUpProps {
  endValue: number;
  duration?: number;
  className?: string;
  suffix?: string;
}

const CountUp: React.FC<CountUpProps> = ({ endValue, duration = 2000, className, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTime: number | null = null;
          const step = (timestamp: number) => {
            if (!startTime) {
              startTime = timestamp;
            }
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
            const currentCount = Math.floor(easeOutExpo(progress) * endValue);
            setCount(currentCount);

            if (progress < 1) {
              animationFrameId.current = requestAnimationFrame(step);
            } else {
              setCount(endValue);
            }
          };
          animationFrameId.current = requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [endValue, duration]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
};

export default CountUp;
