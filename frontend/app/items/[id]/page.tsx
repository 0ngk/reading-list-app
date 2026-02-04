import {
  BookOutlined,
  FileTextOutlined,
  GlobalOutlined,
  LinkOutlined,
  ShareAltOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Button, Card, Divider, Space } from "antd";
import BackButton from "@/components/BackButton";
import { Title, Paragraph } from "@/components/Typography";
import { fetchItemById } from "@/lib/fetch";

export default async function Item({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await fetchItemById(Number.parseInt(id, 10));
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
            <Paragraph style={{ color: "#1e293b", fontSize: 16, margin: 0 }}>
              {item.aiSummary}
            </Paragraph>
          </div>
        </Card>
      </div>
    </main>
  );
}
