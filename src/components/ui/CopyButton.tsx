"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { Clipboard, ClipboardCheck } from "lucide-react";

export function CopyButton() {
  const [copied, setCopied] = useState(false);

  return (
    <motion.button
      className="btn-ghost"
      onClick={() => {
        navigator.clipboard?.writeText("npm install sonner");
        setCopied(true);
        toast.success("Copied to clipboard", {
          duration: 2000,
        });
        setTimeout(() => setCopied(false), 2200);
      }}
      whileTap={{ y: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div className="copy-slide">
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="done"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "#4ade80" }}
            >
              <ClipboardCheck className="size-3" />
              Copied!
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
            >
              <Clipboard className="size-3" />
              Copy
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
