import Link from "next/link";
import type { ItemType } from "@/types/item";

export default function Item({ item }: { item: ItemType }) {
  return (
    <div key={item.id}>
      <Link href={`/items/${item.id}`}>{item.title}</Link>
      <p>{item.aiSummary}</p>
    </div>
  );
}
