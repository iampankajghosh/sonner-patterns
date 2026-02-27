"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Bell, Users, RefreshCw, XIcon } from "lucide-react";

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
    title: "Deployment is live",
    desc: "Your latest changes are now public",
    action: "View",
  },
  {
    type: "loading",
    title: "Syncing your files",
    desc: "Just a moment while we update everything",
    action: null,
  },
  {
    type: "error",
    title: "Could not save",
    desc: "Check your connection and try again",
    action: "Retry",
  },
  {
    type: "warning",
    title: "Running low on space",
    desc: "You have used most of your storage",
    action: "Manage",
  },
  {
    type: "info",
    title: "New message received",
    desc: "A teammate just left a comment",
    action: "Read",
  },
  {
    type: "success",
    title: "Payment received",
    desc: "Thank you for your purchase",
    action: "Invoice",
  },
  {
    type: "info",
    title: "Updated to latest version",
    desc: "New features have been added",
    action: "Learn more",
  },
  {
    type: "warning",
    title: "Working offline",
    desc: "Changes will sync when you are back online",
    action: "Connect",
  },
  {
    type: "loading",
    title: "Optimizing your experience",
    desc: "We are making things faster for you",
    action: null,
  },
  {
    type: "success",
    title: "Link copied",
    desc: "Ready to share with your team",
    action: "Undo",
  },
];

const TYPE_ICONS: Record<ToastType, React.ReactNode> = {
  success: <Check className="tp-icon size-4" />,
  error: <XIcon className="tp-icon size-4" />,
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
      await new Promise((r) => setTimeout(r, 400));
      if (!isMounted) return;

      for (let i = 0; i < 5; i++) {
        if (i !== 0) await new Promise((r) => setTimeout(r, 300));
        if (!isMounted) return;

        setToasts((prev) => {
          const next = TOAST_POOL[poolIndexRef.current % TOAST_POOL.length];
          poolIndexRef.current++;
          const updated = [...prev, { ...next, id: idRef.current++ }];
          return updated.slice(-5);
        });
      }

      await new Promise((r) => setTimeout(r, 400));
      if (!isMounted) return;
      setIsExpanded(true);

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
      <div className="tp-label">interactive preview</div>
      <div
        className="tp-stack"
        style={{
          position: "relative",
          minHeight: "395px",
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {toasts.map((t, i) => {
            const total = toasts.length;
            const posFromBottom = total - 1 - i;

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
