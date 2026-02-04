import type { ItemType } from "@/types/item";
import Item from "./Item";

export default function ItemList({ items }: { items: ItemType[] }) {
  return (
    <>
      <h1>Item List</h1>
      {items.map((item) => (
        <Item key={item.id.toString()} item={item} />
      ))}
    </>
  );
}
