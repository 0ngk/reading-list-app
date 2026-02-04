import ItemList from "@/components/ItemList";
import { dummyItems } from "./dummy-data";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8 md:px-8 lg:px-12">
        <ItemList items={dummyItems} />
      </div>
    </main>
  );
}
