import { Col, Row } from "antd";
import type { ItemType } from "@/types/item";
import Item from "./Item";
import { Title } from "./Typography";

export default function ItemList({ items }: { items: ItemType[] }) {
  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        Reading List
      </Title>
      <Row gutter={[24, 24]}>
        {items.map((item) => (
          <Col key={item.id.toString()} xs={24} md={12} lg={8}>
            <Item item={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
