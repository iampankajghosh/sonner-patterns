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

let _seq = 0;
const seq = (fn: () => void, delay = 0) => setTimeout(fn, _seq++ * 380 + delay);

export function basicVariants() {
  _seq = 0;
  seq(() => toast("Simple alert to keep you informed"));
  seq(() => toast.success("Everything went according to plan"));
  seq(() => toast.error("Something went wrong on our end"));
  seq(() => toast.warning("Your session will expire soon"));
  seq(() => toast.info("A new version is available for update"));
}

export function withDescription() {
  _seq = 0;
  seq(() =>
    toast("Email has been sent", {
      description: "It should arrive in your inbox shortly.",
      icon: <Mail className="size-4 text-blue-400" />,
    }),
  );
  seq(() =>
    toast.success("Payment was successful", {
      description: "$49 charged to your card ending in 4242.",
      icon: <CreditCard className="size-4" />,
    }),
  );
  seq(() =>
    toast.error("File upload failed", {
      description: "The file you selected is too large to upload.",
      icon: <Upload className="size-4" />,
    }),
  );
  seq(() =>
    toast.warning("Storage is almost full", {
      description: "You have used most of your available space.",
    }),
  );
}

export function customDuration() {
  _seq = 0;
  seq(() => toast("This message will disappear quickly", { duration: 1000 }));
  seq(() =>
    toast.info("This stays until you dismiss it", { duration: Infinity }),
  );
  seq(() =>
    toast.success("Standard time on screen", {
      description: "Will close automatically in 4 seconds.",
    }),
  );
  seq(() =>
    toast("Extended message time", {
      description: "Giving you more time to read this.",
      duration: 8000,
    }),
  );
}

export function promiseToast() {
  const fakeUpload = (): Promise<{ name: string }> =>
    new Promise((res, rej) =>
      setTimeout(
        () =>
          Math.random() > 0.3
            ? res({ name: "data.json" })
            : rej(new Error("Connection lost")),
        2200,
      ),
    );
  toast.promise(fakeUpload(), {
    loading: "Starting your upload",
    success: (d) => `${d.name} was uploaded successfully`,
    error: (e) => `Upload failed because of a ${e.message}`,
  });
}

export function promiseWithDescription() {
  toast.promise(new Promise<void>((r) => setTimeout(r, 2500)), {
    loading: "Saving your changes",
    success: "Your workspace has been successfully synced.",
    error: "Connection issue prevented the sync.",
  });
}

export function actionToasts() {
  _seq = 0;
  seq(() =>
    toast("Document deleted", {
      description: "You have 5 seconds to undo this action.",
      action: {
        label: "Undo",
        onClick: () => toast.success("Your document was restored"),
      },
    }),
  );
  seq(() =>
    toast.error("Lost network connection", {
      action: {
        label: "Retry",
        onClick: () =>
          toast.promise(new Promise((r) => setTimeout(r, 1500)), {
            loading: "Trying to reconnect",
            success: "You are back online",
            error: "Still having trouble connecting",
          }),
      },
    }),
  );
  seq(() =>
    toast("New update ready", {
      description: "Version 4.0 is now available for download.",
      action: { label: "Update now", onClick: () => console.log("Updating") },
      cancel: { label: "Remind me", onClick: () => console.log("Snoozed") },
    }),
  );
}

export function cancelToasts() {
  _seq = 0;
  seq(() =>
    toast("Deleting your file soon", {
      cancel: {
        label: "Keep it",
        onClick: () => toast.info("File was not deleted."),
      },
    }),
  );
  seq(() =>
    toast.warning("Logging you out in 30 seconds", {
      duration: 30000,
      cancel: {
        label: "Stay active",
        onClick: () => toast.success("Your session has been extended."),
      },
    }),
  );
  seq(() =>
    toast.error("Clearing your shopping cart", {
      cancel: { label: "Undo", onClick: () => toast.success("Cart is back") },
    }),
  );
}

export function customJsxButtons() {
  _seq = 0;
  seq(() =>
    toast("Added to your cart", {
      icon: <ShoppingCart className="size-4 text-emerald-400" />,
      action: (
        <button
          className="rounded-md bg-emerald-600 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-emerald-500"
          onClick={() => console.log("Checkout")}
        >
          Check out
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
    toast.error("Delete these files?", {
      icon: <Trash2 className="size-4" />,
      description: "This action cannot be undone.",
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
          onClick={() => console.log("No")}
        >
          No
        </button>
      ),
    }),
  );
}

export function loadingThenSuccess() {
  const id = toast.loading("Processing your request");
  setTimeout(
    () => toast.success("Your report is ready to view.", { id }),
    2500,
  );
}

export function loadingThenError() {
  const id = toast.loading("Verifying your payment");
  setTimeout(() => toast.error("Payment method was declined.", { id }), 2000);
}

export function dismissAll() {
  toast("First update");
  toast("Second update");
  toast("Third update");
  toast("Fourth update");
  setTimeout(() => {
    toast.dismiss();
    toast.info("All messages cleared", { duration: 2000 });
  }, 2500);
}

export function updateInPlace() {
  const id = toast.loading("Starting the task");
  setTimeout(() => toast.loading("Preparing environment", { id }), 1200);
  setTimeout(() => toast.loading("Building files", { id }), 2400);
  setTimeout(() => toast.loading("Finalizing setup", { id }), 3600);
  setTimeout(
    () =>
      toast.success("Ready for use", {
        id,
        description: "Everything is set up and live.",
        duration: 6000,
      }),
    4800,
  );
}

export function customIcons() {
  _seq = 0;
  [
    {
      icon: <Bell className="size-4 text-purple-400" />,
      msg: "New notifications waiting",
    },
    {
      icon: <Star className="size-4 text-yellow-400" />,
      msg: "Thank you for the review",
    },
    {
      icon: <Heart className="size-4 text-rose-400" />,
      msg: "Someone liked your update",
    },
    {
      icon: <MessageSquare className="size-4 text-sky-400" />,
      msg: "New comment on your post",
    },
    {
      icon: <Package className="size-4 text-orange-400" />,
      msg: "Your order is on the way",
    },
    {
      icon: <Rocket className="size-4 text-indigo-400" />,
      msg: "New features are enabled",
    },
  ].forEach(({ icon, msg }) => seq(() => toast(msg, { icon })));
}

export function realWorldAuth() {
  _seq = 0;
  seq(() =>
    toast.success("Good to see you again", {
      description: "You have signed in successfully.",
      icon: <User className="size-4" />,
    }),
  );
  seq(() =>
    toast("Security feature enabled", {
      icon: <Lock className="size-4 text-green-400" />,
      description: "Your account is now protected.",
    }),
  );
  seq(() =>
    toast.info("Sign in from a new device", {
      description: "Was this you? Please review.",
      action: { label: "Review", onClick: () => console.log("Review") },
    }),
  );
}

export function realWorldNetwork() {
  _seq = 0;
  seq(() =>
    toast.error("Network is offline", {
      icon: <WifiOff className="size-4" />,
      duration: Infinity,
      action: {
        label: "Reconnect",
        onClick: () =>
          toast.promise(new Promise((r) => setTimeout(r, 1500)), {
            loading: "Checking status",
            success: "Online again",
            error: "Still offline",
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

export function realWorldEcommerce() {
  _seq = 0;
  seq(() =>
    toast.success("Plan has been upgraded", {
      description: "You now have full access to pro features.",
      duration: 6000,
      action: { label: "Explore", onClick: () => console.log("Explore") },
    }),
  );
  seq(() =>
    toast("Limited time sale", {
      icon: <Clock className="size-4 text-orange-400" />,
      description: "Get 40 percent off your next order.",
      action: { label: "Shop", onClick: () => console.log("Shop") },
    }),
  );
  seq(() =>
    toast.success("Refund is being processed", {
      description: "Expect to see it in your account soon.",
    }),
  );
}

export function realWorldCollaboration() {
  _seq = 0;
  seq(() =>
    toast("A teammate started editing", {
      icon: <User className="size-4 text-blue-400" />,
      description: "Working on the design files.",
    }),
  );
  seq(() =>
    toast("Link has been copied", {
      icon: <Copy className="size-4 text-blue-400" />,
      duration: 2000,
    }),
  );
  seq(() =>
    toast("Shared link is ready", {
      description: "Anyone with this link can view the files.",
      icon: <Share2 className="size-4 text-violet-400" />,
      action: {
        label: "Copy",
        onClick: () => toast("Copied", { duration: 1500 }),
      },
    }),
  );
}

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
        loading: `Trying attempt ${attempts} of 3`,
        success: "Final successful fetch",
        error: (e) =>
          `${e.message}. ${attempts < 3 ? "Trying again automatically." : "All attempts failed."}`,
      },
    );
    if (attempts < 3) setTimeout(tryFetch, 1900);
  };
  tryFetch();
}

export function multiStepSignup() {
  const id = toast.loading("Checking your information");
  setTimeout(() => toast.loading("Creating your profile", { id }), 1600);
  setTimeout(() => toast.loading("Setting up workspace", { id }), 3200);
  setTimeout(() => toast.loading("Verifying email", { id }), 4800);
  setTimeout(
    () =>
      toast.success("You are all set. Welcome aboard.", {
        id,
        duration: 6000,
      }),
    6400,
  );
}

export function multiStepCheckout() {
  const id = toast.loading("Checking your cart");
  setTimeout(() => toast.loading("Processing your payment", { id }), 1400);
  setTimeout(() => toast.loading("Confirming your order", { id }), 2800);
  setTimeout(
    () =>
      toast.success("Your order is confirmed", {
        id,
        description: "A confirmation email is on its way.",
        duration: 6000,
      }),
    4200,
  );
}

export function keyboardHint() {
  _seq = 0;
  seq(() =>
    toast("Helpful tip", {
      description: "Use shortcuts to move through the app faster.",
      icon: <Zap className="size-4 text-purple-400" />,
      duration: 6000,
      action: {
        label: "I see",
        onClick: () => toast.success("Note taken", { duration: 1800 }),
      },
    }),
  );
  seq(() =>
    toast("Workflow tip", {
      description: "You can undo your last action from the edit menu.",
      icon: <Sparkles className="size-4 text-yellow-400" />,
      duration: 6000,
    }),
  );
  seq(() =>
    toast.info("Special shortcut", {
      description: "Quickly access your dashboard with a key press.",
      duration: 5000,
      action: { label: "Show me", onClick: () => console.log("Show") },
    }),
  );
}

export function rateLimitToasts() {
  _seq = 0;
  seq(() =>
    toast.warning("Approaching your limit", {
      description: "You have used most of your requests for this hour.",
      icon: <Gauge className="size-4 text-amber-400" />,
      action: { label: "Manage plan", onClick: () => console.log("Manage") },
    }),
  );
  seq(() =>
    toast.error("Temporary limit reached", {
      description: "Please wait a moment before trying again.",
      icon: <Gauge className="size-4 text-red-400" />,
      duration: 8000,
    }),
  );
  seq(() =>
    toast.success("Limits have reset", {
      description: "You can now continue your work without issue.",
      icon: <Gauge className="size-4" />,
    }),
  );
}

export function backgroundJob() {
  const id = toast("Starting your export", {
    description: "We will let you know when it is ready.",
    icon: <FileDown className="size-4 text-blue-400" />,
    duration: Infinity,
  });
  setTimeout(() => toast.loading("Processing your data", { id }), 1800);
  setTimeout(() => toast.loading("Preparing the file", { id }), 3600);
  setTimeout(() => toast.loading("Wrapping up", { id }), 5000);
  setTimeout(
    () =>
      toast.success("Export is complete", {
        id,
        description: "Your file is ready for download.",
        duration: Infinity,
        action: {
          label: "Download",
          onClick: () => console.log("Download"),
        },
        cancel: { label: "Close", onClick: () => toast.dismiss() },
      }),
    6400,
  );
}

export function onboardingNudge() {
  _seq = 0;
  seq(() =>
    toast("Finish your profile", {
      description: "Adding your details helps others find you.",
      icon: <UserCheck className="size-4 text-violet-400" />,
      duration: 8000,
      action: {
        label: "Do it now",
        onClick: () => toast.success("Opening settings", { duration: 2000 }),
      },
      cancel: { label: "Not now", onClick: () => console.log("No") },
    }),
  );
  seq(() =>
    toast.info("Try an integration", {
      description: "Connect your favorite tools to save time.",
      icon: <Plug className="size-4 text-blue-400" />,
      duration: 8000,
      action: {
        label: "Check them out",
        onClick: () => console.log("Integrations"),
      },
    }),
  );
  seq(() =>
    toast("You are doing great", {
      description: "Keep using the app to unlock more features.",
      icon: <Trophy className="size-4 text-yellow-400" />,
      duration: 6000,
    }),
  );
}

export function settingsSaved() {
  toast.success("Settings saved", {
    icon: <Settings className="size-4" />,
    description: "Your preferences were updated successfully.",
  });
}
