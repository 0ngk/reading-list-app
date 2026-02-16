import {
  BookOutlined,
  FileTextOutlined,
  GlobalOutlined,
  LinkOutlined,
  ShareAltOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Button, Card, Divider, Space } from "antd";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import SummaryReelsViewer from "@/components/SummaryReelsViewer";
import { Title } from "@/components/Typography";
import { ApiError } from "@/lib/api-error";
import { fetchItemById } from "@/lib/fetch";

const SENTENCE_DELIMITERS = new Set(["。", "？", "！", "?", "!"]);
const OPENING_TO_CLOSING_QUOTES = new Map<string, string>([
  ["「", "」"],
  ["『", "』"],
  ['"', '"'],
  ["“", "”"],
]);

const splitSummaryIntoSentences = (summary: string): string[] => {
  const { sentences, current } = Array.from(summary).reduce<{
    sentences: string[];
    current: string;
    quoteStack: string[];
  }>(
    (state, char) => {
      const closingQuote = OPENING_TO_CLOSING_QUOTES.get(char);
      const nextQuoteStack = closingQuote
        ? char === '"' && state.quoteStack.at(-1) === closingQuote
          ? state.quoteStack.slice(0, -1)
          : [...state.quoteStack, closingQuote]
        : state.quoteStack.at(-1) === char
          ? state.quoteStack.slice(0, -1)
          : state.quoteStack;

      const shouldSplit =
        SENTENCE_DELIMITERS.has(char) && nextQuoteStack.length === 0;

      const updatedCurrent = state.current + char;

      return shouldSplit
        ? {
            sentences: [...state.sentences, updatedCurrent.trim()],
            current: "",
            quoteStack: nextQuoteStack,
          }
        : {
            sentences: state.sentences,
            current: updatedCurrent,
            quoteStack: nextQuoteStack,
          };
    },
    { sentences: [], current: "", quoteStack: [] },
  );

  const trimmed = current.trim();
  return trimmed ? [...sentences, trimmed] : sentences;
};

export default async function Item({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let item: Awaited<ReturnType<typeof fetchItemById>>;
  try {
    item = await fetchItemById(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }
  const sentences = splitSummaryIntoSentences(item.aiSummary);

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <div
        style={{
          maxWidth: 896,
          margin: "0 auto",
          padding: "32px 24px",
        }}
      >
        <div style={{ marginBottom: 32 }}>
          <BackButton variant="default" label="リストに戻る" />
        </div>

        <Card>
          <div
            style={{
              display: "flex",
              alignItems: "start",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "start",
                gap: 12,
                flex: 1,
              }}
            >
              <FileTextOutlined
                style={{
                  fontSize: 32,
                  color: "#3b82f6",
                  flexShrink: 0,
                  marginTop: 4,
                }}
              />
              <Title level={1} style={{ margin: 0 }}>
                {item.title}
              </Title>
            </div>
            <Space>
              <Button
                type="text"
                icon={<BookOutlined />}
                title="ブックマーク"
              />
              <Button type="text" icon={<ShareAltOutlined />} title="共有" />
            </Space>
          </div>

          {item.originalUrl && (
            <>
              <Divider />

              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <GlobalOutlined style={{ fontSize: 16, color: "#475569" }} />
                  <Title
                    level={5}
                    style={{
                      margin: 0,
                      color: "#475569",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Original URL
                  </Title>
                </div>
                <a
                  href={item.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "#3b82f6",
                    textDecoration: "none",
                  }}
                >
                  {item.originalUrl}
                  <LinkOutlined style={{ fontSize: 14 }} />
                </a>
              </div>
            </>
          )}

          <Divider />

          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16,
              }}
            >
              <StarOutlined style={{ fontSize: 16, color: "#a855f7" }} />
              <Title
                level={5}
                style={{
                  margin: 0,
                  color: "#475569",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                AI Summary
              </Title>
            </div>
            <SummaryReelsViewer sentences={sentences} />
          </div>
        </Card>
      </div>
    </main>
  );
}
