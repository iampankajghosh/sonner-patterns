"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Trash2, Bell, Users, RefreshCw } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info" | "loading";

interface ToastItem {
  id: number;
  type: ToastType;
  title: string;
  desc?: string;
  action?: string | null;
}

const TOAST_POOL: Omit<ToastItem, "id">[] = [
  {
    type: "success",
    title: "Deployment complete",
    desc: "v2.0 is now live on Vercel",
    action: "View",
  },
  {
    type: "loading",
    title: "Syncing workspace",
    desc: "Processing 1,204 assets",
    action: null,
  },
  {
    type: "error",
    title: "Write permission denied",
    desc: "Check your folder settings",
    action: "Fix",
  },
  {
    type: "warning",
    title: "Low disk space",
    desc: "92% of quota used",
    action: "Upgrade",
  },
  {
    type: "info",
    title: "New collaborator",
    desc: "User joined from Mumbai, IN",
    action: "Reply",
  },
  {
    type: "success",
    title: "Payment successful",
    desc: "$49.00 charged to Visa ••4444",
    action: "Receipt",
  },
  {
    type: "info",
    title: "Update available",
    desc: "Restart to apply v3.4.1",
    action: "Update",
  },
  {
    type: "warning",
    title: "Offline mode",
    desc: "Changes will sync when online",
    action: "Retry",
  },
  {
    type: "loading",
    title: "Optimizing images",
    desc: "Reducing bundle size by 14%",
    action: null,
  },
  {
    type: "success",
    title: "Invite sent",
    desc: "Link copied to clipboard",
    action: "Undo",
  },
];

const TYPE_ICONS: Record<ToastType, React.ReactNode> = {
  success: <Check className="tp-icon size-4" />,
  error: <Trash2 className="tp-icon size-4" />,
  warning: <Bell className="tp-icon size-4" />,
  info: <Users className="tp-icon size-4" />,
  loading: <RefreshCw className="tp-icon animate-spin-slow size-4" />,
};

export function ToastPreview() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const idRef = useRef(0);
  const poolIndexRef = useRef(0);

  useEffect(() => {
    let isMounted = true;
    let intervalId: ReturnType<typeof setInterval>;

    const sequence = async () => {
      // 1200ms initial delay for better user pacing after page load
      await new Promise((r) => setTimeout(r, 1200));
      if (!isMounted) return;

      // 1. Arrival sequence
      for (let i = 0; i < 5; i++) {
        if (i !== 0) await new Promise((r) => setTimeout(r, 800));
        if (!isMounted) return;

        setToasts((prev) => {
          const next = TOAST_POOL[poolIndexRef.current % TOAST_POOL.length];
          poolIndexRef.current++;
          const updated = [...prev, { ...next, id: idRef.current++ }];
          return updated.slice(-5);
        });
      }

      // 2. Expand pause
      await new Promise((r) => setTimeout(r, 1000));
      if (!isMounted) return;
      setIsExpanded(true);

      // 3. Continuous Loop
      intervalId = setInterval(() => {
        if (!isMounted) return;
        setToasts((prev) => {
          const next = TOAST_POOL[poolIndexRef.current % TOAST_POOL.length];
          poolIndexRef.current++;
          const newToast = { ...next, id: idRef.current++ };
          return [...prev.slice(1), newToast].slice(-5);
        });
      }, 3000);
    };

    sequence();
    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      className={`toast-preview ${isExpanded ? "is-expanded" : "is-collapsed"}`}
    >
      <div className="tp-label">live demonstration</div>
      <div
        className="tp-stack"
        style={{
          position: "relative",
          minHeight: "390px",
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {toasts.map((t, i) => {
            const total = toasts.length;
            const posFromBottom = total - 1 - i; // Newest (at end) is 0

            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{
                  opacity: 1,
                  y: isExpanded ? 0 : posFromBottom * -16,
                  scale: isExpanded ? 1 : 1 - posFromBottom * 0.04,
                  filter: "blur(0px)",
                  zIndex: 100 - posFromBottom,
                }}
                exit={{
                  opacity: 0,
                  y: 24,
                }}
                transition={{
                  layout: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
                  y: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
                  opacity: { duration: 0.25 },
                  scale: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
                }}
                className={`tp-card ${t.type}`}
                style={{
                  position: isExpanded ? "relative" : "absolute",
                  bottom: isExpanded ? "auto" : 0,
                  left: 0,
                  right: 0,
                }}
              >
                {TYPE_ICONS[t.type]}
                <div className="tp-body">
                  <div className="tp-title">{t.title}</div>
                  {t.desc && <div className="tp-desc">{t.desc}</div>}
                </div>
                {t.action && <span className="tp-action">{t.action}</span>}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
