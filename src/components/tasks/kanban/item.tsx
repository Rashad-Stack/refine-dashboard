import {
  DragOverlay,
  UseDraggableArguments,
  useDraggable,
} from "@dnd-kit/core";
import { PropsWithChildren } from "react";

type Props = {
  id: string;
  data?: UseDraggableArguments["data"];
};

export default function KanbanItem({
  children,
  id,
  data,
}: PropsWithChildren<Props>) {
  const { attributes, listeners, setNodeRef, active } = useDraggable({
    id,
    data,
  });

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          opacity: active ? (active.id === id ? 1 : 0.5) : 1,
          borderRadius: "8px",
          position: "relative",
          cursor: "grab",
        }}>
        {active && active.id === id && (
          <DragOverlay zIndex={1000}>
            <div
              style={{
                borderRadius: "8px",
                boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px",
                cursor: "grabbing",
              }}>
              {children}
            </div>
          </DragOverlay>
        )}
        {children}
      </div>
    </div>
  );
}