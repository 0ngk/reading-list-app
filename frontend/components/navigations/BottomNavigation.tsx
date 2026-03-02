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
    <nav className="flex md:hidden">
      <div className="fixed inset-x-0 bottom-0 z-[1000] border-t border-slate-200/60 bg-white/85 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-2px_16px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:border-slate-600/60 dark:bg-slate-800/85">
        <div className="mx-auto flex max-w-[640px] items-center justify-around px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const labelColor = item.isActive
              ? "text-blue-500"
              : "text-slate-400";
            const itemBg = item.isActive
              ? item.isAddButton
                ? "bg-orange-500/[0.08]"
                : "bg-blue-500/[0.08]"
              : "bg-transparent";
            const iconSize = item.isAddButton ? "text-[28px]" : "text-2xl";
            const iconColor = item.isAddButton ? "text-orange-500" : labelColor;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.isActive ? "page" : undefined}
                className={`group flex min-w-[72px] flex-col items-center gap-1 rounded-xl px-4 py-2 no-underline transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] active:scale-95 ${itemBg}`}
              >
                <Icon
                  className={`${iconSize} ${iconColor} transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110`}
                />
                <span
                  className={`text-[11px] font-medium tracking-[0.3px] transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${labelColor}`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
