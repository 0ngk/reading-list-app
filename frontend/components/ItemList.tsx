import type { ItemType } from "@/types/item";
import Item from "./Item";

export default function ItemList({ items }: { items: ItemType[] }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Reading List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Item key={item.id.toString()} item={item} />
        ))}
      </div>
    </div>
  );
}
