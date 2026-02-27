"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
} from "motion/react";
import { ChevronRight, BookOpen } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import type { Group } from "../../lib/groups";

interface DemoCardProps {
  group: Group;
  index: number;
  onOpen: () => void;
}

export function DemoCard({ group, index, onOpen }: DemoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = group.icon;

  // Mouse tilt
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const rotateX = useTransform(cardY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(cardX, [-0.5, 0.5], [-3, 3]);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    cardX.set((e.clientX - rect.left) / rect.width - 0.5);
    cardY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="demo-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
    >
      <div className="card-top">
        <div
          className="card-top-left"
          onClick={onOpen}
          style={{ cursor: "pointer" }}
        >
          <motion.div
            className="card-icon-wrap"
            style={{ "--tag-c": group.tagColor } as React.CSSProperties}
            whileHover={{ rotate: [0, -8, 8, -4, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="size-3.5" style={{ color: group.tagColor }} />
          </motion.div>
          <span className="card-id">{group.id}</span>
        </div>

        <div className="card-top-right">
          <button
            onClick={onOpen}
            className="btn-impl-mini"
            title="View Implementation"
          >
            <BookOpen className="size-3.5" />
          </button>

          <motion.span
            className="card-tag"
            style={{
              color: group.tagColor,
              borderColor: group.tagColor + "30",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            {group.tag}
          </motion.span>
        </div>
      </div>

      <motion.h3
        className="card-title"
        onClick={onOpen}
        whileHover={{ color: "var(--accent)" }}
      >
        {group.label}
      </motion.h3>
      <p className="card-desc">{group.desc}</p>

      <div className="card-actions">
        {group.actions.map((a) => (
          <MagneticButton key={a.label} onClick={a.fn} variant="ghost">
            <ChevronRight className="-mt-px mr-0.5 inline-block size-3 opacity-50" />
            {a.label}
          </MagneticButton>
        ))}
      </div>
    </motion.div>
  );
}
