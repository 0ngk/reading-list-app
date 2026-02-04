import ItemList from "@/components/ItemList";
import { dummyItems } from "./dummy-data";

export default function Dashboard() {
  return (
    <div>
      <p>Dashboard Page</p>
      <ItemList items={dummyItems} />
    </div>
  );
}
