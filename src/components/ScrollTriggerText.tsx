"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

interface ScrollTriggerTextProps {
  children: string;
  className?: string;
  fromColor?: string;
  toColor?: string;
}

const Word = ({
  children,
  range,
  progress,
  fromColor = "#999999",
  toColor = "#FFFFFF",
}: {
  children: React.ReactNode;
  range: [number, number];
  progress: MotionValue<number>;
  fromColor?: string;
  toColor?: string;
}) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const scale = useTransform(progress, range, [0.8, 1]);
  const color = useTransform(progress, range, [fromColor, toColor]);

  return (
    <span className="relative inline-block mr-[12px] mt-[12px]">
      <motion.span style={{ opacity, scale, color }}>{children}</motion.span>
    </span>
  );
};

const ScrollTriggerText = ({ children, className, fromColor, toColor }: ScrollTriggerTextProps) => {
  const container = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = children.split(" ");

  return (
    <p ref={container} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress} fromColor={fromColor} toColor={toColor}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};

export default ScrollTriggerText;
