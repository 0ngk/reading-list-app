import Link from "next/link";
import { fetchItemById } from "@/lib/fetch";
import { ArrowLeft, ExternalLink } from "lucide-react";

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
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to List
        </Link>

        <article className="bg-white rounded-lg shadow-sm p-6 md:p-8 space-y-6">
          <h1 className="text-3xl font-bold text-slate-800 leading-tight">
            {item.title}
          </h1>

          <div className="border-t border-slate-200 pt-6 space-y-2">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Original URL
            </h2>
            <a
              href={item.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
            >
              {item.originalUrl}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="border-t border-slate-200 pt-6 space-y-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              AI Summary
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              {item.aiSummary}
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}
