"use client";

import { HomeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/feed",
      icon: HomeOutlined,
      label: "ホーム",
      isActive: pathname === "/feed",
    },
    {
      href: "/items/new",
      icon: PlusCircleOutlined,
      label: "追加",
      isActive: pathname === "/items/new",
      isAddButton: true,
    },
  ];

  return (
    <nav className="bottom-navigation">
      <div className="bottom-nav-container">
        <div className="bottom-nav-items">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`bottom-nav-item ${item.isActive ? "active" : ""} ${item.isAddButton ? "add-button" : ""}`}
              >
                <Icon className="bottom-nav-icon" />
                <span className="bottom-nav-label">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
