"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import { Logo } from "../ui/Logo";
import { usePostHog } from "@posthog/react";

interface HeaderProps {
  navScrolled: boolean;
}

export function Header({ navScrolled }: HeaderProps) {
  const posthog = usePostHog();

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
            onClick={() =>
              posthog.capture("docs_link_clicked", {
                destination: "https://sonner.emilkowal.ski/",
                link_label: "Docs",
              })
            }
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
            onClick={() =>
              posthog.capture("github_star_clicked", {
                destination:
                  "https://github.com/iampankajghosh/sonner-patterns",
                link_label: "Star",
              })
            }
          >
            <Star className="size-3" />
            <span className="nav-pill-text">Star</span>
          </motion.a>
        </div>
      </nav>
    </motion.header>
  );
}
