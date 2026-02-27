"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
} from "motion/react";
import { ChevronRight } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import type { Group } from "../../lib/groups";
import { usePostHog } from "@posthog/react";

interface DemoCardProps {
  group: Group;
  index: number;
  onOpen: () => void;
}

export function DemoCard({ group, index, onOpen }: DemoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = group.icon;
  const posthog = usePostHog();

  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const rotateX = useTransform(cardY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(cardX, [-0.5, 0.5], [-3, 3]);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardX.set(x);
    cardY.set(y);
    ref.current.style.setProperty("--mouse-x", `${(x + 0.5) * 100}%`);
    ref.current.style.setProperty("--mouse-y", `${(y + 0.5) * 100}%`);
  };

  const handleMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      layoutId={`modal-${group.id}`}
      layout
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
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (!target.closest(".magnetic-button")) {
          onOpen();
          posthog.capture("pattern_card_opened", {
            pattern_id: group.id,
            pattern_label: group.label,
            pattern_tag: group.tag,
          });
        }
      }}
    >
      <div
        className="card-spotlight"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(200, 241, 53, 0.08), transparent)`,
        }}
      />
      <div className="card-top">
        <div className="card-top-left">
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

      <h3 className="card-title">{group.label}</h3>
      <p className="card-desc">{group.desc}</p>

      <div className="card-actions">
        {group.actions.map((a) => (
          <MagneticButton
            key={a.label}
            onClick={() => {
              a.fn();
              posthog.capture("pattern_demo_triggered", {
                pattern_id: group.id,
                pattern_label: group.label,
                pattern_tag: group.tag,
                action_label: a.label,
              });
            }}
            variant="ghost"
          >
            <ChevronRight className="-mt-px mr-0.5 inline-block size-3 opacity-50" />
            {a.label}
          </MagneticButton>
        ))}
      </div>
    </motion.div>
  );
}
