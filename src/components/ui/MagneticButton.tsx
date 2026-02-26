"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "ghost" | "primary";
}

export function MagneticButton({
  children,
  onClick,
  variant = "ghost",
}: MagneticButtonProps) {
  const [fired, setFired] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setFired(true);
      onClick();
      setTimeout(() => setFired(false), 700);

      // Ripple effect
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setTimeout(() => setRipple(null), 600);
      }
    },
    [onClick],
  );

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      whileTap={{ y: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className={
        variant === "primary"
          ? "btn-primary"
          : `btn-ghost ${fired ? "btn-fired" : ""}`
      }
      style={{ position: "relative", overflow: "hidden" }}
    >
      <AnimatePresence>
        {ripple && (
          <motion.span
            key={`${ripple.x}-${ripple.y}`}
            initial={{ scale: 0, opacity: 0.35 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
              borderRadius: "50%",
              background:
                variant === "primary"
                  ? "rgba(0,0,0,0.15)"
                  : "rgba(200,241,53,0.2)",
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>
      {fired && variant === "ghost" ? (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
        >
          <Check className="size-3" /> fired
        </motion.span>
      ) : (
        children
      )}
    </motion.button>
  );
}
