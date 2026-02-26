"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import { Logo } from "../ui/Logo";

interface HeaderProps {
  navScrolled: boolean;
}

export function Header({ navScrolled }: HeaderProps) {
  return (
    <motion.header
      className={`nav-header ${navScrolled ? "scrolled" : ""}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="nav-inner">
        <Logo />

        <div className="nav-right">
          <motion.a
            className="nav-pill"
            href="https://sonner.emilkowal.ski/"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ y: 0 }}
            aria-label="View Sonner Documentation"
          >
            Docs ↗
          </motion.a>
          <motion.a
            className="nav-pill-star"
            href="https://github.com/iampankajghosh/sonner-patterns"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ y: 0 }}
            aria-label="Star sonner-patterns on GitHub"
          >
            <Star className="size-3" />
            <span className="nav-pill-text">Star</span>
          </motion.a>
        </div>
      </nav>
    </motion.header>
  );
}
