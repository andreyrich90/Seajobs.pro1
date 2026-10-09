import { Fragment, type ReactNode } from "react";

// Options for content written by visitors rather than by us (comments).
// `ugc` marks every link nofollow/ugc, so a spam comment cannot borrow the
// page's standing with search engines; refuses any scheme but http(s); and
// shows an image as a plain link instead of loading it from wherever the
// visitor pointed it.
export type MarkdownOptions = { ugc?: boolean };

const SAFE_HREF = /^https?:\/\//i;

function renderInline(text: string, opts: MarkdownOptions = {}): ReactNode[] {
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
      if (opts.ugc) {
        if (!SAFE_HREF.test(image[2])) return <Fragment key={i}>{image[1]}</Fragment>;
        return (
          <a key={i} href={image[2]} target="_blank" rel="nofollow ugc noopener noreferrer" className="text-brassInk underline hover:text-brass">
            {image[1] || image[2]}
          </a>
        );
      }
      return <img key={i} src={image[2]} alt={image[1]} className="my-2 max-w-full rounded-lg" />;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      if (opts.ugc && !SAFE_HREF.test(link[2])) return <Fragment key={i}>{link[1]}</Fragment>;
      return (
        <a key={i} href={link[2]} target="_blank" rel={opts.ugc ? "nofollow ugc noopener noreferrer" : "noopener noreferrer"} className="text-brassInk underline hover:text-brass">
          {link[1]}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function withLineBreaks(text: string, opts: MarkdownOptions = {}): ReactNode[] {
  return text.split("\n").map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {renderInline(line, opts)}
    </Fragment>
  ));
}

type LineKind = "blank" | "h" | "q" | "ul" | "ol" | "box" | "stat" | "quiz" | "p";

// Three blocks for our own articles (the handbook), never for comments — in
// `ugc` mode these lines are plain paragraphs:
//   ":: …"            a boxed summary; its lines are rendered as markdown
//   "!! 15 ppm | …"   a row of key-number cards: value | what it means
//   "?? …" + "=> …"   self-check questions, the answer folded under each
const BOX = /^::( |$)/;
const STAT = /^!! /;
const QUIZ = /^(\?\?|=>) /;

function lineKind(l: string, rich: boolean): LineKind {
  if (l.trim() === "") return "blank";
  if (l.startsWith("## ")) return "h";
  if (l.startsWith("> ")) return "q";
  if (/^[-*]\s/.test(l)) return "ul";
  if (/^\d+\.\s/.test(l)) return "ol";
  if (rich && BOX.test(l)) return "box";
  if (rich && STAT.test(l)) return "stat";
  if (rich && QUIZ.test(l)) return "quiz";
  return "p";
}

// User-typed markdown often glues a heading/list/quote straight onto the
// previous line with a single newline. The block splitter below needs blank
// lines, so insert one wherever two adjacent non-blank lines belong to
// different block types (a heading always starts its own block).
function normalizeBlocks(content: string, rich: boolean): string {
  const lines = content.split("\n");
  const out: string[] = [];
  let prev: LineKind | null = null; // last emitted non-blank line, null after a blank
  for (const line of lines) {
    const kind = lineKind(line, rich);
    if (kind === "blank") {
      out.push(line);
      prev = null;
      continue;
    }
    if (prev !== null && (kind !== prev || kind === "h")) out.push("");
    out.push(line);
    prev = kind;
  }
  return out.join("\n");
}

/** Renders a small markdown subset: "## " headings, "> " quotes, "- "/"1. " lists, "---" rules, **bold**, *italic*, ~~strike~~, [text](url), ![alt](url) — plus, outside `ugc`, the "::", "!!" and "??"/"=>" blocks described above. */
export function renderMarkdown(content: string, opts: MarkdownOptions = {}): ReactNode[] {
  const rich = !opts.ugc;
  const blocks = normalizeBlocks(content, rich).split(/\n\n+/);
  return blocks.map((block, bi) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    const lines = trimmed.split("\n");

    if (rich && lines.every((l) => BOX.test(l))) {
      return (
        <div key={bi} className="mb-5 rounded-2xl border border-brass/30 bg-brass/5 px-5 py-4 last:mb-0">
          {renderMarkdown(lines.map((l) => l.replace(BOX, "")).join("\n"), opts)}
        </div>
      );
    }
    if (rich && lines.every((l) => STAT.test(l))) {
      return (
        <div key={bi} className={`mb-5 grid grid-cols-2 gap-3 last:mb-0 ${lines.length % 3 === 0 ? "sm:grid-cols-3" : ""}`}>
          {lines.map((l, li) => {
            const [value, ...label] = l.slice(3).split("|");
            return (
              <div key={li} className="rounded-xl border border-brass/25 bg-brass/5 px-4 py-3">
                <div className="font-display text-xl font-semibold leading-tight text-brassInk sm:text-2xl">{value.trim()}</div>
                <div className="mt-1 text-xs leading-5 text-mist">{renderInline(label.join("|").trim(), opts)}</div>
              </div>
            );
          })}
        </div>
      );
    }
    if (rich && lines.every((l) => QUIZ.test(l))) {
      const items: { q: string; a: string[] }[] = [];
      for (const l of lines) {
        if (l.startsWith("?? ")) items.push({ q: l.slice(3), a: [] });
        else if (items.length) items[items.length - 1].a.push(l.slice(3));
      }
      return (
        <div key={bi} className="mb-5 space-y-2 last:mb-0">
          {items.map((it, ii) => (
            <details key={ii} className="group rounded-xl border border-white/10 bg-card px-4 py-3">
              <summary className="flex cursor-pointer list-none items-start gap-3 text-sm font-semibold leading-6 text-white [&::-webkit-details-marker]:hidden">
                <span className="flex-1">{renderInline(it.q, opts)}</span>
                <span aria-hidden className="shrink-0 text-lg leading-6 text-brassInk transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="mt-2 border-t border-white/10 pt-2 text-sm leading-7 text-foam">
                {withLineBreaks(it.a.join("\n"), opts)}
              </div>
            </details>
          ))}
        </div>
      );
    }

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
          {withLineBreaks(lines.map((l) => l.slice(2)).join("\n"), opts)}
        </blockquote>
      );
    }
    if (lines.every((l) => /^[-*]\s/.test(l))) {
      return (
        <ul key={bi} className="mb-5 list-disc space-y-1 pl-5 text-sm leading-7 text-foam last:mb-0">
          {lines.map((l, li) => <li key={li}>{renderInline(l.replace(/^[-*]\s/, ""), opts)}</li>)}
        </ul>
      );
    }
    if (lines.every((l) => /^\d+\.\s/.test(l))) {
      return (
        <ol key={bi} className="mb-5 list-decimal space-y-1 pl-5 text-sm leading-7 text-foam last:mb-0">
          {lines.map((l, li) => <li key={li}>{renderInline(l.replace(/^\d+\.\s/, ""), opts)}</li>)}
        </ol>
      );
    }
    return (
      <p key={bi} className="mb-5 text-sm leading-7 text-foam last:mb-0">
        {withLineBreaks(trimmed, opts)}
      </p>
    );
  });
}
