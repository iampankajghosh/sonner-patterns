"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { usePostHog } from "@posthog/react";

export function CopyButton() {
  const [copied, setCopied] = useState(false);
  const posthog = usePostHog();

  const handleCopy = () => {
    navigator.clipboard?.writeText("npm install sonner");
    setCopied(true);
    toast.success("Copied to clipboard", {
      duration: 2000,
    });
    setTimeout(() => setCopied(false), 2200);
    posthog.capture("install_command_copied", {
      command: "npm install sonner",
    });
  };

  return (
    <motion.button
      className="btn-ghost relative h-10 min-w-20 overflow-hidden"
      onClick={handleCopy}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.div
            key="copied"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 flex items-center justify-center gap-1 text-green-400"
          >
            <ClipboardCheck className="size-3" />
            Copied!
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 flex items-center justify-center gap-1"
          >
            <Clipboard className="size-3" />
            Copy
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
