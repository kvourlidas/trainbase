import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { Locale } from "@/i18n/routing";

export type TipCover = "bars" | "clock" | "wave";

export type TipMeta = {
  title: string;
  slug: string;
  category: string;
  readTime: number;
  /** ISO date, e.g. 2026-11-01. */
  date: string;
  /** A generated SVG cover name, or an image path under /public. */
  cover: TipCover | string;
};

export type Tip = TipMeta & { body: string };

const TIPS_DIR = path.join(process.cwd(), "content", "tips");

/** Minimal YAML-ish frontmatter parser: `key: value` lines between `---` fences. */
function parse(source: string): { data: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(source);
  if (!match) return { data: {}, body: source };
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    data[line.slice(0, i).trim()] = line
      .slice(i + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
  }
  return { data, body: match[2] };
}

async function readTip(locale: Locale, file: string): Promise<Tip> {
  const raw = await readFile(path.join(TIPS_DIR, locale, file), "utf8");
  const { data, body } = parse(raw);
  return {
    title: data.title ?? file,
    slug: data.slug ?? file.replace(/\.mdx$/, ""),
    category: data.category ?? "",
    readTime: Number(data.readTime ?? 3),
    date: data.date ?? "1970-01-01",
    cover: data.cover ?? "bars",
    body,
  };
}

export async function getTips(locale: Locale): Promise<Tip[]> {
  let files: string[] = [];
  try {
    files = (await readdir(path.join(TIPS_DIR, locale))).filter((f) => f.endsWith(".mdx"));
  } catch {
    return [];
  }
  const tips = await Promise.all(files.map((f) => readTip(locale, f)));
  return tips.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getTip(locale: Locale, slug: string): Promise<Tip | null> {
  return (await getTips(locale)).find((t) => t.slug === slug) ?? null;
}
