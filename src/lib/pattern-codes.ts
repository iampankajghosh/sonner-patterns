export type PatternStep = {
  title: string;
  description: string;
  code: string;
};

export type PatternCode = {
  setup?: string;
  steps: PatternStep[];
};

export const PATTERN_CODES: Record<string, PatternCode> = {
  "01": {
    setup: `import { toast } from "sonner";`,
    steps: [
      {
        title: "Default toast",
        description: "A plain notification — no icon, no color. Use for neutral messages.",
        code: `toast("Default notification — simple and clean");`,
      },
      {
        title: "Success toast",
        description: "Green checkmark. Use after successful operations.",
        code: `toast.success("Operation completed successfully!");`,
      },
      {
        title: "Error toast",
        description: "Red alert. Use for failed operations.",
        code: `toast.error("Something went wrong. Please try again.");`,
      },
      {
        title: "Warning toast",
        description: "Amber caution. Use for time-sensitive or risky states.",
        code: `toast.warning("Your session expires in 5 minutes.");`,
      },
      {
        title: "Info toast",
        description: "Blue informational. Use for passive updates.",
        code: `toast.info("New update available — v3.2.0 is live");`,
      },
    ],
  },
  "02": {
    setup: `import { toast } from "sonner";\nimport { Mail, CreditCard, Upload } from "lucide-react";`,
    steps: [
      {
        title: "Toast with description & icon",
        description: "Add supporting text and a custom icon for richer context.",
        code: `toast("Email sent", {
  description: "Delivered to 3 recipients.",
  icon: <Mail className="size-4 text-blue-400" />,
});`,
      },
      {
        title: "Success with description",
        description: "Combine a success variant with structured detail.",
        code: `toast.success("Payment successful", {
  description: "₹4,999 charged to Visa ••4242.",
  icon: <CreditCard className="size-4" />,
});`,
      },
      {
        title: "Error with description",
        description: "Provide actionable context in error states.",
        code: `toast.error("Upload failed", {
  description: "File exceeds the 25 MB limit.",
  icon: <Upload className="size-4" />,
});`,
      },
    ],
  },
  "03": {
    setup: `import { toast } from "sonner";`,
    steps: [
      {
        title: "Flash duration (1s)",
        description: "Quick confirmations that shouldn't linger.",
        code: `toast("Flash — gone in 1 s", { duration: 1000 });`,
      },
      {
        title: "Sticky (infinite)",
        description: "Stays until manually dismissed. Use for critical info.",
        code: `toast.info("Sticky — stays until dismissed", {
  duration: Infinity,
});`,
      },
      {
        title: "Extended duration (8s)",
        description: "Longer display for complex messages.",
        code: `toast("Extended 8 s toast", {
  description: "Good for complex messages.",
  duration: 8000,
});`,
      },
    ],
  },
  "04": {
    setup: `import { toast } from "sonner";`,
    steps: [
      {
        title: "Promise toast",
        description: "Automatically transitions through loading → success/error based on Promise resolution.",
        code: `const uploadFile = async () => {
  // Your async operation
  return { name: "design-system.fig" };
};

toast.promise(uploadFile(), {
  loading: "Uploading your file…",
  success: (data) => \`\${data.name} uploaded!\`,
  error: (err) => \`Upload failed: \${err.message}\`,
});`,
      },
      {
        title: "Promise with simple messages",
        description: "Use plain strings when you don't need dynamic data.",
        code: `toast.promise(syncWorkspace(), {
  loading: "Syncing workspace…",
  success: "Sync complete — all changes saved.",
  error: "Sync failed — check your connection.",
});`,
      },
    ],
  },
  "05": {
    setup: `import { toast } from "sonner";`,
    steps: [
      {
        title: "Undo action",
        description: "Let users reverse destructive operations.",
        code: `toast("Message deleted", {
  description: "Undo within 5 s.",
  action: {
    label: "Undo",
    onClick: () => toast.success("Message restored!"),
  },
});`,
      },
      {
        title: "Retry action",
        description: "Offer instant retry on transient failures.",
        code: `toast.error("Connection lost", {
  action: {
    label: "Retry",
    onClick: () => reconnect(),
  },
});`,
      },
      {
        title: "Action + Cancel",
        description: "Two-button patterns for user choice.",
        code: `toast("New version available", {
  description: "v4.0 ships with 14 new components.",
  action: {
    label: "Update now",
    onClick: () => startUpdate(),
  },
  cancel: {
    label: "Later",
    onClick: () => snooze(),
  },
});`,
      },
    ],
  },
  "06": {
    setup: `import { toast } from "sonner";`,
    steps: [
      {
        title: "Cancel destructive action",
        description: "Give users a safety net before irreversible operations.",
        code: `toast("File scheduled for deletion", {
  cancel: {
    label: "Keep file",
    onClick: () => toast.info("Deletion cancelled."),
  },
});`,
      },
      {
        title: "Cancel with timer",
        description: "Combine cancel with extended duration for countdowns.",
        code: `toast.warning("Logging you out in 30 s…", {
  duration: 30000,
  cancel: {
    label: "Stay logged in",
    onClick: () => toast.success("Session extended."),
  },
});`,
      },
    ],
  },
  "07": {
    setup: `import { toast } from "sonner";\nimport { ShoppingCart } from "lucide-react";`,
    steps: [
      {
        title: "Custom JSX action buttons",
        description: "Pass full React elements for styled action/cancel buttons.",
        code: `toast("Item added to cart", {
  icon: <ShoppingCart className="size-4" />,
  action: (
    <button
      className="bg-emerald-600 px-3 py-1 text-xs 
        font-semibold text-white rounded-md"
      onClick={() => goToCheckout()}
    >
      Checkout →
    </button>
  ),
  cancel: (
    <button
      className="border border-neutral-700 px-3 py-1 
        text-xs text-neutral-400 rounded-md"
      onClick={() => keepShopping()}
    >
      Keep shopping
    </button>
  ),
});`,
      },
    ],
  },
  "08": {
    setup: `import { toast } from "sonner";`,
    steps: [
      {
        title: "Capture toast ID",
        description: "Create a loading toast and store its ID for later updates.",
        code: `const id = toast.loading("Processing your request…");`,
      },
      {
        title: "Update to success",
        description: "Replace the loading toast with a success message using the same ID.",
        code: `// After async operation completes
toast.success("Report is ready to download.", { id });`,
      },
    ],
  },
  "09": {
    setup: `import { toast } from "sonner";`,
    steps: [
      {
        title: "Loading → Error pattern",
        description: "Same ID-based approach, but resolving to an error state.",
        code: `const id = toast.loading("Verifying payment method…");

// When the operation fails
setTimeout(() => {
  toast.error("Card declined. Try another.", { id });
}, 2000);`,
      },
    ],
  },
  "10": {
    setup: `import { toast } from "sonner";`,
    steps: [
      {
        title: "Dismiss all toasts",
        description: "Clear every active toast. Essential for cleanup on navigation.",
        code: `// Dismiss all active toasts
toast.dismiss();`,
      },
      {
        title: "Dismiss specific toast",
        description: "Dismiss a single toast by its ID.",
        code: `const id = toast("Notification");

// Later, dismiss just this one
toast.dismiss(id);`,
      },
    ],
  },
  "11": {
    setup: `import { toast } from "sonner";`,
    steps: [
      {
        title: "Create initial loading toast",
        description: "Start with a loading state and capture the ID.",
        code: `const id = toast.loading("Starting deployment…");`,
      },
      {
        title: "Update through phases",
        description: "Replace the message at each stage using the same ID.",
        code: `setTimeout(() => 
  toast.loading("Installing dependencies…", { id }), 1200);
setTimeout(() => 
  toast.loading("Building for production…", { id }), 2400);
setTimeout(() => 
  toast.loading("Uploading to CDN…", { id }), 3600);`,
      },
      {
        title: "Final success state",
        description: "Resolve to success with a description.",
        code: `setTimeout(() =>
  toast.success("Deployed to production", {
    id,
    description: "Live at your-domain.com",
    duration: 6000,
  }), 4800);`,
      },
    ],
  },
  "12": {
    setup: `import { toast } from "sonner";\nimport { Bell, Star, Heart } from "lucide-react";`,
    steps: [
      {
        title: "Use Lucide icons",
        description: "Pass any React node as the icon prop.",
        code: `toast("3 new notifications", {
  icon: <Bell className="size-4 text-purple-400" />,
});`,
      },
      {
        title: "Use emoji",
        description: "Simple string emoji works as icons too.",
        code: `toast("Order shipped — arrives Friday", {
  icon: "📦",
});`,
      },
    ],
  },
  "13": {
    setup: `import { toast } from "sonner";\nimport { User, Lock } from "lucide-react";`,
    steps: [
      {
        title: "Login success",
        description: "Welcome the user with contextual details.",
        code: `toast.success("Welcome back, Pankaj 👋", {
  description: "Logged in from Bengaluru, IN.",
  icon: <User className="size-4" />,
});`,
      },
      {
        title: "2FA notification",
        description: "Confirm security settings changes.",
        code: `toast("2FA enabled", {
  icon: <Lock className="size-4 text-green-400" />,
  description: "Your account is now more secure.",
});`,
      },
      {
        title: "Suspicious device alert",
        description: "Actionable security notification.",
        code: `toast.info("New device detected", {
  description: "MacBook Pro — Mumbai. Not you?",
  action: {
    label: "Review",
    onClick: () => openSecuritySettings(),
  },
});`,
      },
    ],
  },
  "14": {
    setup: `import { toast } from "sonner";\nimport { WifiOff, Save } from "lucide-react";`,
    steps: [
      {
        title: "Offline detection",
        description: "Sticky offline toast with retry action.",
        code: `toast.error("You're offline", {
  icon: <WifiOff className="size-4" />,
  duration: Infinity,
  action: {
    label: "Try again",
    onClick: () => checkConnection(),
  },
});`,
      },
      {
        title: "Autosave confirmation",
        description: "Brief confirmation that fades quickly.",
        code: `toast("Draft saved automatically", {
  icon: <Save className="size-4" />,
  duration: 2000,
});`,
      },
    ],
  },
  "15": {
    setup: `import { toast } from "sonner";`,
    steps: [
      {
        title: "Plan upgrade",
        description: "Celebrate conversions with action to explore.",
        code: `toast.success("Pro plan activated", {
  description: "All premium features unlocked.",
  action: {
    label: "Explore",
    onClick: () => navigateToFeatures(),
  },
});`,
      },
      {
        title: "Flash sale with urgency",
        description: "Time-limited promotions with CTA.",
        code: `toast("Flash sale ends in 2 h", {
  icon: "⏰",
  description: "40% off — use code LAUNCH40.",
  action: {
    label: "Shop now",
    onClick: () => openStore(),
  },
});`,
      },
    ],
  },
  "16": {
    setup: `import { toast } from "sonner";\nimport { User, Share2 } from "lucide-react";`,
    steps: [
      {
        title: "Presence notification",
        description: "Show when collaborators start editing.",
        code: `toast("Pankaj started editing", {
  icon: <User className="size-4 text-blue-400" />,
  description: "Design tokens — components.json",
});`,
      },
      {
        title: "Share with copy action",
        description: "Generate share link with clipboard action.",
        code: `toast("Share link generated", {
  description: "Anyone with the link can view.",
  icon: <Share2 className="size-4 text-violet-400" />,
  action: {
    label: "Copy link",
    onClick: () => {
      navigator.clipboard.writeText(shareUrl);
      toast("Copied!", { duration: 1500 });
    },
  },
});`,
      },
    ],
  },
  "17": {
    setup: `import { toast } from "sonner";`,
    steps: [
      {
        title: "Auto-retry with backoff",
        description: "Implement exponential retry with attempt tracking.",
        code: `let attempts = 0;

const tryFetch = () => {
  attempts++;
  toast.promise(
    fetchData(), // your async operation
    {
      loading: \`Attempt \${attempts} of 3…\`,
      success: "Data fetched after retries!",
      error: (e) => \`\${e.message} — retrying…\`,
    }
  );
  if (attempts < 3) {
    setTimeout(tryFetch, 1900);
  }
};

tryFetch();`,
      },
    ],
  },
  "18": {
    setup: `import { toast } from "sonner";`,
    steps: [
      {
        title: "Multi-step with single toast ID",
        description: "Walk through validation, creation, setup, and confirmation — all on one toast.",
        code: `const id = toast.loading("Validating form data…");

setTimeout(() => 
  toast.loading("Creating your account…", { id }), 1600);

setTimeout(() => 
  toast.loading("Setting up workspace…", { id }), 3200);

setTimeout(() => 
  toast.loading("Sending verification email…", { id }), 4800);

setTimeout(() =>
  toast.success("Account created! Check inbox.", {
    id,
    duration: 6000,
  }), 6400);`,
      },
    ],
  },
  "19": {
    setup: `import { toast } from "sonner";`,
    steps: [
      {
        title: "Checkout pipeline",
        description: "Cart → payment → merchant → confirmed. Four states, one toast.",
        code: `const id = toast.loading("Validating cart…");

setTimeout(() => 
  toast.loading("Processing payment…", { id }), 1400);

setTimeout(() => 
  toast.loading("Confirming with merchant…", { id }), 2800);

setTimeout(() =>
  toast.success("Order confirmed", {
    id,
    description: "Confirmation sent to email.",
    duration: 6000,
  }), 4200);`,
      },
    ],
  },
  "20": {
    setup: `import { toast } from "sonner";\nimport { Settings } from "lucide-react";`,
    steps: [
      {
        title: "Settings autosave toast",
        description: "The highest-frequency toast in settings-heavy products.",
        code: `toast.success("Preferences saved", {
  icon: <Settings className="size-4" />,
  description: "Changes applied across all devices.",
});`,
      },
    ],
  },
  "21": {
    setup: `import { toast } from "sonner";\nimport { Zap, Sparkles } from "lucide-react";`,
    steps: [
      {
        title: "Shortcut discovery toast",
        description: "Surface keyboard shortcuts at the right moment.",
        code: `toast("Pro tip", {
  description: "Press ⌘K to open the command palette.",
  icon: <Zap className="size-4 text-purple-400" />,
  duration: 6000,
  action: {
    label: "Got it",
    onClick: () => toast.success("Shortcut noted!"),
  },
});`,
      },
    ],
  },
  "22": {
    setup: `import { toast } from "sonner";\nimport { Gauge } from "lucide-react";`,
    steps: [
      {
        title: "Warning at threshold",
        description: "Warn users before they hit API limits.",
        code: `toast.warning("API rate limit — 80% used", {
  description: "8,000 of 10,000 requests consumed.",
  icon: <Gauge className="size-4 text-amber-400" />,
  action: {
    label: "Upgrade plan",
    onClick: () => openBilling(),
  },
});`,
      },
      {
        title: "Limit exceeded",
        description: "Block with extended duration when exceeded.",
        code: `toast.error("Rate limit exceeded", {
  description: "Resets in 43 s. Requests queued.",
  icon: <Gauge className="size-4 text-red-400" />,
  duration: 8000,
});`,
      },
      {
        title: "Quota refilled",
        description: "Celebrate when capacity is restored.",
        code: `toast.success("Quota refilled", {
  description: "10,000 fresh requests available.",
});`,
      },
    ],
  },
  "23": {
    setup: `import { toast } from "sonner";\nimport { FileDown } from "lucide-react";`,
    steps: [
      {
        title: "Background job with polling",
        description: "Fire-and-forget with progressive status updates and a final CTA.",
        code: `const id = toast("Export started", {
  description: "We'll notify you when ready.",
  icon: <FileDown className="size-4 text-blue-400" />,
  duration: Infinity,
});

setTimeout(() => 
  toast.loading("Processing 14,203 rows…", { id }), 1800);
setTimeout(() => 
  toast.loading("Compressing output file…", { id }), 5000);

setTimeout(() =>
  toast.success("Export ready — 14,203 rows", {
    id,
    description: "report-2025-q1.csv · 2.4 MB",
    duration: Infinity,
    action: {
      label: "Download",
      onClick: () => downloadFile(),
    },
  }), 6400);`,
      },
    ],
  },
  "24": {
    setup: `import { toast } from "sonner";\nimport { UserCheck, Plug, Trophy } from "lucide-react";`,
    steps: [
      {
        title: "Profile completion nudge",
        description: "Prompt users to complete their setup with action + dismiss.",
        code: `toast("Complete your profile", {
  description: "Add a photo to get 3× more visibility.",
  icon: <UserCheck className="size-4 text-violet-400" />,
  duration: 8000,
  action: {
    label: "Complete now",
    onClick: () => openProfileEditor(),
  },
  cancel: {
    label: "Later",
    onClick: () => snooze(),
  },
});`,
      },
      {
        title: "Integration prompt",
        description: "Guide users toward key integrations.",
        code: `toast.info("Connect your first integration", {
  description: "Link GitHub for automated deploys.",
  icon: <Plug className="size-4 text-blue-400" />,
  action: {
    label: "Connect",
    onClick: () => connectGitHub(),
  },
});`,
      },
    ],
  },
};
