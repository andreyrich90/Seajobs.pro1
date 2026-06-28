import { Fragment, type ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|~~[^~]+~~|!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\))/);
  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("~~") && part.endsWith("~~")) {
      return <del key={i}>{part.slice(2, -2)}</del>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    const image = part.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      return <img key={i} src={image[2]} alt={image[1]} className="my-2 max-w-full rounded-lg" />;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer" className="text-brass2 underline hover:text-brass">
          {link[1]}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function withLineBreaks(text: string): ReactNode[] {
  return text.split("\n").map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {renderInline(line)}
    </Fragment>
  ));
}

/** Renders a small markdown subset: "## " headings, "> " quotes, "- "/"1. " lists, "---" rules, **bold**, *italic*, ~~strike~~, [text](url), ![alt](url). */
export function renderMarkdown(content: string): ReactNode[] {
  const blocks = content.split(/\n\n+/);
  return blocks.map((block, bi) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    const lines = trimmed.split("\n");

    if (trimmed === "---" || trimmed === "***") {
      return <hr key={bi} className="my-6 border-white/10" />;
    }
    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={bi} className="mb-3 mt-7 font-display text-lg font-semibold text-white first:mt-0">
          {trimmed.slice(3)}
        </h2>
      );
    }
    if (lines.every((l) => l.startsWith("> "))) {
      return (
        <blockquote key={bi} className="mb-5 border-l-2 border-brass/40 pl-4 text-sm italic leading-7 text-mist last:mb-0">
          {withLineBreaks(lines.map((l) => l.slice(2)).join("\n"))}
        </blockquote>
      );
    }
    if (lines.every((l) => /^[-*]\s/.test(l))) {
      return (
        <ul key={bi} className="mb-5 list-disc space-y-1 pl-5 text-sm leading-7 text-foam last:mb-0">
          {lines.map((l, li) => <li key={li}>{renderInline(l.replace(/^[-*]\s/, ""))}</li>)}
        </ul>
      );
    }
    if (lines.every((l) => /^\d+\.\s/.test(l))) {
      return (
        <ol key={bi} className="mb-5 list-decimal space-y-1 pl-5 text-sm leading-7 text-foam last:mb-0">
          {lines.map((l, li) => <li key={li}>{renderInline(l.replace(/^\d+\.\s/, ""))}</li>)}
        </ol>
      );
    }
    return (
      <p key={bi} className="mb-5 text-sm leading-7 text-foam last:mb-0">
        {withLineBreaks(trimmed)}
      </p>
    );
  });
}
