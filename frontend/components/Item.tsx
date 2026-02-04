"use client";

import {
  ArrowRight,
  Bookmark,
  Clock,
  ExternalLink,
  FileText,
  Globe,
} from "lucide-react";
import Link from "next/link";
import type { ItemType } from "@/types/item";

export default function Item({ item }: { item: ItemType }) {
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
    <article className="group">
      <Link
        href={`/items/${item.id}`}
        className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 p-5 md:p-6 cursor-pointer focus-within:ring-2 ring-blue-500 ring-offset-2"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-1">
            <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
            <h2 className="font-semibold text-xl text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
              {item.title}
            </h2>
          </div>
          <button
            type="button"
            className="ml-2 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Bookmark className="w-5 h-5 text-slate-400 hover:text-yellow-500 transition-colors" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>AI要約済み</span>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {item.aiSummary}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Globe className="w-3.5 h-3.5" />
            {getDomain(item.originalUrl)}
            <ExternalLink className="w-3 h-3 opacity-60" />
          </span>
          <span className="inline-flex items-center gap-1 text-blue-500 group-hover:text-blue-600 font-medium">
            Read
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </article>
  );
}
