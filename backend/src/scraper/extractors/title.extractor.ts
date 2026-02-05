import * as cheerio from "cheerio";

export function extractTitle(html: string): string {
  const $ = cheerio.load(html);

  const ogTitle = $('meta[property="og:title"]').attr("content");
  if (ogTitle?.trim()) return ogTitle.trim();

  const twitterTitle = $('meta[name="twitter:title"]').attr("content");
  if (twitterTitle?.trim()) return twitterTitle.trim();

  const titleTag = $("title").text();
  if (titleTag?.trim()) return titleTag.trim();

  const h1 = $("h1").first().text();
  if (h1?.trim()) return h1.trim();

  return "Untitled";
}
