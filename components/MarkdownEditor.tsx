"use client";

import { useRef } from "react";
import { Bold, Italic, Strikethrough, Heading2, List, ListOrdered, Quote, Link2, Image, Minus, Undo2, Redo2 } from "lucide-react";

type Transform = (text: string, start: number, end: number) => { text: string; selStart: number; selEnd: number };

export default function MarkdownEditor({
  value,
  onChange,
  rows = 5,
  placeholder,
  disabled,
  maxLength,
  textareaClassName,
}: {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  textareaClassName?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  function apply(transform: Transform) {
    const ta = ref.current;
    if (!ta) return;
    const { text, selStart, selEnd } = transform(value, ta.selectionStart, ta.selectionEnd);
    onChange(text);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(selStart, selEnd);
    });
  }

  function wrap(marker: string, placeholderText: string) {
    apply((text, start, end) => {
      const selected = text.slice(start, end) || placeholderText;
      const next = text.slice(0, start) + marker + selected + marker + text.slice(end);
      return { text: next, selStart: start + marker.length, selEnd: start + marker.length + selected.length };
    });
  }

  function toggleLinePrefix(prefix: string, numbered = false) {
    apply((text, start, end) => {
      const lineStart = text.lastIndexOf("\n", start - 1) + 1;
      const lineEndIdx = text.indexOf("\n", end);
      const lineEnd = lineEndIdx === -1 ? text.length : lineEndIdx;
      const block = text.slice(lineStart, lineEnd);
      const lines = block.split("\n");
      const test = (l: string) => (numbered ? /^\d+\.\s/.test(l) : l.startsWith(prefix));
      const allSet = lines.length > 0 && lines.every(test);
      const newLines = lines.map((l, i) => {
        if (allSet) return numbered ? l.replace(/^\d+\.\s/, "") : l.slice(prefix.length);
        if (test(l)) return l;
        return numbered ? `${i + 1}. ${l}` : `${prefix}${l}`;
      });
      const newBlock = newLines.join("\n");
      const next = text.slice(0, lineStart) + newBlock + text.slice(lineEnd);
      return { text: next, selStart: lineStart, selEnd: lineStart + newBlock.length };
    });
  }

  function insertLink() {
    apply((text, start, end) => {
      const selected = text.slice(start, end) || "link text";
      const insert = `[${selected}](https://)`;
      const next = text.slice(0, start) + insert + text.slice(end);
      const urlStart = start + selected.length + 3;
      return { text: next, selStart: urlStart, selEnd: urlStart + "https://".length };
    });
  }

  function insertImage() {
    apply((text, start, end) => {
      const selected = text.slice(start, end) || "image description";
      const insert = `![${selected}](https://)`;
      const next = text.slice(0, start) + insert + text.slice(end);
      const urlStart = start + selected.length + 4;
      return { text: next, selStart: urlStart, selEnd: urlStart + "https://".length };
    });
  }

  function insertRule() {
    apply((text, start, end) => {
      const insert = "\n\n---\n\n";
      const next = text.slice(0, start) + insert + text.slice(end);
      const pos = start + insert.length;
      return { text: next, selStart: pos, selEnd: pos };
    });
  }

  function undo() {
    ref.current?.focus();
    document.execCommand("undo");
  }

  function redo() {
    ref.current?.focus();
    document.execCommand("redo");
  }

  type Btn = { icon: typeof Bold; title: string; action: () => void };
  const groups: Btn[][] = [
    [
      { icon: Bold, title: "Bold", action: () => wrap("**", "bold text") },
      { icon: Italic, title: "Italic", action: () => wrap("*", "italic text") },
      { icon: Strikethrough, title: "Strikethrough", action: () => wrap("~~", "strikethrough text") },
    ],
    [
      { icon: Heading2, title: "Heading", action: () => toggleLinePrefix("## ") },
      { icon: Quote, title: "Quote", action: () => toggleLinePrefix("> ") },
      { icon: List, title: "Bullet list", action: () => toggleLinePrefix("- ") },
      { icon: ListOrdered, title: "Numbered list", action: () => toggleLinePrefix("", true) },
    ],
    [
      { icon: Link2, title: "Link", action: insertLink },
      { icon: Image, title: "Image", action: insertImage },
      { icon: Minus, title: "Horizontal rule", action: insertRule },
    ],
    [
      { icon: Undo2, title: "Undo", action: undo },
      { icon: Redo2, title: "Redo", action: redo },
    ],
  ];

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center gap-1 rounded-t-xl border border-b-0 border-white/10 bg-navy2/60 px-2 py-1.5">
        {groups.map((group, gi) => (
          <div key={gi} className="flex items-center gap-1">
            {gi > 0 && <span className="mx-1 h-4 w-px bg-white/10" />}
            {group.map((b) => (
              <button
                key={b.title}
                type="button"
                title={b.title}
                disabled={disabled}
                onClick={b.action}
                className="rounded-lg p-1.5 text-mist transition hover:bg-white/10 hover:text-white disabled:opacity-40"
              >
                <b.icon size={14} />
              </button>
            ))}
          </div>
        ))}
      </div>
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        maxLength={maxLength}
        className={
          textareaClassName ??
          "resize-none rounded-b-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
        }
      />
    </div>
  );
}
