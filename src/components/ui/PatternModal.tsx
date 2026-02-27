"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Copy, Check, BookOpen, ChevronRight } from "lucide-react";
import type { Group } from "../../lib/groups";
import { PATTERN_CODES } from "../../lib/pattern-codes";

interface PatternModalProps {
  group: Group | null;
  onClose: () => void;
}

export function PatternModal({ group, onClose }: PatternModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [showMask, setShowMask] = useState(true);

  // Lock scroll when modal is open
  useEffect(() => {
    if (group) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [group]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Close on backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose],
  );

  const patternData = group ? PATTERN_CODES[group.id] : null;

  return (
    <AnimatePresence>
      {group && patternData && (
        <motion.div
          ref={overlayRef}
          className="modal-overlay"
          onClick={handleBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            ref={panelRef}
            className="modal-panel"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Header */}
            <div className="modal-header">
              <div className="modal-header-left">
                <div
                  className="modal-icon-wrap"
                  style={{ "--tag-c": group.tagColor } as React.CSSProperties}
                >
                  <group.icon
                    className="size-4"
                    style={{ color: group.tagColor }}
                  />
                </div>
                <div>
                  <h2 className="modal-title">{group.label}</h2>
                  <span
                    className="modal-tag"
                    style={{
                      color: group.tagColor,
                      borderColor: group.tagColor + "30",
                    }}
                  >
                    {group.tag}
                  </span>
                </div>
              </div>
              <button
                className="modal-close"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Description */}
            <p className="modal-desc">{group.desc}</p>

            {/* Setup import */}
            {patternData.setup && (
              <div className="modal-setup">
                <div className="modal-setup-label">
                  <BookOpen className="size-3" />
                  Setup
                </div>
                <CodeBlock code={patternData.setup} />
              </div>
            )}

            {/* Steps */}
            <div
              className="modal-steps"
              onScroll={(e) => {
                const target = e.currentTarget;
                const atBottom =
                  target.scrollHeight - target.scrollTop <=
                  target.clientHeight + 10;
                setShowMask(!atBottom);
              }}
            >
              {patternData.steps.map((step, i) => (
                <div key={i} className="modal-step">
                  <div className="modal-step-header">
                    <div className="modal-step-number">
                      <ChevronRight className="size-3" />
                      Step {i + 1}
                    </div>
                    <h3 className="modal-step-title">{step.title}</h3>
                  </div>
                  <p className="modal-step-desc">{step.description}</p>
                  <CodeBlock code={step.code} />
                </div>
              ))}
            </div>

            {/* Bottom Mask */}
            <AnimatePresence>
              {showMask && (
                <motion.div
                  className="modal-bottom-mask"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Code block with copy button ────────────────────────────────────── */
function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const highlightedCode = highlight(code);

  return (
    <div className="modal-code-block">
      <button
        className="modal-code-copy"
        onClick={handleCopy}
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="size-3 text-emerald-400" />
        ) : (
          <Copy className="size-3" />
        )}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="modal-code-pre">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </div>
  );
}

const highlight = (code: string) => {
  const tokens = [
    { name: "cmt", regex: /\/\/.*/ },
    { name: "str", regex: /(["'`])(?:\\.|(?!\1)[^\\\n])*\1/ },
    {
      name: "kw",
      regex:
        /\b(import|from|export|const|let|var|function|async|await|return|if|else|try|catch|finally|throw|as|type|interface|class|extends|static|get|set|new|delete|default)\b/,
    },
    {
      name: "fn",
      regex:
        /\b(toast|setTimeout|setInterval|clearTimeout|console|Promise|Error|Array|Object|Math|Map|Set|window|document|navigator|String|Number|Boolean|Symbol|BigInt|Date|RegExp|JSON|Proxy|Reflect|Intl)\b/,
    },
    {
      name: "fn",
      regex:
        /\b(success|error|warning|info|loading|dismiss|promise)\b(?=\s*\(|:)/,
    },
    { name: "num", regex: /\b\d+\b/ },
    {
      name: "type",
      regex:
        /\b(React|Group|PatternStep|PatternCode|HtmlButtonElement|MouseEvent|HTMLDivElement|ReactNode|GroupProps)\b/,
    },
    {
      name: "op",
      regex: /=>|===|==|!==|!=|&&|\|\||[=+\-*/%&|^!<>?:;,.[\]{}()]/,
    },
  ];

  const combinedRegex = new RegExp(
    tokens.map((t) => `(${t.regex.source})`).join("|"),
    "g",
  );

  let lastIndex = 0;
  let html = "";
  let match;

  while ((match = combinedRegex.exec(code)) !== null) {
    // Add text before the match
    const before = code.slice(lastIndex, match.index);
    html += before
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Identify which token matched
    let tokenName = "";
    for (let i = 0; i < tokens.length; i++) {
      if (match[i + 1] !== undefined) {
        tokenName = tokens[i].name;
        break;
      }
    }

    const matchedText = match[0];
    const escapedText = matchedText
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    if (tokenName) {
      // Basic punctuation shouldn't be colored as operators sometimes
      if (
        tokenName === "op" &&
        matchedText.length === 1 &&
        /[{}()[\].,;]/.test(matchedText)
      ) {
        html += escapedText;
      } else {
        html += `<span class="code-${tokenName}">${escapedText}</span>`;
      }
    } else {
      html += escapedText;
    }

    lastIndex = combinedRegex.lastIndex;
  }

  // Add remaining text
  html += code
    .slice(lastIndex)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return html;
};
