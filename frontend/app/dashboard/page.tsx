import ItemList from "@/components/ItemList";
import { dummyItems } from "./dummy-data";

export default function Dashboard() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "32px 24px",
        }}
      >
        <ItemList items={dummyItems} />
      </div>
    </main>
  );
}
