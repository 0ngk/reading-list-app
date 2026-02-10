import { JSDOM } from "jsdom";
import { MAX_CONTENT_LENGTH } from "../constants/content.constants";

interface ContentResult {
  textContent: string;
  excerpt: string;
  siteName: string | null;
}

export function extractContent(html: string, url: string): ContentResult {
  const dom = new JSDOM(html, { url });
  const document = dom.window.document;

  // script、styleタグを除外
  const scripts = document.querySelectorAll("script, style, noscript");
  for (const el of scripts) {
    el.remove();
  }

  // body全体のテキストを取得
  const fullText = document.body?.textContent?.trim() ?? "";

  // 最大文字数に制限
  const textContent = fullText.slice(0, MAX_CONTENT_LENGTH);

  return {
    textContent,
    excerpt: textContent.slice(0, 200), // プレビュー用に短い抜粋も保持
    siteName: null,
  };
}
