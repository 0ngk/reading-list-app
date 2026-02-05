import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

interface ContentResult {
  textContent: string;
  excerpt: string;
  siteName: string | null;
}

export function extractContent(html: string, url: string): ContentResult {
  const dom = new JSDOM(html, { url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  if (article) {
    return {
      textContent: article.textContent?.trim() ?? "",
      excerpt: article.excerpt?.trim() ?? "",
      siteName: article.siteName ?? null,
    };
  }

  const fallbackText = dom.window.document.body?.textContent?.trim() ?? "";
  return {
    textContent: fallbackText,
    excerpt: fallbackText.slice(0, 200),
    siteName: null,
  };
}
