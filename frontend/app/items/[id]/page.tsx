import {
  ArrowLeft,
  Bookmark,
  ExternalLink,
  FileText,
  Globe,
  Share2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { fetchItemById } from "@/lib/fetch";

export default async function Item({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await fetchItemById(Number.parseInt(id, 10));
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-6 py-8 md:px-8 space-y-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-colors duration-200 cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to List
        </Link>

        <article className="bg-white rounded-lg shadow-sm p-6 md:p-8 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <FileText className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <h1 className="text-3xl font-bold text-slate-800 leading-tight">
                {item.title}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                title="ブックマーク"
              >
                <Bookmark className="w-5 h-5 text-slate-400 hover:text-yellow-500 transition-colors" />
              </button>
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                title="共有"
              >
                <Share2 className="w-5 h-5 text-slate-400 hover:text-blue-500 transition-colors" />
              </button>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6 space-y-2">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-500" />
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                Original URL
              </h2>
            </div>
            <a
              href={item.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
            >
              {item.originalUrl}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="border-t border-slate-200 pt-6 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                AI Summary
              </h2>
            </div>
            <p className="text-slate-700 leading-relaxed text-base">
              {item.aiSummary}
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}
