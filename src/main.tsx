import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { PostHogProvider } from "@posthog/react";
import "./index.css";
import App from "./App.tsx";
import { initPostHog, posthog } from "./lib/posthog.ts";

initPostHog();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <App />
      <Toaster
        theme="dark"
        position="bottom-right"
        visibleToasts={6}
        toastOptions={{
          style: {
            background: "#131314",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#f0ece4",
            fontFamily: "'DM Sans', sans-serif",
          },
        }}
      />
    </PostHogProvider>
  </StrictMode>,
);
