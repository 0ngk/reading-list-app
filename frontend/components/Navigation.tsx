"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        padding: "16px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/dashboard"
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#1e293b",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#475569";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#1e293b";
          }}
        >
          Reading List
        </Link>
        <Link href="/items/new" style={{ textDecoration: "none" }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            className="ant-btn-cta"
          >
            記事を追加
          </Button>
        </Link>
      </div>
    </nav>
  );
}
