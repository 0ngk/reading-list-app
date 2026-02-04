import type { ThemeConfig } from "antd";

export const theme: ThemeConfig = {
  token: {
    // Color tokens
    colorPrimary: "#3b82f6", // Primary blue
    colorInfo: "#3b82f6",
    colorSuccess: "#10b981",
    colorWarning: "#f59e0b",
    colorError: "#ef4444",

    // Typography
    fontFamily:
      '"Plus Jakarta Sans", ui-sans-serif, system-ui, -apple-system, sans-serif',
    fontSize: 14,
    fontSizeHeading1: 32,
    fontSizeHeading2: 24,
    fontSizeHeading3: 20,
    fontSizeHeading4: 16,

    // Layout
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 6,

    // Colors
    colorBgContainer: "#ffffff",
    colorBgLayout: "#f8fafc",
    colorText: "#1e293b",
    colorTextSecondary: "#475569",
    colorBorder: "#e2e8f0",
    colorBorderSecondary: "#f1f5f9",
  },
  components: {
    Button: {
      controlHeight: 40,
      controlHeightLG: 48,
      controlHeightSM: 32,
      paddingContentHorizontal: 20,
      fontWeight: 500,
    },
    Card: {
      borderRadiusLG: 12,
      paddingLG: 24,
    },
    Form: {
      itemMarginBottom: 24,
      labelFontSize: 14,
    },
    Input: {
      controlHeight: 40,
      controlHeightLG: 48,
      paddingBlock: 8,
      paddingInline: 12,
      borderRadius: 8,
    },
    Layout: {
      headerBg: "#ffffff",
      headerPadding: "0 24px",
      headerHeight: 64,
    },
    Typography: {
      titleMarginBottom: "0.5em",
      titleMarginTop: "0em",
    },
  },
};
