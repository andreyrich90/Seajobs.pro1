/*
  Generates self-contained SVG cover art into public/img so the site never
  depends on an external image host. One illustration per recipe category and
  per lifehack category: a warm gradient + a simple line glyph. Re-run after
  editing the palette/glyphs:  node scripts/generate-images.mjs
*/
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "public/img");

// [from, to] gradient stops per category, in the "Свежо" palette (forest /
// terracotta / mustard / leaf). Mid-to-dark tones so the white glyph reads.
const recipeThemes = {
  breakfast: ["#e0b34a", "#c1552e"],
  soup: ["#c1552e", "#a8431f"],
  main: ["#3f5231", "#2f3d26"],
  salad: ["#8caa66", "#3f5231"],
  dessert: ["#cf8a5f", "#a8431f"],
  drink: ["#6fae9a", "#33564a"],
  baking: ["#d9a441", "#a8431f"],
  snack: ["#b9975f", "#6f5a34"],
};
const lifehackThemes = {
  storage: ["#6fae9a", "#33564a"],
  cooking: ["#c1552e", "#a8431f"],
  cleaning: ["#8caa66", "#3f5231"],
  saving: ["#d9a441", "#a8431f"],
};

// Simple centred white line glyphs (viewBox 0 0 100 100, drawn at centre).
const glyphs = {
  // a bowl
  bowl: `<path d="M20 46 h60 a30 22 0 0 1 -60 0 z" /><path d="M14 44 h72" /><path d="M40 30 q6 -8 12 0" /><path d="M52 28 q6 -8 12 0" />`,
  // steaming cup / soup
  cup: `<path d="M28 48 h44 v6 a22 22 0 0 1 -44 0 z" /><path d="M72 50 h8 a8 8 0 0 1 0 16 h-6" /><path d="M40 32 v-8 M52 32 v-10 M64 32 v-8" />`,
  // fork + knife
  cutlery: `<path d="M40 26 v20 a6 6 0 0 1 -12 0 v-20 M34 26 v14 M46 26 v48" /><path d="M62 26 q10 6 10 20 q0 8 -6 8 h-4 v20" />`,
  // leaf / salad
  leaf: `<path d="M30 70 q0 -40 40 -44 q4 40 -40 44 z" /><path d="M34 66 q18 -18 30 -30" />`,
  // cupcake / dessert
  cupcake: `<path d="M32 54 h36 l-6 26 h-24 z" /><path d="M30 54 a20 16 0 0 1 40 0 z" /><path d="M50 30 v-8" />`,
  // glass / drink
  glass: `<path d="M36 28 h28 l-4 44 h-20 z" /><path d="M40 44 h20" /><path d="M50 72 v6 M42 82 h16" />`,
  // bread / baking
  bread: `<path d="M24 54 q0 -18 26 -18 q26 0 26 18 v10 h-52 z" /><path d="M38 40 v22 M50 38 v24 M62 40 v22" />`,
  // pretzel-ish snack
  snack: `<circle cx="50" cy="52" r="20" /><path d="M40 44 q10 -14 20 0 M40 60 q10 14 20 0" />`,
  // box / storage
  box: `<path d="M28 40 h44 v34 h-44 z" /><path d="M28 40 l22 -12 l22 12 M50 28 v46 M28 40 h44" />`,
  // spray / cleaning
  spray: `<path d="M44 40 h14 v32 h-14 z" /><path d="M44 40 v-8 h10 v8 M54 34 h12 M66 30 v8" /><circle cx="72" cy="30" r="1.6" /><circle cx="76" cy="26" r="1.6" /><circle cx="76" cy="34" r="1.6" />`,
  // coin / saving
  coin: `<circle cx="50" cy="52" r="20" /><path d="M50 40 v24 M44 46 h9 a4 4 0 0 1 0 8 h-9 M44 50 h9 a4 4 0 0 1 0 8 h-9" />`,
};

const recipeGlyph = {
  breakfast: "bowl", soup: "cup", main: "cutlery", salad: "leaf",
  dessert: "cupcake", drink: "glass", baking: "bread", snack: "snack",
};
const lifehackGlyph = {
  storage: "box", cooking: "cutlery", cleaning: "spray", saving: "coin",
};

function svg(id, [from, to], glyph) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" role="img">
  <defs>
    <linearGradient id="g-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g-${id})"/>
  <g fill="none" stroke="#ffffff" stroke-opacity="0.16" stroke-width="10">
    <circle cx="400" cy="300" r="150"/>
    <circle cx="400" cy="300" r="200"/>
  </g>
  <g transform="translate(400 300) scale(2.4) translate(-50 -50)"
     fill="none" stroke="#ffffff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
    ${glyphs[glyph]}
  </g>
</svg>`;
}

mkdirSync(resolve(outDir, "recipes"), { recursive: true });
mkdirSync(resolve(outDir, "lifehacks"), { recursive: true });

let n = 0;
for (const [cat, theme] of Object.entries(recipeThemes)) {
  writeFileSync(resolve(outDir, `recipes/${cat}.svg`), svg(cat, theme, recipeGlyph[cat]));
  n++;
}
for (const [cat, theme] of Object.entries(lifehackThemes)) {
  writeFileSync(resolve(outDir, `lifehacks/${cat}.svg`), svg(cat, theme, lifehackGlyph[cat]));
  n++;
}
console.log(`Generated ${n} SVG covers into public/img`);
