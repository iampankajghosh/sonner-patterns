"use client";

import { motion } from "motion/react";

interface RevealWordsProps {
  text: string;
  delay?: number;
}

export function RevealWords({ text, delay = 0 }: RevealWordsProps) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {w}
        </motion.span>
      ))}
    </>
  );
}
