"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
} from "motion/react";
import {
  Bell,
  Upload,
  Trash2,
  Save,
  Mail,
  ShoppingCart,
  CreditCard,
  WifiOff,
  Share2,
  Copy,
  Star,
  Heart,
  MessageSquare,
  Lock,
  Settings,
  User,
  Package,
  Rocket,
  Zap,
  Shield,
  RefreshCw,
  Clock,
  Layers,
  Code2,
  Sparkles,
  ChevronRight,
  Users,
  Gauge,
  FileDown,
  UserCheck,
  Plug,
  Trophy,
  Check,
  Clipboard,
  ClipboardCheck,
} from "lucide-react";
import { toast } from "sonner";

// ─── Sequencer ────────────────────────────────────────────────────────────────
let _seq = 0;
const seq = (fn: () => void, delay = 0) => setTimeout(fn, _seq++ * 380 + delay);

// ─── 1. Basic Variants ────────────────────────────────────────────────────────
function basicVariants() {
  _seq = 0;
  seq(() => toast("Default notification — simple and clean"));
  seq(() => toast.success("Operation completed successfully!"));
  seq(() => toast.error("Something went wrong. Please try again."));
  seq(() => toast.warning("Your session expires in 5 minutes."));
  seq(() => toast.info("New update available — v3.2.0 is live"));
}

// ─── 2. Rich Description + Icon ───────────────────────────────────────────────
function withDescription() {
  _seq = 0;
  seq(() =>
    toast("Email sent", {
      description: "Delivered to 3 recipients.",
      icon: <Mail className="size-4 text-blue-400" />,
    }),
  );
  seq(() =>
    toast.success("Payment successful", {
      description: "₹4,999 charged to Visa ••4242.",
      icon: <CreditCard className="size-4" />,
    }),
  );
  seq(() =>
    toast.error("Upload failed", {
      description: "File exceeds the 25 MB limit.",
      icon: <Upload className="size-4" />,
    }),
  );
  seq(() =>
    toast.warning("Storage almost full", {
      description: "92% of your 15 GB quota used.",
    }),
  );
}

// ─── 3. Duration Control ──────────────────────────────────────────────────────
function customDuration() {
  _seq = 0;
  seq(() => toast("Flash — gone in 1 s", { duration: 1000 }));
  seq(() =>
    toast.info("Sticky — stays until dismissed", { duration: Infinity }),
  );
  seq(() =>
    toast.success("Standard 4 s duration", {
      description: "Disappears automatically.",
    }),
  );
  seq(() =>
    toast("Extended 8 s toast", {
      description: "Good for complex messages.",
      duration: 8000,
    }),
  );
}

// ─── 4. Promise – Simple callback ─────────────────────────────────────────────
function promiseToast() {
  const fakeUpload = (): Promise<{ name: string }> =>
    new Promise((res, rej) =>
      setTimeout(
        () =>
          Math.random() > 0.3
            ? res({ name: "design-system.fig" })
            : rej(new Error("Network error")),
        2200,
      ),
    );
  toast.promise(fakeUpload(), {
    loading: "Uploading your file…",
    success: (d) => `${d.name} uploaded successfully!`,
    error: (e) => `Upload failed: ${e.message}`,
  });
}

// ─── 5. Promise – With description object ─────────────────────────────────────
function promiseWithDescription() {
  toast.promise(new Promise<void>((r) => setTimeout(r, 2500)), {
    loading: "Syncing workspace…",
    success: "Sync complete — all changes saved to the cloud.",
    error: "Sync failed — check your connection and retry.",
  });
}

// ─── 6. Action Buttons ────────────────────────────────────────────────────────
function actionToasts() {
  _seq = 0;
  seq(() =>
    toast("Message deleted", {
      description: "Undo within 5 s before it's permanent.",
      action: {
        label: "Undo",
        onClick: () => toast.success("Message restored!"),
      },
    }),
  );
  seq(() =>
    toast.error("Connection lost", {
      action: {
        label: "Retry",
        onClick: () =>
          toast.promise(new Promise((r) => setTimeout(r, 1500)), {
            loading: "Reconnecting…",
            success: "Connected!",
            error: "Still offline.",
          }),
      },
    }),
  );
  seq(() =>
    toast("New version available", {
      description: "v4.0.0 ships with 14 new components.",
      action: { label: "Update now", onClick: () => console.log("Updating…") },
      cancel: { label: "Later", onClick: () => console.log("Snoozed") },
    }),
  );
}

// ─── 7. Cancel Patterns ───────────────────────────────────────────────────────
function cancelToasts() {
  _seq = 0;
  seq(() =>
    toast("File scheduled for deletion", {
      cancel: {
        label: "Keep file",
        onClick: () => toast.info("Deletion cancelled."),
      },
    }),
  );
  seq(() =>
    toast.warning("Logging you out in 30 s…", {
      duration: 30000,
      cancel: {
        label: "Stay logged in",
        onClick: () => toast.success("Session extended 30 min."),
      },
    }),
  );
  seq(() =>
    toast.error("Removing 48 items from cart", {
      cancel: { label: "Undo", onClick: () => toast.success("Cart restored!") },
    }),
  );
}

// ─── 8. Custom JSX Buttons ────────────────────────────────────────────────────
function customJsxButtons() {
  _seq = 0;
  seq(() =>
    toast("Item added to cart", {
      icon: <ShoppingCart className="size-4 text-emerald-400" />,
      action: (
        <button
          className="rounded-md bg-emerald-600 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-emerald-500"
          onClick={() => console.log("Checkout!")}
        >
          Checkout →
        </button>
      ),
      cancel: (
        <button
          className="rounded-md border border-neutral-700 px-3 py-1 text-xs text-neutral-400 transition-colors hover:bg-neutral-800"
          onClick={() => console.log("Keep shopping")}
        >
          Keep shopping
        </button>
      ),
    }),
  );
  seq(() =>
    toast.error("Delete 24 files?", {
      icon: <Trash2 className="size-4" />,
      description: "This cannot be undone.",
      action: (
        <button
          className="rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-red-500"
          onClick={() => console.log("Deleted")}
        >
          Delete
        </button>
      ),
      cancel: (
        <button
          className="rounded-md border border-neutral-700 px-3 py-1 text-xs text-neutral-400 transition-colors hover:bg-neutral-800"
          onClick={() => console.log("Kept")}
        >
          Cancel
        </button>
      ),
    }),
  );
}

// ─── 9. Loading → Success ─────────────────────────────────────────────────────
function loadingThenSuccess() {
  const id = toast.loading("Processing your request…");
  setTimeout(() => toast.success("Report is ready to download.", { id }), 2500);
}

// ─── 10. Loading → Error ──────────────────────────────────────────────────────
function loadingThenError() {
  const id = toast.loading("Verifying payment method…");
  setTimeout(
    () => toast.error("Card declined. Please try another.", { id }),
    2000,
  );
}

// ─── 11. Dismiss All ──────────────────────────────────────────────────────────
function dismissAll() {
  toast("Notification 1 — live");
  toast("Notification 2 — live");
  toast("Notification 3 — live");
  toast("Notification 4 — live");
  setTimeout(() => {
    toast.dismiss();
    toast.info("All cleared.", { duration: 2000 });
  }, 2500);
}

// ─── 12. Update in Place ──────────────────────────────────────────────────────
function updateInPlace() {
  const id = toast.loading("Starting deployment…");
  setTimeout(() => toast.loading("Installing dependencies…", { id }), 1200);
  setTimeout(() => toast.loading("Building for production…", { id }), 2400);
  setTimeout(() => toast.loading("Uploading to CDN…", { id }), 3600);
  setTimeout(
    () =>
      toast.success("Deployed to production 🚀", {
        id,
        description: "Live at myapp.vercel.app",
        duration: 6000,
      }),
    4800,
  );
}

// ─── 13. Custom Icons ─────────────────────────────────────────────────────────
function customIcons() {
  _seq = 0;
  [
    {
      icon: <Bell className="size-4 text-purple-400" />,
      msg: "3 new notifications",
    },
    {
      icon: <Star className="size-4 text-yellow-400" />,
      msg: "Review submitted — thank you!",
    },
    {
      icon: <Heart className="size-4 text-rose-400" />,
      msg: "Someone liked your post",
    },
    {
      icon: <MessageSquare className="size-4 text-sky-400" />,
      msg: "New comment on your article",
    },
    {
      icon: <Package className="size-4 text-orange-400" />,
      msg: "Order shipped — arrives Friday",
    },
    {
      icon: <Rocket className="size-4 text-indigo-400" />,
      msg: "Feature flag enabled for your account",
    },
  ].forEach(({ icon, msg }) => seq(() => toast(msg, { icon })));
}

// ─── 14. Auth Flows ───────────────────────────────────────────────────────────
function realWorldAuth() {
  _seq = 0;
  seq(() =>
    toast.success("Welcome back, Aryan 👋", {
      description: "Logged in from Bengaluru, IN.",
      icon: <User className="size-4" />,
    }),
  );
  seq(() =>
    toast("2FA enabled", {
      icon: <Lock className="size-4 text-green-400" />,
      description: "Your account is now more secure.",
    }),
  );
  seq(() =>
    toast.info("New device detected", {
      description: "MacBook Pro — Mumbai. Not you?",
      action: { label: "Review", onClick: () => console.log("Review") },
    }),
  );
}

// ─── 15. Network Events ───────────────────────────────────────────────────────
function realWorldNetwork() {
  _seq = 0;
  seq(() =>
    toast.error("You're offline", {
      icon: <WifiOff className="size-4" />,
      duration: Infinity,
      action: {
        label: "Try again",
        onClick: () =>
          toast.promise(new Promise((r) => setTimeout(r, 1500)), {
            loading: "Checking…",
            success: "Back online!",
            error: "Still offline.",
          }),
      },
    }),
  );
  seq(() =>
    toast("Draft saved automatically", {
      icon: <Save className="size-4 text-neutral-400" />,
      duration: 2000,
    }),
  );
}

// ─── 16. E-commerce ───────────────────────────────────────────────────────────
function realWorldEcommerce() {
  _seq = 0;
  seq(() =>
    toast.success("Pro plan activated 🎉", {
      description: "All premium features unlocked.",
      duration: 6000,
      action: { label: "Explore", onClick: () => console.log("Navigate") },
    }),
  );
  seq(() =>
    toast("Flash sale ends in 2 h", {
      icon: <Clock className="size-4 text-orange-400" />,
      description: "40% off — use code LAUNCH40.",
      action: { label: "Shop now", onClick: () => console.log("Shop") },
    }),
  );
  seq(() =>
    toast.success("Refund processed", {
      description: "$49 will appear in 3–5 business days.",
    }),
  );
}

// ─── 17. Collaboration ────────────────────────────────────────────────────────
function realWorldCollaboration() {
  _seq = 0;
  seq(() =>
    toast("Rahul started editing", {
      icon: <User className="size-4 text-blue-400" />,
      description: "Design tokens — components.json",
    }),
  );
  seq(() =>
    toast("Link copied", {
      icon: <Copy className="size-4 text-blue-400" />,
      duration: 2000,
    }),
  );
  seq(() =>
    toast("Share link generated", {
      description: "Anyone with the link can view.",
      icon: <Share2 className="size-4 text-violet-400" />,
      action: {
        label: "Copy link",
        onClick: () => toast("Copied!", { duration: 1500 }),
      },
    }),
  );
}

// ─── 18. Auto-Retry on Error ──────────────────────────────────────────────────
function errorWithRetry() {
  let attempts = 0;
  const tryFetch = () => {
    attempts++;
    toast.promise(
      new Promise<void>((res, rej) =>
        setTimeout(
          () =>
            attempts >= 3
              ? res()
              : rej(new Error(`Attempt ${attempts} failed`)),
          1500,
        ),
      ),
      {
        loading: `Attempt ${attempts} of 3…`,
        success: "Data fetched after retries!",
        error: (e) => 
          `${e.message} — ${attempts < 3 ? "Retrying automatically…" : "All retries exhausted."}`,
      },
    );
    if (attempts < 3) setTimeout(tryFetch, 1900);
  };
  tryFetch();
}

// ─── 19. Multi-step Signup ────────────────────────────────────────────────────
function multiStepSignup() {
  const id = toast.loading("Validating form data…");
  setTimeout(() => toast.loading("Creating your account…", { id }), 1600);
  setTimeout(() => toast.loading("Setting up your workspace…", { id }), 3200);
  setTimeout(() => toast.loading("Sending verification email…", { id }), 4800);
  setTimeout(
    () =>
      toast.success("Account created! Check your inbox. 🎉", {
        id,
        duration: 6000,
      }),
    6400,
  );
}

// ─── 20. Multi-step Checkout ──────────────────────────────────────────────────
function multiStepCheckout() {
  const id = toast.loading("Validating cart…");
  setTimeout(() => toast.loading("Processing payment…", { id }), 1400);
  setTimeout(() => toast.loading("Confirming with merchant…", { id }), 2800);
  setTimeout(
    () =>
      toast.success("Order confirmed! 📦", {
        id,
        description: "Confirmation sent to your email.",
        duration: 6000,
      }),
    4200,
  );
}

// ─── 21. Keyboard Shortcut Hint ───────────────────────────────────────────────
function keyboardHint() {
  _seq = 0;
  seq(() =>
    toast("Pro tip", {
      description: "Press ⌘K to open the command palette from anywhere.",
      icon: <span style={{ fontSize: 14 }}>⌨️</span>,
      duration: 6000,
      action: {
        label: "Got it",
        onClick: () => toast.success("Shortcut noted!", { duration: 1800 }),
      },
    }),
  );
  seq(() =>
    toast("Did you know?", {
      description: "⌘Z undoes your last bulk action across any table view.",
      icon: <span style={{ fontSize: 14 }}>💡</span>,
      duration: 6000,
    }),
  );
  seq(() =>
    toast.info("New shortcut available", {
      description: "⌘⇧P opens the AI assistant. Try it now.",
      duration: 5000,
      action: { label: "Try it", onClick: () => console.log("Open AI") },
    }),
  );
}

// ─── 22. Rate Limit & Quota ───────────────────────────────────────────────────
function rateLimitToasts() {
  _seq = 0;
  seq(() =>
    toast.warning("API rate limit — 80% used", {
      description: "8,000 of 10,000 requests consumed this minute.",
      icon: <Gauge className="size-4 text-amber-400" />,
      action: { label: "Upgrade plan", onClick: () => console.log("Upgrade") },
    }),
  );
  seq(() =>
    toast.error("Rate limit exceeded", {
      description: "Resets in 43 s. New requests are being queued.",
      icon: <Gauge className="size-4 text-red-400" />,
      duration: 8000,
    }),
  );
  seq(() =>
    toast.success("Quota refilled", {
      description: "10,000 fresh requests available. Resuming queue now.",
      icon: <Gauge className="size-4" />,
    }),
  );
}

// ─── 23. Background Job ───────────────────────────────────────────────────────
function backgroundJob() {
  const id = toast("Export started", {
    description: "We'll notify you when your CSV is ready.",
    icon: <FileDown className="size-4 text-blue-400" />,
    duration: Infinity,
  });
  setTimeout(() => toast.loading("Processing 14,203 rows…", { id }), 1800);
  setTimeout(
    () => toast.loading("Applying filters & transforms…", { id }),
    3600,
  );
  setTimeout(() => toast.loading("Compressing output file…", { id }), 5000);
  setTimeout(
    () =>
      toast.success("Export ready — 14,203 rows", {
        id,
        description: "report-2025-q1.csv · 2.4 MB",
        duration: Infinity,
        action: {
          label: "Download",
          onClick: () => console.log("Download CSV"),
        },
        cancel: { label: "Dismiss", onClick: () => toast.dismiss() },
      }),
    6400,
  );
}

// ─── 24. Onboarding Nudge ─────────────────────────────────────────────────────
function onboardingNudge() {
  _seq = 0;
  seq(() =>
    toast("Complete your profile", {
      description: "Add a photo and bio to get 3× more visibility.",
      icon: <UserCheck className="size-4 text-violet-400" />,
      duration: 8000,
      action: {
        label: "Complete now",
        onClick: () =>
          toast.success("Opening profile editor…", { duration: 2000 }),
      },
      cancel: { label: "Later", onClick: () => console.log("Snoozed") },
    }),
  );
  seq(() =>
    toast.info("Connect your first integration", {
      description: "Link GitHub to unlock automated deployments.",
      icon: <Plug className="size-4 text-blue-400" />,
      duration: 8000,
      action: {
        label: "Connect",
        onClick: () => console.log("Connect GitHub"),
      },
    }),
  );
  seq(() =>
    toast("You're on a 5-day streak! 🔥", {
      description: "Keep it up — 2 more days to unlock your Pro badge.",
      icon: <Trophy className="size-4 text-yellow-400" />,
      duration: 6000,
    }),
  );
}

// ─── Groups data ──────────────────────────────────────────────────────────────
const GROUPS = [
  {
    id: "01",
    label: "Basic Variants",
    tag: "core",
    tagColor: "#94a3b8",
    icon: Layers,
    desc: "The five building blocks every app needs — default, success, error, warning, info.",
    actions: [{ label: "Fire all 5", fn: basicVariants }],
  },
  {
    id: "02",
    label: "Rich Description",
    tag: "content",
    tagColor: "#60a5fa",
    icon: MessageSquare,
    desc: "Supporting text and contextual icons transform a dismissal into a genuine decision.",
    actions: [{ label: "Show", fn: withDescription }],
  },
  {
    id: "03",
    label: "Duration Control",
    tag: "timing",
    tagColor: "#fbbf24",
    icon: Clock,
    desc: "Flash, standard, sticky, extended — match toast lifetime to the urgency of the message.",
    actions: [{ label: "Show", fn: customDuration }],
  },
  {
    id: "04",
    label: "Promise Lifecycle",
    tag: "async",
    tagColor: "#a78bfa",
    icon: RefreshCw,
    desc: "One call manages loading → success | error automatically as your Promise resolves.",
    actions: [
      { label: "Simple callback", fn: promiseToast },
      { label: "With description", fn: promiseWithDescription },
    ],
  },
  {
    id: "05",
    label: "Action Buttons",
    tag: "interactive",
    tagColor: "#34d399",
    icon: Zap,
    desc: "Undo deletes. Retry failures. Update software. Inline CTAs keep users in flow.",
    actions: [{ label: "Show 3 patterns", fn: actionToasts }],
  },
  {
    id: "06",
    label: "Cancel Patterns",
    tag: "interactive",
    tagColor: "#34d399",
    icon: Shield,
    desc: "Abort destructive operations — deletion, logout, bulk remove — before they commit.",
    actions: [{ label: "Show", fn: cancelToasts }],
  },
  {
    id: "07",
    label: "Custom JSX",
    tag: "custom",
    tagColor: "#f472b6",
    icon: Code2,
    desc: "Full React in your action buttons — custom colours, icons, any markup you need.",
    actions: [{ label: "Show", fn: customJsxButtons }],
  },
  {
    id: "08",
    label: "Load → Success",
    tag: "control",
    tagColor: "#22d3ee",
    icon: RefreshCw,
    desc: "Capture a loading toast's id, then morph it to success when the async operation completes.",
    actions: [{ label: "Simulate", fn: loadingThenSuccess }],
  },
  {
    id: "09",
    label: "Load → Error",
    tag: "control",
    tagColor: "#22d3ee",
    icon: RefreshCw,
    desc: "Same id-based pattern resolved to an error state — payment decline, auth failure.",
    actions: [{ label: "Simulate", fn: loadingThenError }],
  },
  {
    id: "10",
    label: "Dismiss & Clear",
    tag: "control",
    tagColor: "#22d3ee",
    icon: Trash2,
    desc: "toast.dismiss() clears one or all — essential for cleanup on navigation or sign-out.",
    actions: [{ label: "Show then clear", fn: dismissAll }],
  },
  {
    id: "11",
    label: "Update in Place",
    tag: "control",
    tagColor: "#22d3ee",
    icon: Layers,
    desc: "Single id, five states — the cleanest way to render a multi-phase deployment pipeline.",
    actions: [{ label: "Deploy flow", fn: updateInPlace }],
  },
  {
    id: "12",
    label: "Custom Icons",
    tag: "visual",
    tagColor: "#facc15",
    icon: Sparkles,
    desc: "Replace default icons with Lucide, emoji, or any React node to match your brand language.",
    actions: [{ label: "Show 6 variants", fn: customIcons }],
  },
  {
    id: "13",
    label: "Auth Flows",
    tag: "scenario",
    tagColor: "#2dd4bf",
    icon: Lock,
    desc: "Login confirmation, 2FA enabled, suspicious device — auth UX that builds user trust.",
    actions: [{ label: "Simulate", fn: realWorldAuth }],
  },
  {
    id: "14",
    label: "Network Events",
    tag: "scenario",
    tagColor: "#2dd4bf",
    icon: WifiOff,
    desc: "Offline detection, autosave confirmation — graceful degradation that reassures users.",
    actions: [{ label: "Simulate", fn: realWorldNetwork }],
  },
  {
    id: "15",
    label: "E-commerce",
    tag: "scenario",
    tagColor: "#2dd4bf",
    icon: ShoppingCart,
    desc: "Plan upgrades, flash sales, refunds — the moments that drive revenue and reduce churn.",
    actions: [{ label: "Simulate", fn: realWorldEcommerce }],
  },
  {
    id: "16",
    label: "Collaboration",
    tag: "scenario",
    tagColor: "#2dd4bf",
    icon: Users,
    desc: "Co-editing presence, share links, clipboard confirm — Figma-style real-time feedback.",
    actions: [{ label: "Simulate", fn: realWorldCollaboration }],
  },
  {
    id: "17",
    label: "Auto-Retry",
    tag: "resilience",
    tagColor: "#f87171",
    icon: RefreshCw,
    desc: "Exponential backoff with attempt counters — production-grade error recovery pattern.",
    actions: [{ label: "Simulate 3 attempts", fn: errorWithRetry }],
  },
  {
    id: "18",
    label: "Multi-step Signup",
    tag: "flow",
    tagColor: "#818cf8",
    icon: User,
    desc: "Single loading toast walks through validation, creation, workspace setup, email delivery.",
    actions: [{ label: "Run signup", fn: multiStepSignup }],
  },
  {
    id: "19",
    label: "Checkout Pipeline",
    tag: "flow",
    tagColor: "#818cf8",
    icon: CreditCard,
    desc: "Cart → payment → merchant confirm → order confirmed. Four clean states, one toast id.",
    actions: [{ label: "Run checkout", fn: multiStepCheckout }],
  },
  {
    id: "20",
    label: "Settings Saved",
    tag: "utility",
    tagColor: "#fb923c",
    icon: Settings,
    desc: "Autosave confirmation with icon — the highest-frequency toast in any settings-heavy product.",
    actions: [
      {
        label: "Fire",
        fn: () =>
          toast.success("Preferences saved", {
            icon: <Settings className="size-4" />,
            description: "Changes applied across all devices.",
          }),
      },
    ],
  },
  {
    id: "21",
    label: "Keyboard Hints",
    tag: "ux",
    tagColor: "#c084fc",
    icon: Sparkles,
    desc: "Contextual shortcut discovery — surface ⌘K, ⌘Z, ⌘⇧P at the right moment to create power users.",
    actions: [{ label: "Show 3 hints", fn: keyboardHint }],
  },
  {
    id: "22",
    label: "Rate Limit & Quota",
    tag: "system",
    tagColor: "#fb923c",
    icon: Gauge,
    desc: "Warn at 80%, block at 100%, celebrate the refill — the full API quota UX lifecycle.",
    actions: [{ label: "Simulate cycle", fn: rateLimitToasts }],
  },
  {
    id: "23",
    label: "Background Job",
    tag: "async",
    tagColor: "#a78bfa",
    icon: FileDown,
    desc: "Long-running export: fire-and-forget, poll phases, sticky completion with download CTA.",
    actions: [{ label: "Start export", fn: backgroundJob }],
  },
  {
    id: "24",
    label: "Onboarding Nudge",
    tag: "ux",
    tagColor: "#c084fc",
    icon: UserCheck,
    desc: "Profile completion, integration prompts, streak rewards — toasts that turn new users into power users.",
    actions: [{ label: "Show nudges", fn: onboardingNudge }],
  },
] as const;

// ─── Scroll progress bar ──────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

// ─── Cursor glow ──────────────────────────────────────────────────────────────
function CursorGlow() {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const smoothX = useSpring(x, { stiffness: 60, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 60, damping: 30 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);

  return (
    <motion.div
      className="cursor-glow"
      style={{ left: smoothX, top: smoothY }}
    />
  );
}

// AnimatedCounter removed — stats section no longer used

// ─── Logo with language swap ──────────────────────────────────────────────────
function Logo() {
  const [isHindi, setIsHindi] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsHindi((prev) => !prev);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="logo"
      whileHover={{ x: 2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="logo-pip" />
      <div style={{ position: "relative", height: "14px", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={isHindi ? "hi" : "en"}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {isHindi ? "सोनर पैटर्न" : "sonner patterns"}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Magnetic button with ripple ──────────────────────────────────────────────
function MagneticButton({
  children,
  onClick,
  variant = "ghost",
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "ghost" | "primary";
}) {
  const [fired, setFired] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setFired(true);
      onClick();
      setTimeout(() => setFired(false), 700);

      // Ripple effect
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setTimeout(() => setRipple(null), 600);
      }
    },
    [onClick],
  );

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      whileTap={{ y: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className={
        variant === "primary"
          ? "btn-primary"
          : `btn-ghost ${fired ? "btn-fired" : ""}`
      }
      style={{ position: "relative", overflow: "hidden" }}
    >
      <AnimatePresence>
        {ripple && (
          <motion.span
            key={`${ripple.x}-${ripple.y}`}
            initial={{ scale: 0, opacity: 0.35 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
              borderRadius: "50%",
              background:
                variant === "primary"
                  ? "rgba(0,0,0,0.15)"
                  : "rgba(200,241,53,0.2)",
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>
      {fired && variant === "ghost" ? (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
        >
          <Check className="size-3" /> fired
        </motion.span>
      ) : (
        children
      )}
    </motion.button>
  );
}

// ─── Demo card with tilt + shine ──────────────────────────────────────────────
function DemoCard({
  group,
  index,
}: {
  group: (typeof GROUPS)[number];
  index: number;
}) {
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
      animate={
        inView ? { opacity: 1, y: 0 } : {}
      }
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
        <motion.div
          className="card-icon-wrap"
          style={{ "--tag-c": group.tagColor } as React.CSSProperties}
          whileHover={{ rotate: [0, -8, 8, -4, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="size-3.5" style={{ color: group.tagColor }} />
        </motion.div>
        <span className="card-id">{group.id}</span>
        <motion.span
          className="card-tag"
          style={{ color: group.tagColor, borderColor: group.tagColor + "30" }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {group.tag}
        </motion.span>
      </div>
      <h3 className="card-title">{group.label}</h3>
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

// ─── Reveal words ─────────────────────────────────────────────────────────────
function RevealWords({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {w}
        </motion.span>
      ))}
    </>
  );
}

// ─── Toast Preview (hero right panel) ────────────────────────────────────────
const PREVIEW_TOASTS = [
  {
    type: "success",
    title: "Deployment complete",
    desc: "v2.0 is now live on Vercel",
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
    desc: "Aryan and 2 others joined",
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

function ToastPreview() {
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

// ─── Copy button with slide-up animation ─────────────────────────────────────
function CopyButton() {
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

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ToastPlayground() {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState("all");
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => setMounted(true), []);

  // Nav scroll detection
  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const tags = ["all", ...Array.from(new Set(GROUPS.map((g) => g.tag)))];
  const filtered =
    filter === "all" ? [...GROUPS] : GROUPS.filter((g) => g.tag === filter);

  if (!mounted) return null;

  return (
    <>
      <ScrollProgress />
      <CursorGlow />

      <div className="page">
        <div className="wrap">
          {/* Nav */}
          <motion.nav
            className={`nav ${navScrolled ? "scrolled" : ""}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Logo />

            <div className="nav-right">
              <motion.a
                className="nav-pill"
                href="https://sonner.emilkowal.ski/"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ y: 0 }}
              >
                Docs ↗
              </motion.a>
              <motion.a
                className="nav-pill-star"
                href="https://github.com/iampankajghosh/sonner-patterns"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ y: 0 }}
              >
                <Star className="size-3" />
                Star on GitHub
              </motion.a>
            </div>
          </motion.nav>

          {/* Hero */}
          <section className="hero">
            {/* Left col */}
            <div>
              <motion.div
                className="eyebrow"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 1.5, delay: 1.5, repeat: Infinity, repeatDelay: 4 }}
                >
                  <Zap className="size-3" />
                </motion.div>
                24 patterns · zero guesswork · ship faster
              </motion.div>

              <h1 className="h1">
                <RevealWords text="Every toast" delay={0.25} />
                <br />
                <RevealWords text="pattern you'll" delay={0.4} />
                <br />
                <motion.em
                  initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.65,
                    delay: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  ever need.
                </motion.em>
              </h1>

              <motion.p
                className="hero-body"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
              >
                The complete reference for <strong>Sonner</strong> — the most
                precise React notification library. 24 battle-tested patterns
                spanning async pipelines, multi-step flows, real-world auth,
                e-commerce, and collaborative UX.{" "}
                <strong>Click any card to fire it live.</strong>
              </motion.p>

              <motion.div
                className="hero-row"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <MagneticButton variant="primary" onClick={basicVariants}>
                  <motion.div
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="size-4" />
                  </motion.div>
                  Fire first toast
                </MagneticButton>
                <span className="hero-note">
                  scroll to explore all 24 patterns →
                </span>
              </motion.div>
            </div>

            {/* Right col — live toast stack */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ToastPreview />
            </motion.div>
          </section>

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

          {/* Footer */}
          <motion.footer
            className="footer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="footer-l">
              Add{" "}
              <span
                style={{ color: "var(--accent2)", fontFamily: "var(--mono)" }}
              >
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
                />
                <span>Pankaj Ghosh</span>
              </a>
              <span>sonner.patterns · 2026</span>
            </div>
          </motion.footer>
        </div>
      </div>
    </>
  );
}
