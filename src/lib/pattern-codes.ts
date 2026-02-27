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
        title: "Standard Toast",
        description:
          "The simplest way to show a neutral message. No extra icons or bold colors.",
        code: `toast("A simple alert to keep you informed");`,
      },
      {
        title: "Success State",
        description:
          "Clear positive feedback. Used when a task is finished and everything went well.",
        code: `toast.success("Everything went according to plan");`,
      },
      {
        title: "Error State",
        description:
          "Immediate feedback for problems. Use this when a task fails or an error occurs.",
        code: `toast.error("Something went wrong on our end");`,
      },
      {
        title: "Warning State",
        description:
          "A gentle nudge when something needs attention but hasn't failed yet.",
        code: `toast.warning("Your session will expire soon");`,
      },
      {
        title: "Information State",
        description:
          "Passive updates. Great for letting people know about new versions or background news.",
        code: `toast.info("A new version is available for update");`,
      },
    ],
  },
  "02": {
    setup: `import { toast } from "sonner";\nimport { Mail, CreditCard, Upload } from "lucide-react";`,
    steps: [
      {
        title: "Detailed Descriptions",
        description:
          "Give your users more context by adding a second line of descriptive text.",
        code: `toast("Email has been sent", {
  description: "It should arrive in your inbox shortly.",
  icon: <Mail className="size-4 text-blue-400" />,
});`,
      },
      {
        title: "Rich Success Context",
        description:
          "Add specific details like transaction amounts or account numbers to build trust.",
        code: `toast.success("Payment was successful", {
  description: "$49 charged to your card ending in 4242.",
  icon: <CreditCard className="size-4" />,
});`,
      },
      {
        title: "Specific Error Context",
        description:
          "Help your users understand what went wrong and how they can fix it themselves.",
        code: `toast.error("File upload failed", {
  description: "The file you selected is too large to upload.",
  icon: <Upload className="size-4" />,
});`,
      },
    ],
  },
  "03": {
    setup: `import { toast } from "sonner";`,
    steps: [
      {
        title: "Quick Flash (1s)",
        description:
          "Fast feedback that gets out of the way almost immediately.",
        code: `toast("This message will disappear quickly", { duration: 1000 });`,
      },
      {
        title: "Sticky Messages",
        description:
          "Keep the message on screen until the user explicitly decides to close it.",
        code: `toast.info("This stays until you dismiss it", {
  duration: Infinity,
});`,
      },
      {
        title: "Extended Reading Time",
        description:
          "Give people more time to read a complex message before it closes.",
        code: `toast("Extended message time", {
  description: "Giving you more time to read this.",
  duration: 8000,
});`,
      },
    ],
  },
  "04": {
    setup: `import { toast } from "sonner";`,
    steps: [
      {
        title: "Auto Promise Handling",
        description:
          "Magically handle loading, success, and error states by connecting a promise.",
        code: `const uploadFile = async () => {
  return { name: "data.json" };
};

toast.promise(uploadFile(), {
  loading: "Starting your upload",
  success: (data) => \`\${data.name} was uploaded successfully\`,
  error: (err) => \`Upload failed because of a \${err.message}\`,
});`,
      },
      {
        title: "Simplified Promises",
        description:
          "Perfect for simple background tasks where you just need to show static results.",
        code: `toast.promise(syncWorkspace(), {
  loading: "Saving your changes",
  success: "Your workspace has been successfully synced.",
  error: "Connection issue prevented the sync.",
});`,
      },
    ],
  },
  "05": {
    setup: `import { toast } from "sonner";`,
    steps: [
      {
        title: "Undo Action",
        description:
          "Give your users a safety net by letting them reverse a destructive action.",
        code: `toast("Document deleted", {
  description: "You have 5 seconds to undo this action.",
  action: {
    label: "Undo",
    onClick: () => toast.success("Your document was restored"),
  },
});`,
      },
      {
        title: "Retry Support",
        description:
          "Help users recover from temporary issues with an easy way to try again.",
        code: `toast.error("Lost network connection", {
      action: {
        label: "Retry",
        onClick: () =>
          toast.promise(new Promise((r) => setTimeout(r, 1500)), {
            loading: "Trying to reconnect",
            success: "You are back online",
            error: "Still having trouble connecting",
          }),
      },
    });`,
      },
      {
        title: "Decision Actions",
        description:
          "Let users choose between two primary paths directly from the notification.",
        code: `toast("New update ready", {
  description: "Version 4.0 is now available for download.",
  action: {
    label: "Update now",
    onClick: () => startUpdate(),
  },
  cancel: {
    label: "Remind me",
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
        title: "Confirm and Cancel",
        description:
          "Always good to have a simple way to back out before a major change happens.",
        code: `toast("Deleting your file soon", {
  cancel: {
    label: "Keep it",
    onClick: () => toast.info("File was not deleted."),
  },
});`,
      },
      {
        title: "Timed Logouts",
        description:
          "Warn users of an upcoming session end and let them stay logged in.",
        code: `toast.warning("Logging you out in 30 seconds", {
  duration: 30000,
  cancel: {
    label: "Stay active",
    onClick: () => toast.success("Your session has been extended."),
  },
});`,
      },
    ],
  },
  "07": {
    setup: `import { toast } from "sonner";\nimport { ShoppingCart } from "lucide-react";`,
    steps: [
      {
        title: "Custom Interface Buttons",
        description:
          "Build your own button designs to match your branding perfectly.",
        code: `toast("Added to your cart", {
  icon: <ShoppingCart className="size-4" />,
  action: (
    <button
      className="bg-emerald-600 px-3 py-1 text-xs 
        font-semibold text-white rounded-md"
      onClick={() => goToCheckout()}
    >
      Check out
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
        title: "Capture References",
        description:
          "Save the ID of a loading toast so you can update its status later on.",
        code: `const id = toast.loading("Processing your request");`,
      },
      {
        title: "Manual Success Resolution",
        description:
          "Turn that captured loading reference into a success message.",
        code: `toast.success("Your report is ready to view.", { id });`,
      },
    ],
  },
  "09": {
    setup: `import { toast } from "sonner";`,
    steps: [
      {
        title: "Manual Error Handling",
        description:
          "Gracefully end a loading state with a specific error message.",
        code: `const id = toast.loading("Verifying your payment");

setTimeout(() => {
  toast.error("Payment method was declined.", { id });
}, 2000);
`,
      },
    ],
  },
  "10": {
    setup: `import { toast } from "sonner";`,
    steps: [
      {
        title: "Clear All Messages",
        description:
          "Reset the view by clearing all current notifications at once.",
        code: `toast.dismiss();`,
      },
      {
        title: "Specific Dismissal",
        description:
          "Remove just one specific message without affecting others.",
        code: `const id = toast("This will close soon");

toast.dismiss(id);`,
      },
    ],
  },
  "11": {
    setup: `import { toast } from "sonner";`,
    steps: [
      {
        title: "Live Updates",
        description:
          "Keep the user informed by changing the message of a single toast.",
        code: `const id = toast.loading("Starting the task");`,
      },
      {
        title: "Multi-Step Feedback",
        description:
          "Update the same message through different stages of a process.",
        code: `setTimeout(() => 
  toast.loading("Preparing environment", { id }), 1200);
setTimeout(() => 
  toast.loading("Building files", { id }), 2400);
setTimeout(() => 
  toast.loading("Finalizing setup", { id }), 3600);`,
      },
      {
        title: "Finish Flow",
        description:
          "Resolve the final stage into a permanent success or error alert.",
        code: `setTimeout(() =>
  toast.success("Ready for use", {
    id,
    description: "Everything is set up and live.",
    duration: 6000,
  }), 4800);`,
      },
    ],
  },
  "12": {
    setup: `import { toast } from "sonner";\nimport { Bell, Star, Heart } from "lucide-react";`,
    steps: [
      {
        title: "Themed Brand Icons",
        description:
          "Use your own graphics or brand icons for a more integrated feel.",
        code: `toast("New notifications waiting", {
  icon: <Bell className="size-4 text-purple-400" />,
});`,
      },
      {
        title: "Expressive Symbols",
        description:
          "Sometimes a simple symbol says more than a complex graphic.",
        code: `toast("Your package has arrived", {
  icon: "📦",
});`,
      },
    ],
  },
  "13": {
    setup: `import { toast } from "sonner";\nimport { User, Lock } from "lucide-react";`,
    steps: [
      {
        title: "Sign In Confirmation",
        description:
          "Make users feel welcome with a clear confirmation of their sign in.",
        code: `toast.success("Good to see you again", {
  description: "You have signed in successfully.",
  icon: <User className="size-4" />,
});`,
      },
      {
        title: "Security Settings",
        description:
          "Briefly confirm when new security measures have been enabled.",
        code: `toast("Security feature enabled", {
  icon: <Lock className="size-4 text-green-400" />,
  description: "Your account is now protected.",
});`,
      },
      {
        title: "Safety Alerts",
        description:
          "Keep users safe by alerting them about potential security issues.",
        code: `toast.info("Sign in from a new device", {
  description: "Was this you? Please review.",
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
        title: "Connection Status",
        description:
          "Inform users about their network status and give them options to reconnect.",
        code: `toast.error("Network is offline", {
  icon: <WifiOff className="size-4" />,
  duration: Infinity,
  action: {
    label: "Reconnect",
    onClick: () => checkStatus(),
  },
});`,
      },
      {
        title: "Automatic Saving",
        description:
          "Let people know their work is safe with quick, non-intrusive savings notifications.",
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
        title: "Plan Upgrades",
        description:
          "Celebrate successful plan changes and invite users to explore new perks.",
        code: `toast.success("Plan has been upgraded", {
  description: "You now have full access to pro features.",
  action: {
    label: "Explore",
    onClick: () => startExploring(),
  },
});`,
      },
      {
        title: "Limited Time Offers",
        description:
          "Politely nudge users toward current sales or special offers.",
        code: `toast("Limited time sale", {
  icon: "⏰",
  description: "Get 40 percent off your next order.",
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
        title: "Team Notifications",
        description:
          "Let people know when their teammates join or start interacting with files.",
        code: `toast("A teammate started editing", {
  icon: <User className="size-4 text-blue-400" />,
  description: "Working on the design files.",
});`,
      },
      {
        title: "Sharing Feedback",
        description:
          "Clear confirmation for abstract actions like creating or copying links.",
        code: `toast("Shared link is ready", {
  description: "Anyone with this link can view the files.",
  icon: <Share2 className="size-4 text-violet-400" />,
  action: {
    label: "Copy",
    onClick: () => {
      navigator.clipboard.writeText(url);
      toast("Copied", { duration: 1500 });
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
        title: "Smart Retry Loop",
        description:
          "Try an action multiple times automatically while keeping the user updated.",
        code: `let attempts = 0;

const tryFetch = () => {
  attempts++;
  toast.promise(
    fetchData(),
    {
      loading: \`Trying attempt \${attempts} of 3\`,
      success: "Final successful fetch",
      error: (e) => \`Attempt failed. Trying again automatically.\`,
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
        title: "Onboarding Sequence",
        description:
          "Guide new users through a complex sign-up flow on a single notification.",
        code: `const id = toast.loading("Checking your information");

setTimeout(() => 
  toast.loading("Creating your profile", { id }), 1600);

setTimeout(() => 
  toast.loading("Setting up workspace", { id }), 3200);

setTimeout(() => 
  toast.loading("Verifying email", { id }), 4800);

setTimeout(() =>
  toast.success("You are all set. Welcome aboard.", {
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
        title: "Pipeline Visualization",
        description:
          "Follow a multi-stage order or payment through to completion.",
        code: `const id = toast.loading("Checking your cart");

setTimeout(() => 
  toast.loading("Processing your payment", { id }), 1400);

setTimeout(() => 
  toast.loading("Confirming your order", { id }), 2800);

setTimeout(() =>
  toast.success("Your order is confirmed", {
    id,
    description: "A confirmation email is on its way.",
    duration: 6000,
  }), 4200);`,
      },
    ],
  },
  "20": {
    setup: `import { toast } from "sonner";\nimport { Settings } from "lucide-react";`,
    steps: [
      {
        title: "The Save Affinity",
        description:
          "The standard way to show that user preferences have been saved.",
        code: `toast.success("Settings saved", {
  icon: <Settings className="size-4" />,
  description: "Your preferences were updated successfully.",
});`,
      },
    ],
  },
  "21": {
    setup: `import { toast } from "sonner";\nimport { Zap } from "lucide-react";`,
    steps: [
      {
        title: "Product Guidance",
        description:
          "Help users discover more efficient ways to work by showing helpful tips.",
        code: `toast("Helpful tip", {
  description: "Use shortcuts to move through the app faster.",
  icon: <Zap className="size-4 text-yellow-400" />,
  duration: 8000,
  action: {
    label: "Show me",
    onClick: () => showShortcuts(),
  },
});`,
      },
    ],
  },
  "22": {
    setup: `import { toast } from "sonner";\nimport { Gauge } from "lucide-react";`,
    steps: [
      {
        title: "Usage Warnings",
        description:
          "Help users manage their plan by alerting them before limits are hit.",
        code: `toast.warning("Approaching your limit", {
  description: "You have used most of your requests for this hour.",
  icon: <Gauge className="size-4 text-amber-400" />,
  action: {
    label: "Manage plan",
    onClick: () => openBilling(),
  },
});`,
      },
      {
        title: "Limit Blockers",
        description:
          "Politely explain why an action is blocked due to hitting a limit.",
        code: `toast.error("Temporary limit reached", {
  description: "Please wait a moment before trying again.",
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
        title: "Background Operations",
        description:
          "Let users keep working while a heavy job runs in the background.",
        code: `const id = toast("Starting your export", {
  description: "We will let you know when it is ready.",
  icon: <FileDown className="size-4 text-blue-400" />,
  duration: Infinity,
});

setTimeout(() => 
  toast.loading("Processing your data", { id }), 1800);
setTimeout(() => 
  toast.loading("Preparing the file", { id }), 5000);

setTimeout(() =>
  toast.success("Export is complete", {
    id,
    description: "Your file is ready for download.",
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
        title: "Gradual Onboarding",
        description:
          "Gently encourage users to complete important setup steps.",
        code: `toast("Finish your profile", {
  description: "Adding your details helps others find you.",
  icon: <UserCheck className="size-4 text-violet-400" />,
  duration: 8000,
  action: {
    label: "Do it now",
    onClick: () => openSettings(),
  },
  cancel: {
    label: "Not now",
    onClick: () => snooze(),
  },
});`,
      },
      {
        title: "Integration Tips",
        description:
          "Suggest helpful integrations at the right moment to improve work flows.",
        code: `toast.info("Try an integration", {
  description: "Connect your favorite tools to save time.",
  icon: <Plug className="size-4 text-blue-500" />,
  action: {
    label: "Learn more",
    onClick: () => openIntegrations(),
  },
});`,
      },
    ],
  },
};
