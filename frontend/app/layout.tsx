import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import BottomNavigation from "@/components/navigations/BottomNavigation";
import { theme } from "@/lib/antd-theme";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Reading List",
  description: "A reading list app.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${plusJakartaSans.variable} pb-[76px] md:pb-0`}>
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            {children}
            <BottomNavigation />
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
