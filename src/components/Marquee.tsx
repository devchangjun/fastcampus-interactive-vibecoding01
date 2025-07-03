"use client";

import React from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface MarqueeProps {
  children: string;
  baseVelocity: number;
  className?: string;
}

export default function Marquee({ children, baseVelocity = 3, className }: MarqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 1], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, -75, v)}%`);

  const directionFactor = React.useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    moveBy += directionFactor.current * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`w-full overflow-hidden whitespace-nowrap flex ${className}`}>
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        <span className="block mx-4">{children}</span>
        <span className="block mx-4">{children}</span>
        <span className="block mx-4">{children}</span>
        <span className="block mx-4">{children}</span>
      </motion.div>
    </div>
  );
}
