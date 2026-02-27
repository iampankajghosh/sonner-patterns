<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the **Sonner Patterns** playground — a client-side React/Vite application showcasing 24 Sonner toast patterns. PostHog was initialized via `posthog-js` with the `@posthog/react` provider wrapping the entire app. Nine meaningful user action events were instrumented across 7 files to cover the full engagement journey: from hero CTA interaction and filter exploration, through pattern discovery and modal deep-dives, all the way to code copying and external navigation. The `usePostHog()` hook from `@posthog/react` was used consistently in every component. Environment variables (`VITE_PUBLIC_POSTHOG_KEY` and `VITE_PUBLIC_POSTHOG_HOST`) are used throughout — no keys are hardcoded.

| Event Name | Description | File |
|---|---|---|
| `install_command_copied` | User clicks the copy button to copy the `npm install sonner` install command | `src/components/ui/CopyButton.tsx` |
| `pattern_filter_applied` | User clicks a filter tag to narrow the pattern grid by category (with `filter_tag` and `result_count` properties) | `src/components/sections/FilterGrid.tsx` |
| `pattern_card_opened` | User clicks a pattern card to open the detail modal (with `pattern_id`, `pattern_label`, `pattern_tag`) | `src/components/ui/DemoCard.tsx` |
| `pattern_demo_triggered` | User clicks an action button on a card to fire the live demo toast (with `pattern_id`, `action_label`) | `src/components/ui/DemoCard.tsx` |
| `pattern_modal_closed` | User closes a pattern modal via button, Escape key, or backdrop click (with `close_method`) | `src/components/ui/PatternModal.tsx` |
| `pattern_code_copied` | User copies code from a code block inside the pattern modal (with `pattern_id`, `code_context`, `step_title`) | `src/components/ui/PatternModal.tsx` |
| `hero_demo_triggered` | User clicks the "Try the first toast" CTA in the hero section | `src/components/sections/Hero.tsx` |
| `docs_link_clicked` | User clicks the "Docs ↗" link in the header to visit Sonner documentation | `src/components/sections/Header.tsx` |
| `github_star_clicked` | User clicks the "Star" button in the header to visit the GitHub repo | `src/components/sections/Header.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- 📊 **Dashboard — Analytics basics**: https://us.posthog.com/project/326134/dashboard/1315559
- 📈 **Pattern Engagement: Card Opens vs Demo Triggers**: https://us.posthog.com/project/326134/insights/M8qvIOek
- 🔽 **User Conversion: Hero CTA → Pattern Open → Code Copied** (funnel): https://us.posthog.com/project/326134/insights/NSzLggOd
- 🏷️ **Most Popular Pattern Categories (Filter Clicks)**: https://us.posthog.com/project/326134/insights/PudYe1qB
- 📋 **Install Command Copy Rate**: https://us.posthog.com/project/326134/insights/yCfZ6Ep8
- 🔗 **External Link Clicks: Docs & GitHub**: https://us.posthog.com/project/326134/insights/L3z23yaN

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
