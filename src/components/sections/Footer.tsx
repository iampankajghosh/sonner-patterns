"use client";

import { motion } from "motion/react";

export function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="footer-l">
        Add{" "}
        <span style={{ color: "var(--accent2)", fontFamily: "var(--mono)" }}>
          &lt;Toaster /&gt;
        </span>{" "}
        to enable toasts site-wide. Built on{" "}
        <a
          href="https://sonner.emilkowal.ski/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sonner
        </a>{" "}
        by Emil Kowalski.
      </div>

      <div className="footer-r">
        <a
          href="https://x.com/im_pankajghosh"
          target="_blank"
          rel="noopener noreferrer"
          className="creator-inline"
        >
          <img
            src="https://avatars.githubusercontent.com/u/140588883?v=4"
            alt="Pankaj Ghosh"
            className="creator-avatar"
            width="24"
            height="24"
            loading="lazy"
            decoding="async"
          />
          <span>Pankaj Ghosh</span>
        </a>
        <span>sonner.patterns · 2026</span>
      </div>
    </motion.footer>
  );
}
