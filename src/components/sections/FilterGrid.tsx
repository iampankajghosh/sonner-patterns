"use client";

import { motion, AnimatePresence } from "motion/react";
import { DemoCard } from "../ui/DemoCard";
import { CopyButton } from "../ui/CopyButton";
import { GROUPS } from "../../lib/groups";

interface FilterGridProps {
  filter: string;
  setFilter: (filter: string) => void;
}

export function FilterGrid({ filter, setFilter }: FilterGridProps) {
  const tags = ["all", ...Array.from(new Set(GROUPS.map((g) => g.tag)))];
  const filtered =
    filter === "all" ? [...GROUPS] : GROUPS.filter((g) => g.tag === filter);

  return (
    <>
      {/* Install strip */}
      <motion.div
        className="install"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="install-lbl">install</span>
        <code className="install-cmd">
          npm install sonner
          <span className="install-cursor" />
        </code>
        <div className="install-copy">
          <CopyButton />
        </div>
      </motion.div>

      {/* Section head */}
      <motion.div
        className="sec-head"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="sec-tag"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {"// interactive playground"}
        </motion.div>
        <h2 className="sec-h2">
          Click to fire. <em>Watch and learn.</em>
        </h2>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="filters"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <span className="filter-lbl">filter:</span>
        {tags.map((t) => (
          <motion.button
            key={t}
            className={`filter-btn ${filter === t ? "on" : ""}`}
            onClick={() => setFilter(t)}
            whileTap={{ y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            layout
          >
            {t}
            {filter === t && (
              <motion.div
                layoutId="filter-active"
                style={{
                  position: "absolute",
                  inset: -1,
                  borderRadius: 6,
                  border: "1px solid rgba(200,241,53,0.28)",
                  background: "rgba(200,241,53,0.06)",
                  zIndex: -1,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          className="grid"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {filtered.map((g, i) => (
            <DemoCard key={g.id} group={g} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
