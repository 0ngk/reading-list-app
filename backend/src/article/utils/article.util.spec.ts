import { buildSummaryPrompt, buildTitleAndSummaryPrompt } from "./article.util";

describe("article prompt builders", () => {
  const fixedNow = new Date("2026-02-16T00:00:00.000Z");
  const isoNow = fixedNow.toISOString();

  it("buildTitleAndSummaryPrompt includes current time instruction", () => {
    const prompt = buildTitleAndSummaryPrompt("本文テキスト", fixedNow);

    expect(prompt).toContain(isoNow);
    expect(prompt).toContain("【現在時刻】");
  });

  it("buildSummaryPrompt includes current time instruction", () => {
    const prompt = buildSummaryPrompt("本文テキスト", fixedNow);

    expect(prompt).toContain(isoNow);
    expect(prompt).toContain("本文テキスト");
  });
});
