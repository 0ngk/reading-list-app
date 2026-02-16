"use client";

import {
  BookOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  GlobalOutlined,
  LinkOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button, Card } from "antd";
import { useRouter } from "next/navigation";
import type { ItemType } from "@/types/item";
import { Paragraph, Title } from "./Typography";

export default function Item({ item }: { item: ItemType }) {
  const router = useRouter();

  // Extract domain from URL
  const getDomain = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace("www.", "");
    } catch {
      return "unknown";
    }
  };

  return (
    <Card
      hoverable
      onClick={() => router.push(`/items/${item.id}`)}
      style={{ height: "100%" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
          <FileTextOutlined
            style={{ fontSize: 20, color: "#3b82f6", flexShrink: 0 }}
          />
          <Title level={4} style={{ margin: 0 }} ellipsis={{ rows: 2 }}>
            {item.title}
          </Title>
        </div>
        <Button
          type="text"
          icon={<BookOutlined />}
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{ marginLeft: 8 }}
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          color: "#475569",
          marginBottom: 12,
        }}
      >
        <ClockCircleOutlined style={{ fontSize: 14 }} />
        <span>AI要約済み</span>
      </div>

      <Paragraph
        ellipsis={{ rows: 3 }}
        style={{ color: "#475569", fontSize: 14, marginBottom: 16 }}
      >
        {item.aiSummary.map((s) => s.text).join("")}
      </Paragraph>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 12,
          color: "#475569",
        }}
      >
        {item.originalUrl && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontWeight: 500,
            }}
          >
            <GlobalOutlined style={{ fontSize: 14 }} />
            {getDomain(item.originalUrl)}
            <LinkOutlined style={{ fontSize: 12, opacity: 0.6 }} />
          </span>
        )}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            color: "#3b82f6",
            fontWeight: 500,
          }}
        >
          Read
          <RightOutlined style={{ fontSize: 14 }} />
        </span>
      </div>
    </Card>
  );
}
