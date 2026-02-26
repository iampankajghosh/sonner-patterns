"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CursorGlow() {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const smoothX = useSpring(x, { stiffness: 60, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 60, damping: 30 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);

  return (
    <motion.div
      className="cursor-glow"
      style={{ left: smoothX, top: smoothY }}
    />
  );
}
