"use client";

import { motion } from "motion/react";
import { Zap, Sparkles } from "lucide-react";
import { RevealWords } from "../ui/RevealWords";
import { ToastPreview } from "../ui/ToastPreview";
import { MagneticButton } from "../ui/MagneticButton";
import { basicVariants } from "../../lib/toast-demos";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{
              duration: 1.5,
              delay: 1.5,
              repeat: Infinity,
              repeatDelay: 4,
            }}
          >
            <Zap className="size-3" />
          </motion.div>
          24 crafted patterns to help you build and ship faster
        </motion.div>

        <h1 className="h1">
          <RevealWords text="Every toast pattern" delay={0.25} />
          <br />
          <RevealWords text="you will" delay={0.4} />{" "}
          <motion.em
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.65,
              delay: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            ever need.
          </motion.em>
        </h1>

        <motion.p
          className="hero-body"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          A curated collection of <strong>24 essential patterns</strong> for
          Sonner. I built this to help you handle everything from simple alerts
          to complex auth flows without the headache.
        </motion.p>

        <motion.div
          className="hero-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <MagneticButton variant="primary" onClick={basicVariants}>
            <Sparkles className="size-4" />
            Try the first toast
          </MagneticButton>
          <span className="hero-note">Scroll down to see all the patterns</span>
        </motion.div>
      </div>

      <motion.div
        className="hero-right"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <ToastPreview />
      </motion.div>
    </section>
  );
}
