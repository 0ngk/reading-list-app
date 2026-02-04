import Link from "next/link";
import { Plus } from "lucide-react";

export default function Header() {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-slate-900">Reading List</h1>
      <Link
        href="/items/new"
        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        <Plus size={20} />
        <span>記事を追加</span>
      </Link>
    </div>
  );
}
