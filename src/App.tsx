"use client";

import { useState, useEffect } from "react";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { CursorGlow } from "./components/ui/CursorGlow";
import { Header } from "./components/sections/Header";
import { Hero } from "./components/sections/Hero";
import { FilterGrid } from "./components/sections/FilterGrid";
import { Footer } from "./components/sections/Footer";
import { PatternModal } from "./components/ui/PatternModal";
import type { Group } from "./lib/groups";

export default function ToastPlayground() {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState("all");
  const [navScrolled, setNavScrolled] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState<Group | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    setMounted(true);

    // Safety timeout to catch any late browser-restored scrolls
    const timer = setTimeout(() => window.scrollTo(0, 0), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <ScrollProgress />
      <CursorGlow />

      <div className="page">
        <Header navScrolled={navScrolled} />

        <div className="wrap">
          <main>
            <Hero />
            <FilterGrid
              filter={filter}
              setFilter={setFilter}
              onOpenPattern={setSelectedPattern}
            />
          </main>

          <Footer />
        </div>
      </div>

      <PatternModal
        group={selectedPattern}
        onClose={() => setSelectedPattern(null)}
      />
    </>
  );
}
