import { writeFileSync } from "fs";
import { join } from "path";
import { T, type Lang } from "../lib/i18n";

const OUT_DIR = join(__dirname, "..", "messages");

for (const lang of Object.keys(T) as Lang[]) {
  const filePath = join(OUT_DIR, `${lang}.json`);
  writeFileSync(filePath, JSON.stringify(T[lang], null, 2) + "\n", "utf-8");
  console.log(`Wrote ${filePath} (${Object.keys(T[lang]).length} keys)`);
}
