"use client";

import { toast } from "sonner";
import {
  Bell,
  Upload,
  Trash2,
  Mail,
  ShoppingCart,
  CreditCard,
  WifiOff,
  Save,
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
  Clock,
  Gauge,
  FileDown,
  UserCheck,
  Plug,
  Trophy,
  Zap,
  Sparkles,
} from "lucide-react";

// ─── Sequencer ────────────────────────────────────────────────────────────────
let _seq = 0;
const seq = (fn: () => void, delay = 0) => setTimeout(fn, _seq++ * 380 + delay);

// ─── 1. Basic Variants ────────────────────────────────────────────────────────
export function basicVariants() {
  _seq = 0;
  seq(() => toast("Default notification — simple and clean"));
  seq(() => toast.success("Operation completed successfully!"));
  seq(() => toast.error("Something went wrong. Please try again."));
  seq(() => toast.warning("Your session expires in 5 minutes."));
  seq(() => toast.info("New update available — v3.2.0 is live"));
}

// ─── 2. Rich Description + Icon ───────────────────────────────────────────────
export function withDescription() {
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
export function customDuration() {
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
export function promiseToast() {
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
export function promiseWithDescription() {
  toast.promise(new Promise<void>((r) => setTimeout(r, 2500)), {
    loading: "Syncing workspace…",
    success: "Sync complete — all changes saved to the cloud.",
    error: "Sync failed — check your connection and retry.",
  });
}

// ─── 6. Action Buttons ────────────────────────────────────────────────────────
export function actionToasts() {
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
export function cancelToasts() {
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
export function customJsxButtons() {
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
export function loadingThenSuccess() {
  const id = toast.loading("Processing your request…");
  setTimeout(() => toast.success("Report is ready to download.", { id }), 2500);
}

// ─── 10. Loading → Error ──────────────────────────────────────────────────────
export function loadingThenError() {
  const id = toast.loading("Verifying payment method…");
  setTimeout(
    () => toast.error("Card declined. Please try another.", { id }),
    2000,
  );
}

// ─── 11. Dismiss All ──────────────────────────────────────────────────────────
export function dismissAll() {
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
export function updateInPlace() {
  const id = toast.loading("Starting deployment…");
  setTimeout(() => toast.loading("Installing dependencies…", { id }), 1200);
  setTimeout(() => toast.loading("Building for production…", { id }), 2400);
  setTimeout(() => toast.loading("Uploading to CDN…", { id }), 3600);
  setTimeout(
    () =>
      toast.success("Deployed to production", {
        id,
        description: "Live at deployment.pankajghosh.in",
        duration: 6000,
      }),
    4800,
  );
}

// ─── 13. Custom Icons ─────────────────────────────────────────────────────────
export function customIcons() {
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
export function realWorldAuth() {
  _seq = 0;
  seq(() =>
    toast.success("Welcome back, Pankaj 👋", {
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
export function realWorldNetwork() {
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
export function realWorldEcommerce() {
  _seq = 0;
  seq(() =>
    toast.success("Pro plan activated", {
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
export function realWorldCollaboration() {
  _seq = 0;
  seq(() =>
    toast("Pankaj started editing", {
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
export function errorWithRetry() {
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
export function multiStepSignup() {
  const id = toast.loading("Validating form data…");
  setTimeout(() => toast.loading("Creating your account…", { id }), 1600);
  setTimeout(() => toast.loading("Setting up your workspace…", { id }), 3200);
  setTimeout(() => toast.loading("Sending verification email…", { id }), 4800);
  setTimeout(
    () =>
      toast.success("Account created! Check your inbox.", {
        id,
        duration: 6000,
      }),
    6400,
  );
}

// ─── 20. Multi-step Checkout ──────────────────────────────────────────────────
export function multiStepCheckout() {
  const id = toast.loading("Validating cart…");
  setTimeout(() => toast.loading("Processing payment…", { id }), 1400);
  setTimeout(() => toast.loading("Confirming with merchant…", { id }), 2800);
  setTimeout(
    () =>
      toast.success("Order confirmed", {
        id,
        description: "Confirmation sent to your email.",
        duration: 6000,
      }),
    4200,
  );
}

// ─── 21. Keyboard Shortcut Hint ───────────────────────────────────────────────
export function keyboardHint() {
  _seq = 0;
  seq(() =>
    toast("Pro tip", {
      description: "Press ⌘K to open the command palette from anywhere.",
      icon: <Zap className="size-4 text-purple-400" />,
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
      icon: <Sparkles className="size-4 text-yellow-400" />,
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
export function rateLimitToasts() {
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
export function backgroundJob() {
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
export function onboardingNudge() {
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

// ─── 25. Settings Saved ─────────────────────────────────────────────────────
export function settingsSaved() {
  toast.success("Preferences saved", {
    icon: <Settings className="size-4" />,
    description: "Changes applied across all devices.",
  });
}
