import { Injectable, Logger } from "@nestjs/common";
import { extractContent } from "./extractors/content.extractor";
import { extractTitle } from "./extractors/title.extractor";
import type { ScrapeResult } from "./types/scraper.types";

const TIMEOUT_MS = 10_000;
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

class ScrapingError extends Error {
  constructor(
    message: string,
    public readonly url: string,
  ) {
    super(`Scraping failed for ${url}: ${message}`);
    this.name = "ScrapingError";
  }
}

@Injectable()
export class ScraperService {
  private readonly logger = new Logger(ScraperService.name);

  async scrape(url: string): Promise<ScrapeResult> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent": "ReadingListBot/1.0",
          "Accept-Language": "ja,en;q=0.9",
          Accept: "text/html,application/xhtml+xml",
        },
        redirect: "follow",
      });

      if (!response.ok) {
        throw new ScrapingError(
          `HTTP ${response.status} ${response.statusText}`,
          url,
        );
      }

      const contentType = response.headers.get("content-type") ?? "";
      if (
        !contentType.includes("text/html") &&
        !contentType.includes("application/xhtml")
      ) {
        throw new ScrapingError(
          `Unsupported content type: ${contentType}`,
          url,
        );
      }

      const contentLength = response.headers.get("content-length");
      if (
        contentLength &&
        Number.parseInt(contentLength, 10) > MAX_SIZE_BYTES
      ) {
        throw new ScrapingError(
          `Content too large: ${contentLength} bytes`,
          url,
        );
      }

      const html = await response.text();

      if (html.length > MAX_SIZE_BYTES) {
        throw new ScrapingError(`Content too large: ${html.length} bytes`, url);
      }

      const title = extractTitle(html);
      const { textContent, excerpt, siteName } = extractContent(html, url);

      this.logger.log(`Successfully scraped: ${url} (title: "${title}")`);

      return { title, textContent, excerpt, siteName };
    } catch (error) {
      if (error instanceof ScrapingError) {
        throw error;
      }
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new ScrapingError("Request timed out", url);
      }
      throw new ScrapingError(
        error instanceof Error ? error.message : String(error),
        url,
      );
    } finally {
      clearTimeout(timeout);
    }
  }
}
