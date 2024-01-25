import { Text } from "@/components/text";
import { PlusOutlined } from "@ant-design/icons";
import { UseDroppableArguments, useDroppable } from "@dnd-kit/core";
import { Badge, Button, Space } from "antd";
import { PropsWithChildren } from "react";

type Props = {
  id: string;
  count: number;
  description?: string;
  title: string;
  data?: UseDroppableArguments["data"];
  onAddClick?: (args: { id: string }) => void;
};

export default function KanbanColumn({
  children,
  id,
  title,
  description,
  count,
  data,
  onAddClick,
}: PropsWithChildren<Props>) {
  const { isOver, setNodeRef, active } = useDroppable({
    id,
    data,
  });

  const onAddClickHandler = () => onAddClick?.({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0 16px",
      }}>
      <div style={{ padding: "12px" }}>
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Space>
            <Text
              ellipsis={{ tooltip: "TITLE TO DO" }}
              size="xs"
              strong
              style={{
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}>
              {title}
            </Text>

            {!!count && <Badge count={count} color="cyan" />}
          </Space>

          <Button
            shape="circle"
            icon={<PlusOutlined />}
            onClick={onAddClickHandler}
          />
        </Space>

        {description}
      </div>

      <div
        style={{
          flex: 1,
          overflowY: active ? "unset" : "scroll",
          border: "2px dashed transparent",
          borderColor: isOver ? "#000040" : "transparent",
          borderRadius: "4px",
        }}>
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}>
          {children}
        </div>
      </div>
    </div>
  );
}
