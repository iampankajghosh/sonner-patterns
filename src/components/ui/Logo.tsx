"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Logo() {
  const [isHindi, setIsHindi] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsHindi((prev) => !prev);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="logo"
      whileHover={{ x: 2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="logo-pip" />
      <div style={{ position: "relative", height: "14px", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={isHindi ? "hi" : "en"}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {isHindi ? "सोनर पैटर्न" : "sonner patterns"}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
