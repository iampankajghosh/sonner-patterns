"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
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
    success: {
      title: "Sync complete",
      description: "All changes saved to the cloud.",
    },
    error: {
      title: "Sync failed",
      description: "Check your connection and retry.",
    },
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
        error: (e) => ({
          title: e.message,
          description:
            attempts < 3 ? "Retrying automatically…" : "All retries exhausted.",
        }),
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

// ─── Animated counter ─────────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Pulse button — scale only, zero layout shift ────────────────────────────
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
  return (
    <motion.button
      onClick={() => {
        setFired(true);
        onClick();
        setTimeout(() => setFired(false), 650);
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={
        variant === "primary"
          ? "btn-primary"
          : `btn-ghost${fired ? "btn-fired" : ""}`
      }
    >
      {fired && variant === "ghost" ? "✦ fired" : children}
    </motion.button>
  );
}

// ─── Demo card ────────────────────────────────────────────────────────────────
function DemoCard({
  group,
  index,
}: {
  group: (typeof GROUPS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = group.icon;
  return (
    <motion.div
      ref={ref}
      className="demo-card"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.32, delay: (index % 3) * 0.055 }}
    >
      <div className="card-top">
        <div
          className="card-icon-wrap"
          style={{ "--tag-c": group.tagColor } as React.CSSProperties}
        >
          <Icon className="size-3.5" style={{ color: group.tagColor }} />
        </div>
        <span className="card-id">{group.id}</span>
        <span
          className="card-tag"
          style={{ color: group.tagColor, borderColor: group.tagColor + "30" }}
        >
          {group.tag}
        </span>
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
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: delay + i * 0.07 }}
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
    title: "Deployment complete 🚀",
    desc: "myapp.vercel.app is live",
    action: "View site",
    delay: 0,
  },
  {
    type: "default",
    title: "Rahul started editing",
    desc: "components/Button.tsx",
    action: null,
    delay: 0.6,
  },
  {
    type: "error",
    title: "Build failed",
    desc: "TypeScript error on line 42",
    action: "See log",
    delay: 1.2,
  },
  {
    type: "warning",
    title: "Storage at 92%",
    desc: "15 GB quota almost reached",
    action: "Upgrade",
    delay: 1.8,
  },
  {
    type: "info",
    title: "v4.1.0 available",
    desc: "14 new components, 3 fixes",
    action: "Update",
    delay: 2.4,
  },
] as const;

const TYPE_ICONS: Record<string, React.ReactNode> = {
  success: (
    <svg
      className="tp-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 12A10 10 0 1 1 2 12a10 10 0 0 1 20 0z" />
      <path d="M8 12.5l2.5 2.5 5-6" />
    </svg>
  ),
  error: (
    <svg
      className="tp-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M15 9l-6 6M9 9l6 6" />
    </svg>
  ),
  warning: (
    <svg
      className="tp-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16v.5" />
    </svg>
  ),
  info: (
    <svg
      className="tp-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 11v5M12 8v.5" />
    </svg>
  ),
  default: (
    <svg
      className="tp-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
};

function ToastPreview() {
  const [progress, setProgress] = useState(0);

  // Loop a progress bar animation on the first card
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
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: t.delay + 0.4 }}
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

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ToastPlayground() {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState("all");
  useEffect(() => setMounted(true), []);
  const tags = ["all", ...Array.from(new Set(GROUPS.map((g) => g.tag)))];
  const filtered =
    filter === "all" ? [...GROUPS] : GROUPS.filter((g) => g.tag === filter);
  if (!mounted) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --bg:#0b0b0c;--surf:#131314;--border:rgba(255,255,255,0.07);--borderhi:rgba(255,255,255,0.13);
          --text:#ede9e3;--text2:#918e88;--text3:#4f4d4a;
          --accent:#c8f135;--accent2:#e2ff7a;--glow:rgba(200,241,53,0.12);
          --mono:'DM Mono',monospace;--sans:'DM Sans',sans-serif;--disp:'Playfair Display',serif;--r:10px;
        }
        body{background:var(--bg);color:var(--text);font-family:var(--sans);-webkit-font-smoothing:antialiased;overflow-x:hidden}

        /* grain */
        body::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:0.022;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:180px}

        .page{position:relative;min-height:100vh}
        .page::before{content:'';position:fixed;top:-220px;left:50%;transform:translateX(-50%);
          width:1000px;height:700px;
          background:radial-gradient(ellipse,rgba(200,241,53,0.045) 0%,transparent 68%);
          pointer-events:none;z-index:0}

        .wrap{position:relative;z-index:1;max-width:1160px;margin:0 auto;padding:0 36px}

        /* nav */
        .nav{display:flex;align-items:center;justify-content:space-between;padding:22px 0;border-bottom:1px solid var(--border)}
        .logo{font-family:var(--mono);font-size:12px;color:var(--text3);display:flex;align-items:center;gap:10px;letter-spacing:0.04em}
        .logo-pip{width:6px;height:6px;border-radius:50%;background:var(--accent);box-shadow:0 0 8px rgba(200,241,53,0.6)}
        .nav-right{display:flex;gap:8px}
        .nav-pill{font-family:var(--mono);font-size:11px;color:var(--text3);border:1px solid var(--border);
          background:none;padding:5px 14px;border-radius:999px;cursor:pointer;text-decoration:none;
          transition:all .15s;display:inline-block}
        .nav-pill:hover{color:var(--text2);border-color:var(--borderhi);background:var(--surf)}

        /* hero */
        .hero{padding:88px 0 64px;display:grid;grid-template-columns:1fr 420px;gap:64px;align-items:center;max-width:100%}
        @media(max-width:1000px){.hero{grid-template-columns:1fr;gap:56px}}
        .eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);
          font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);
          margin-bottom:32px;padding:6px 14px;border:1px solid rgba(200,241,53,0.22);border-radius:4px;background:var(--glow)}
        .h1{font-family:var(--disp);font-size:clamp(46px,6.5vw,86px);font-weight:900;
          line-height:1.0;letter-spacing:-0.025em;color:var(--text);margin-bottom:28px}
        .h1 em{font-style:italic;background:linear-gradient(120deg,var(--accent),var(--accent2));
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .hero-body{font-size:clamp(16px,1.8vw,19px);color:var(--text2);line-height:1.7;max-width:580px;margin-bottom:44px}
        .hero-body strong{color:var(--text);font-weight:600}
        .hero-row{display:flex;align-items:center;gap:20px;flex-wrap:wrap}
        .hero-note{font-family:var(--mono);font-size:12px;color:var(--text3)}

        /* buttons */
        .btn-primary{display:inline-flex;align-items:center;gap:8px;background:var(--accent);color:#fff;
          font-family:var(--sans);font-size:14px;font-weight:600;padding:12px 26px;border:none;
          border-radius:var(--r);cursor:pointer;letter-spacing:.01em;white-space:nowrap;
          color:#0b0b0c;box-shadow:0 0 28px var(--glow),0 2px 8px rgba(0,0,0,.35);transition:box-shadow .2s,background .2s}
        .btn-primary:hover{background:#d5f545;box-shadow:0 0 44px rgba(200,241,53,.28),0 4px 16px rgba(0,0,0,.4)}
        .btn-ghost{font-family:var(--mono);font-size:11px;font-weight:500;color:var(--text2);
          border:1px solid var(--borderhi);background:none;padding:7px 14px;border-radius:6px;
          cursor:pointer;transition:all .15s;white-space:nowrap;letter-spacing:0.02em}
        .btn-ghost:hover,.btn-fired{color:var(--accent)!important;border-color:rgba(200,241,53,.32)!important;background:var(--glow)!important}

        /* stats */
        .stats{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--border);
          border-radius:var(--r);overflow:hidden;background:var(--surf);margin:0 0 72px}
        .stat{padding:28px 24px;border-right:1px solid var(--border)}
        .stat:last-child{border-right:none}
        .stat-n{font-family:var(--disp);font-size:clamp(30px,3.5vw,44px);font-weight:700;line-height:1;
          display:block;margin-bottom:6px;
          background:linear-gradient(120deg,var(--text) 40%,var(--accent));
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .stat-l{font-family:var(--mono);font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:0.12em}

        /* install */
        .install{display:flex;align-items:stretch;border:1px solid var(--border);border-radius:var(--r);
          overflow:hidden;background:var(--surf);margin-bottom:72px}
        .install-lbl{font-family:var(--mono);font-size:10px;color:var(--text3);text-transform:uppercase;
          letter-spacing:0.12em;padding:18px 20px;border-right:1px solid var(--border);
          display:flex;align-items:center;white-space:nowrap}
        .install-cmd{font-family:var(--mono);font-size:14px;color:var(--accent2);
          padding:18px 24px;flex:1;display:flex;align-items:center;letter-spacing:0.02em}
        .install-copy{padding:12px 16px;border-left:1px solid var(--border);display:flex;align-items:center}

        /* section head */
        .sec-head{margin-bottom:36px}
        .sec-tag{font-family:var(--mono);font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:0.14em;margin-bottom:10px}
        .sec-h2{font-family:var(--disp);font-size:clamp(26px,3vw,38px);font-weight:700;line-height:1.1;color:var(--text)}
        .sec-h2 em{font-style:italic;color:var(--accent2)}

        /* filters */
        .filters{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:32px}
        .filter-lbl{font-family:var(--mono);font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:0.1em;margin-right:4px}
        .filter-btn{font-family:var(--mono);font-size:11px;color:var(--text3);border:1px solid var(--border);
          background:none;padding:4px 12px;border-radius:4px;cursor:pointer;transition:all .15s;letter-spacing:0.04em}
        .filter-btn:hover{color:var(--text2);border-color:var(--borderhi)}
        .filter-btn.on{color:var(--accent);border-color:rgba(200,241,53,.28);background:var(--glow)}

        /* grid */
        .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);
          border:1px solid var(--border);border-radius:var(--r);overflow:hidden;margin-bottom:100px}

        /* card */
        .demo-card{background:var(--bg);padding:26px 22px;display:flex;flex-direction:column;gap:12px;transition:background .22s,box-shadow .25s}
        .demo-card:hover{background:var(--surf);box-shadow:inset 0 0 0 1px rgba(200,241,53,0.12)}
        .card-top{display:flex;align-items:center;gap:10px}
        .card-icon-wrap{width:28px;height:28px;border-radius:7px;flex-shrink:0;display:flex;align-items:center;justify-content:center;
          background:color-mix(in srgb,var(--tag-c,#fff) 9%,transparent);
          border:1px solid color-mix(in srgb,var(--tag-c,#fff) 18%,transparent)}
        .card-id{font-family:var(--mono);font-size:10px;color:var(--text3);flex:1}
        .card-tag{font-family:var(--mono);font-size:9px;letter-spacing:0.08em;text-transform:uppercase;
          border:1px solid;padding:2px 7px;border-radius:3px;flex-shrink:0}
        .card-title{font-family:var(--sans);font-size:14px;font-weight:600;color:var(--text);line-height:1.3}
        .card-desc{font-family:var(--sans);font-size:12.5px;color:var(--text2);line-height:1.6;flex:1}
        .card-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:2px}

        /* toast preview */
        .toast-preview{position:relative;display:flex;flex-direction:column;gap:10px;padding:8px 0}
        .tp-label{font-family:var(--mono);font-size:10px;color:var(--text3);text-transform:uppercase;
          letter-spacing:0.12em;margin-bottom:4px;display:flex;align-items:center;gap:8px}
        .tp-label::before{content:'';display:inline-block;width:6px;height:6px;border-radius:50%;
          background:var(--accent);box-shadow:0 0 6px rgba(200,241,53,0.5)}
        .tp-card{background:var(--surf);border:1px solid var(--border);border-radius:10px;
          padding:14px 16px;display:flex;align-items:flex-start;gap:12px;
          box-shadow:0 4px 24px rgba(0,0,0,0.3)}
        .tp-card.success .tp-icon{color:#4ade80}
        .tp-card.error   .tp-icon{color:#f87171}
        .tp-card.warning .tp-icon{color:#fbbf24}
        .tp-card.info    .tp-icon{color:#60a5fa}
        .tp-card.default .tp-icon{color:var(--text2)}
        .tp-icon{flex-shrink:0;margin-top:1px}
        .tp-body{flex:1;min-width:0}
        .tp-title{font-family:var(--sans);font-size:13px;font-weight:600;color:var(--text);
          white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.3}
        .tp-desc{font-family:var(--sans);font-size:12px;color:var(--text2);margin-top:2px;
          white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.4}
        .tp-action{flex-shrink:0;font-family:var(--mono);font-size:10px;color:var(--accent);
          border:1px solid rgba(200,241,53,0.25);padding:3px 8px;border-radius:4px;
          background:rgba(200,241,53,0.06);white-space:nowrap}
        .tp-bar{height:2px;background:var(--border);border-radius:1px;margin-top:10px;overflow:hidden}
        .tp-bar-fill{height:100%;background:var(--accent);border-radius:1px;transform-origin:left}
        @media(max-width:1000px){.toast-preview{display:none}}

        /* footer */
        .footer{border-top:1px solid var(--border);padding:36px 0 56px;display:flex;align-items:flex-start;
          justify-content:space-between;flex-wrap:wrap;gap:16px}
        .footer-l{font-family:var(--mono);font-size:11px;color:var(--text3);line-height:1.9}
        .footer-l a{color:var(--text2);text-decoration:none}
        .footer-l a:hover{color:var(--accent)}
        .footer-r{font-family:var(--mono);font-size:11px;color:var(--text3)}

        /* responsive */
        @media(max-width:880px){.grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:520px){.grid{grid-template-columns:1fr}}
        @media(max-width:600px){
          .wrap{padding:0 20px}
          .hero{padding:56px 0 44px}
          .stats{grid-template-columns:repeat(2,1fr)}
          .stat:nth-child(2){border-right:none}
          .stat:nth-child(3){border-right:1px solid var(--border);border-top:1px solid var(--border)}
          .stat:nth-child(4){border-top:1px solid var(--border)}
          .nav-right{display:none}
          .install{flex-direction:column}
          .install-lbl{border-right:none;border-bottom:1px solid var(--border)}
          .install-copy{border-left:none;border-top:1px solid var(--border)}
        }
      `}</style>

      <div className="page">
        <div className="wrap">
          {/* Nav */}
          <motion.nav
            className="nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.38 }}
          >
            <div className="logo">
              <div className="logo-pip" />
              toast · playground
            </div>
            <div className="nav-right">
              <a
                className="nav-pill"
                href="https://sonner.emilkowalski.me/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sonner docs ↗
              </a>
              <a
                className="nav-pill"
                href="https://github.com/emilkowalski/sonner"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </motion.nav>

          {/* Hero */}
          <section className="hero">
            {/* Left col */}
            <div>
              <motion.div
                className="eyebrow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.38, delay: 0.12 }}
              >
                <Zap className="size-3" />
                24 patterns · zero guesswork · ship faster
              </motion.div>

              <h1 className="h1">
                <RevealWords text="Every toast" delay={0.2} />
                <br />
                <RevealWords text="pattern you'll" delay={0.34} />
                <br />
                <motion.em
                  initial={{ opacity: 0, filter: "blur(6px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.55, delay: 0.72 }}
                >
                  ever need.
                </motion.em>
              </h1>

              <motion.p
                className="hero-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.46, delay: 0.88 }}
              >
                The complete reference for <strong>Sonner</strong> — the most
                precise React notification library. 24 battle-tested patterns
                spanning async pipelines, multi-step flows, real-world auth,
                e-commerce, and collaborative UX.{" "}
                <strong>Click any card to fire it live.</strong>
              </motion.p>

              <motion.div
                className="hero-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.44, delay: 1.04 }}
              >
                <MagneticButton variant="primary" onClick={basicVariants}>
                  <Sparkles className="size-4" />
                  Fire first toast
                </MagneticButton>
                <span className="hero-note">
                  scroll to explore all 24 patterns →
                </span>
              </motion.div>
            </div>

            {/* Right col — live toast stack */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ToastPreview />
            </motion.div>
          </section>

          {/* Stats */}
          <motion.div
            className="stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.44, delay: 1.14 }}
          >
            {[
              { n: 24, s: "", l: "Unique patterns" },
              { n: 45, s: "+", l: "Live demos" },
              { n: 100, s: "%", l: "Copy-paste ready" },
              { n: 0, s: " deps", l: "Beyond sonner" },
            ].map((s, i) => (
              <div key={i} className="stat">
                <span className="stat-n">
                  <AnimatedCounter target={s.n} suffix={s.s} />
                </span>
                <div className="stat-l">{s.l}</div>
              </div>
            ))}
          </motion.div>

          {/* Install strip */}
          <motion.div
            className="install"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.24 }}
          >
            <span className="install-lbl">install</span>
            <code className="install-cmd">npm install sonner</code>
            <div className="install-copy">
              <MagneticButton
                variant="ghost"
                onClick={() => {
                  navigator.clipboard?.writeText("npm install sonner");
                  toast.success("Copied!", {
                    description: "Run in your project root.",
                    duration: 2000,
                  });
                }}
              >
                <Copy className="-mt-px mr-1.5 inline-block size-3" />
                Copy
              </MagneticButton>
            </div>
          </motion.div>

          {/* Section head */}
          <motion.div
            className="sec-head"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="sec-tag">// interactive playground</div>
            <h2 className="sec-h2">
              Click to fire. <em>Watch and learn.</em>
            </h2>
          </motion.div>

          {/* Filters */}
          <div className="filters">
            <span className="filter-lbl">filter:</span>
            {tags.map((t) => (
              <button
                key={t}
                className={`filter-btn${filter === t ? "on" : ""}`}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              className="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              {filtered.map((g, i) => (
                <DemoCard key={g.id} group={g} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <footer className="footer">
            <div className="footer-l">
              Add{" "}
              <span
                style={{ color: "var(--accent2)", fontFamily: "var(--mono)" }}
              >
                &lt;Toaster /&gt;
              </span>{" "}
              to your root layout to enable toasts site-wide.
              <br />
              Built on{" "}
              <a
                href="https://sonner.emilkowalski.me/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sonner
              </a>{" "}
              by{" "}
              <a
                href="https://twitter.com/emilkowalski_"
                target="_blank"
                rel="noopener noreferrer"
              >
                Emil Kowalski
              </a>
              . Wrapper &amp; playground by you.
            </div>
            <div className="footer-r">toast.playground · 2025</div>
          </footer>
        </div>
      </div>
    </>
  );
}
