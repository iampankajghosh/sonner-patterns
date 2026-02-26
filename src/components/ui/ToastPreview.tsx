"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Check, Trash2, Bell, Users, RefreshCw } from "lucide-react";

const PREVIEW_TOASTS = [
  {
    type: "success",
    title: "Deployment complete",
    desc: "v2.0 is now live on pankajghosh.in",
    action: "View app",
    delay: 0,
  },
  {
    type: "loading",
    title: "Syncing workspace",
    desc: "Optimizing 1,204 assets",
    action: null,
    delay: 0.6,
  },
  {
    type: "error",
    title: "Payment failed",
    desc: "Card ••4242 was declined",
    action: "Retry",
    delay: 1.2,
  },
  {
    type: "warning",
    title: "Storage limit reached",
    desc: "Upgrade to prevent data loss",
    action: "Buy more",
    delay: 1.8,
  },
  {
    type: "info",
    title: "New collab session",
    desc: "Pankaj and 2 others joined",
    action: "Review",
    delay: 2.4,
  },
] as const;

const TYPE_ICONS: Record<string, React.ReactNode> = {
  success: <Check className="tp-icon size-4" />,
  error: <Trash2 className="tp-icon size-4" />,
  warning: <Bell className="tp-icon size-4" />,
  info: <Users className="tp-icon size-4" />,
  loading: <RefreshCw className="tp-icon size-4 animate-spin-slow" />,
};

export function ToastPreview() {
  const [progress, setProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const dur = 3200;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = ((ts - start) % dur) / dur;
      setProgress(p);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="toast-preview">
      <div className="tp-label">live preview</div>
      {PREVIEW_TOASTS.map((t, i) => (
        <motion.div
          key={t.title}
          className={`tp-card ${t.type}`}
          initial={{ opacity: 0, x: 30, filter: "blur(6px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.6,
            delay: t.delay + 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ x: 6 }}
          onHoverStart={() => setHoveredIndex(i)}
          onHoverEnd={() => setHoveredIndex(null)}
          style={{
            opacity: hoveredIndex !== null && hoveredIndex !== i ? 0.5 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          {TYPE_ICONS[t.type]}
          <div className="tp-body">
            <div className="tp-title">{t.title}</div>
            {t.desc && <div className="tp-desc">{t.desc}</div>}
            {i === 0 && (
              <div className="tp-bar">
                <motion.div
                  className="tp-bar-fill"
                  style={{ scaleX: progress, transformOrigin: "left" }}
                />
              </div>
            )}
          </div>
          {t.action && <span className="tp-action">{t.action}</span>}
        </motion.div>
      ))}
    </div>
  );
}
