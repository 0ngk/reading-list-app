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
        <h2 className="font-semibold text-xl text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {item.title}
        </h2>

        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {item.aiSummary}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium">{getDomain(item.originalUrl)}</span>
          <span className="text-blue-500 group-hover:text-blue-600 font-medium">
            Read →
          </span>
        </div>
      </Link>
    </article>
  );
}
