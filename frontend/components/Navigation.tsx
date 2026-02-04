import { Plus } from "lucide-react";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="text-2xl font-bold text-slate-900 hover:text-slate-700 transition-colors duration-200"
          >
            Reading List
          </Link>
          <Link
            href="/items/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <Plus size={20} />
            <span>記事を追加</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
