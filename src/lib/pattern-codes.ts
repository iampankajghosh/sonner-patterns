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
        title: "Default Toast",
        description:
          "A plain notification — no icon, no color. Use for neutral system messages.",
        code: `toast("Default notification — simple and clean");`,
      },
      {
        title: "Success Toast",
        description:
          "Green checkmark variant. Use for successful operations and confirmations.",
        code: `toast.success("Operation completed successfully!");`,
      },
      {
        title: "Error Toast",
        description:
          "Red alert variant. Use for failed operations, declines, or critical errors.",
        code: `toast.error("Something went wrong. Please try again.");`,
      },
      {
        title: "Warning Toast",
        description:
          "Amber caution variant. Use for time-sensitive or potentially risky states.",
        code: `toast.warning("Your session expires in 5 minutes.");`,
      },
      {
        title: "Info Toast",
        description:
          "Blue informational variant. Use for passive updates and neutral feedback.",
        code: `toast.info("New update available — v3.2.0 is live");`,
      },
    ],
  },
  "02": {
    setup: `import { toast } from "sonner";\nimport { Mail, CreditCard, Upload } from "lucide-react";`,
    steps: [
      {
        title: "Supporting Descriptions",
        description:
          "Add a secondary line of text to provide more detail without overwhelming the user.",
        code: `toast("Email sent", {
  description: "Delivered to 3 recipients.",
  icon: <Mail className="size-4 text-blue-400" />,
});`,
      },
      {
        title: "Rich Success Context",
        description:
          "Combine standard variants with structured detail for complex confirmations.",
        code: `toast.success("Payment successful", {
  description: "$49.00 charged to Visa ••4444.",
  icon: <CreditCard className="size-4" />,
});`,
      },
      {
        title: "Detailed Error State",
        description:
          "Provide actionable context in error states to help users self-correct.",
        code: `toast.error("Upload failed", {
  description: "File exceeds the 25MB limit.",
  icon: <Upload className="size-4" />,
});`,
      },
    ],
  },
  "03": {
    setup: `import { toast } from "sonner";`,
    steps: [
      {
        title: "Flash Duration (1s)",
        description:
          "Quick confirmations that vanish rapidly to minimize UI disruption.",
        code: `toast("Flash — gone in 1s", { duration: 1000 });`,
      },
      {
        title: "Sticky Notification",
        description:
          "Manual dismissal only. Essential for critical system alerts or must-read info.",
        code: `toast.info("Sticky — stays until dismissed", {
  duration: Infinity,
});`,
      },
      {
        title: "Extended Duration (8s)",
        description:
          "Extended display time for complex messages that require more reading time.",
        code: `toast("Extended 8s toast", {
  description: "Provides more time for complex messages.",
  duration: 8000,
});`,
      },
    ],
  },
  "04": {
    setup: `import { toast } from "sonner";`,
    steps: [
      {
        title: "Promise Lifecycle",
        description:
          "The most powerful pattern — manages loading, success, and error states in one call.",
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
        title: "Stateless Promise",
        description:
          "Use static strings when you don't need to reference returned data from the Promise.",
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
        title: "Undo Pattern",
        description:
          "A common UX pattern that allows users to reverse a destructive operation safely.",
        code: `toast("Message deleted", {
  description: "Undo within 5s.",
  action: {
    label: "Undo",
    onClick: () => toast.success("Message restored!"),
  },
});`,
      },
      {
        title: "Retry Action",
        description:
          "Offer an immediate way to re-trigger failed network or system requests.",
        code: `toast.error("Connection lost", {
  action: {
    label: "Retry",
    onClick: () => reconnect(),
  },
});`,
      },
      {
        title: "Primary & Secondary Actions",
        description:
          "Support complex choices by providing two distinct action buttons.",
        code: `toast("New version available", {
  description: "v4.0 ships with 14 new components.",
  action: {
    label: "Update Now",
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
        title: "Safe Deletion Pattern",
        description:
          "Provide a quick 'Keep' option for destructive flows to prevent accidents.",
        code: `toast("File scheduled for deletion", {
  cancel: {
    label: "Keep File",
    onClick: () => toast.info("Deletion cancelled."),
  },
});`,
      },
      {
        title: "Timed Cancellation",
        description:
          "Combine a cancel action with a long duration for 'scheduled' system events.",
        code: `toast.warning("Logging you out in 30s…", {
  duration: 30000,
  cancel: {
    label: "Stay Logged In",
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
        title: "Custom JSX Actions",
        description:
          "Pass full React components as actions to match your specific Design System styles.",
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
      Keep Shopping
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
        title: "Capture Toast Identity",
        description:
          "Manually trigger a loading state and capture its ID for precise control.",
        code: `const id = toast.loading("Processing your request…");`,
      },
      {
        title: "Manual Success Resolution",
        description:
          "Replace the original loading toast with success using the captured ID.",
        code: `// After async operation completes
toast.success("Report is ready to download.", { id });`,
      },
    ],
  },
  "09": {
    setup: `import { toast } from "sonner";`,
    steps: [
      {
        title: "Manual Error Resolution",
        description:
          "Gracefully resolve a pending operation into an explicit error state.",
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
        title: "Global Dismissal",
        description:
          "Wipe the entire notification stack. Use this on navigation or page transitions.",
        code: `// Dismiss all active toasts
toast.dismiss();`,
      },
      {
        title: "Targeted Dismissal",
        description:
          "Remove a specific notification without affecting the rest of the stack.",
        code: `const id = toast("Self-destructing message");

// Later, dismiss just this one
toast.dismiss(id);`,
      },
    ],
  },
  "11": {
    setup: `import { toast } from "sonner";`,
    steps: [
      {
        title: "Identity-Based Mutation",
        description:
          "Update the message string and metadata of a single toast multiple times.",
        code: `const id = toast.loading("Starting deployment…");`,
      },
      {
        title: "Progressive Phase Mapping",
        description:
          "Cycle through distinct technical phases while maintaining the same UI slot.",
        code: `setTimeout(() => 
  toast.loading("Installing dependencies…", { id }), 1200);
setTimeout(() => 
  toast.loading("Building for production…", { id }), 2400);
setTimeout(() => 
  toast.loading("Uploading to CDN…", { id }), 3600);`,
      },
      {
        title: "Terminal Resolution",
        description:
          "Resolve the final phase into a permanent success or error toast.",
        code: `setTimeout(() =>
  toast.success("Deployed to production", {
    id,
    description: "Live at your-app-v2.vercel.app",
    duration: 6000,
  }), 4800);`,
      },
    ],
  },
  "12": {
    setup: `import { toast } from "sonner";\nimport { Bell, Star, Heart } from "lucide-react";`,
    steps: [
      {
        title: "Brand-Aligned Icons",
        description:
          "Inject any Lucide icon or custom SVG to match your product's aesthetics.",
        code: `toast("3 new notifications", {
  icon: <Bell className="size-4 text-purple-400" />,
});`,
      },
      {
        title: "Emoji Expression",
        description:
          "Use simple strings or emojis for high-readability, zero-weight icons.",
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
        title: "Auth Success Context",
        description:
          "Reassure users by showing contextual data like location or username.",
        code: `toast.success("Welcome back!", {
  description: "Logged in from San Francisco, CA.",
  icon: <User className="size-4" />,
});`,
      },
      {
        title: "Two-Factor Confirmation",
        description:
          "Briefly confirm security setting changes after user interaction.",
        code: `toast("2FA enabled", {
  icon: <Lock className="size-4 text-green-400" />,
  description: "Your account is now more secure.",
});`,
      },
      {
        title: "Security Risk Alert",
        description:
          "Direct users to critical settings with prioritized action buttons.",
        code: `toast.info("New device detected", {
  description: "Unknown login — Mumbai, IN.",
  action: {
    label: "Review Settings",
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
        title: "Network Resilience",
        description:
          "Persistent notifications during disconnection with an 'Auto-Retry' intent.",
        code: `toast.error("You are currently offline", {
  icon: <WifiOff className="size-4" />,
  duration: Infinity,
  action: {
    label: "Reconnect",
    onClick: () => checkConnection(),
  },
});`,
      },
      {
        title: "Passive Affirmation",
        description:
          "Brief, non-disruptive confirmation that background tasks are succeeding.",
        code: `toast("Changes saved automatically", {
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
        title: "Conversion Celebration",
        description:
          "Mark successful transactions or upgrades with a high-visibility variant.",
        code: `toast.success("Pro Plan activated", {
  description: "All premium features are now live.",
  action: {
    label: "View Perks",
    onClick: () => navigateToFeatures(),
  },
});`,
      },
      {
        title: "Time-Sensitive CTA",
        description:
          "Create urgency and drive immediate action using emojis and specific codes.",
        code: `toast("Flash sale ends in 2h", {
  icon: "⏰",
  description: "40% off — use code FLASH40.",
  action: {
    label: "Shop Now",
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
        title: "Presence Awareness",
        description:
          "Surface team activity in real-time to prevent editing collisions.",
        code: `toast("Collaborator joined session", {
  icon: <User className="size-4 text-blue-400" />,
  description: "Now editing — index.css",
});`,
      },
      {
        title: "Clipboard Feedback",
        description:
          "Confirm abstract background actions like copying URLs to the clipboard.",
        code: `toast("Share link generated", {
  description: "Privacy set to: Public view.",
  icon: <Share2 className="size-4 text-violet-400" />,
  action: {
    label: "Copy Link",
    onClick: () => {
      navigator.clipboard.writeText(shareUrl);
      toast("Copied to clipboard!", { duration: 1500 });
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
        title: "Exponential Backoff Pattern",
        description:
          "Implement a sophisticated retry loop with progressive attempt tracking on a single toast.",
        code: `let attempts = 0;

const tryFetch = () => {
  attempts++;
  toast.promise(
    fetchData(),
    {
      loading: \`Attempt \${attempts} of 3…\`,
      success: "Successfully connected!",
      error: (e) => \`Attempt failed — retrying…\`,
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
        title: "Sequential Flow Management",
        description:
          "Map an entire user journey — from validation to delivery — onto a single toast Identity.",
        code: `const id = toast.loading("Validating account details…");

setTimeout(() => 
  toast.loading("Creating your user profile…", { id }), 1600);

setTimeout(() => 
  toast.loading("Provisioning workspace…", { id }), 3200);

setTimeout(() => 
  toast.loading("Sending verification email…", { id }), 4800);

setTimeout(() =>
  toast.success("Account ready! Welcome aboard.", {
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
        title: "The Pipeline Pattern",
        description:
          "Show real-time progress of a payment pipeline using state-morphing toasts.",
        code: `const id = toast.loading("Confirming order details…");

setTimeout(() => 
  toast.loading("Processing payment…", { id }), 1400);

setTimeout(() => 
  toast.loading("Securing merchant approval…", { id }), 2800);

setTimeout(() =>
  toast.success("Order confirmed", {
    id,
    description: "Digital receipt sent to email.",
    duration: 6000,
  }), 4200);`,
      },
    ],
  },
  "20": {
    setup: `import { toast } from "sonner";\nimport { Settings } from "lucide-react";`,
    steps: [
      {
        title: "The Save Pattern",
        description:
          "High-frequency, low-friction feedback designed for autosave-heavy interfaces.",
        code: `toast.success("Preferences saved", {
  icon: <Settings className="size-4" />,
  description: "Changes applied across all sessions.",
});`,
      },
    ],
  },
  "21": {
    setup: `import { toast } from "sonner";\nimport { Zap } from "lucide-react";`,
    steps: [
      {
        title: "Contextual Education",
        description:
          "Turn users into power users by surfacing keyboard hints at relevant moments.",
        code: `toast("Pro Tip", {
  description: "Hit ⌘K to open the Omni Search.",
  icon: <Zap className="size-4 text-yellow-400" />,
  duration: 8000,
  action: {
    label: "Try It Now",
    onClick: () => openOmniSearch(),
  },
});`,
      },
    ],
  },
  "22": {
    setup: `import { toast } from "sonner";\nimport { Gauge } from "lucide-react";`,
    steps: [
      {
        title: "System Threshold Alerts",
        description:
          "Warn users before they hit technical boundaries or API rate limits.",
        code: `toast.warning("API Quota — 80% used", {
  description: "16k operations remaining in cycle.",
  icon: <Gauge className="size-4 text-amber-400" />,
  action: {
    label: "Upgrade Plan",
    onClick: () => openBilling(),
  },
});`,
      },
      {
        title: "Hard Limit Response",
        description:
          "Block actions effectively when limits are hit, providing a 'refill' countdown.",
        code: `toast.error("Rate limit reached", {
  description: "Limit resets in 14s. Requests queued.",
  icon: <Gauge className="size-4 text-red-500" />,
  duration: 8000,
});`,
      },
    ],
  },
  "23": {
    setup: `import { toast } from "sonner";\nimport { FileDown } from "lucide-react";`,
    steps: [
      {
        title: "Fire-and-Forget Job Pattern",
        description:
          "Maintain UI focus while managing a long-running background export with a final CTA.",
        code: `const id = toast("Export started", {
  description: "We'll notify you when ready.",
  icon: <FileDown className="size-4 text-blue-400" />,
  duration: Infinity,
});

setTimeout(() => 
  toast.loading("Processing dataset rows…", { id }), 1800);
setTimeout(() => 
  toast.loading("Compressing CSV file…", { id }), 5000);

setTimeout(() =>
  toast.success("Export ready for download", {
    id,
    description: "report-fy25.csv · 2.4MB",
    duration: Infinity,
    action: {
      label: "Download",
      onClick: () => handleDownload(),
    },
  }), 6400);`,
      },
    ],
  },
  "24": {
    setup: `import { toast } from "sonner";\nimport { UserCheck, Plug } from "lucide-react";`,
    steps: [
      {
        title: "Progressive Onboarding",
        description:
          "Nudge users toward profile completion with low-friction action buttons.",
        code: `toast("Complete your profile", {
  description: "Add a photo to get 5x more reach.",
  icon: <UserCheck className="size-4 text-violet-400" />,
  duration: 8000,
  action: {
    label: "Add Photo",
    onClick: () => openPicker(),
  },
  cancel: {
    label: "Dismiss",
    onClick: () => snooze(),
  },
});`,
      },
      {
        title: "Ecosystem Growth Nudges",
        description:
          "Guide users toward key integrations at the most relevant moment.",
        code: `toast.info("Unleash the power of GitHub", {
  description: "Link accounts for one-click deploys.",
  icon: <Plug className="size-4 text-blue-500" />,
  action: {
    label: "Connect Now",
    onClick: () => connectGitHub(),
  },
});`,
      },
    ],
  },
};
